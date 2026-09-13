# Minecraft Server unter Linux – Grundlagen

Unabhängig davon, für welche Server-Software du dich entscheidest, sind einige Schritte immer gleich: Java installieren, einen eigenen Benutzer anlegen, den Port freigeben und dafür sorgen, dass der Server nach dem Trennen der SSH-Verbindung weiterläuft. Diese Seite erledigt das einmal — die weiterführenden Anleitungen bauen darauf auf.

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **Barmine Tech**. Vielen Dank für das hilfreiche Tutorial!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/0g4iqQChARk"
    title="The Easiest Minecraft Server Setup on Linux (2026)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [The Easiest Minecraft Server Setup on Linux (2026)](https://www.youtube.com/watch?v=0g4iqQChARk)

## Welche Server-Software passt zu dir?

| Software | Plugins | Mods | Typischer Einsatz |
| --- | --- | --- | --- |
| [Vanilla](/gameserver/minecraft/linux/vanilla) | ✕ | ✕ | Unverändertes Spielerlebnis, kleine Runden |
| [Paper](/gameserver/minecraft/linux/paper) | ✓ | ✕ | Der Standard für Plugin-Server, sehr performant |
| [Spigot](/gameserver/minecraft/linux/spigot) | ✓ | ✕ | Ältere Plugins, die Paper nicht unterstützt |
| [Forge](/gameserver/minecraft/linux/forge) | ✕ | ✓ | Klassische Modpacks |
| [Fabric](/gameserver/minecraft/linux/fabric) | ✕ | ✓ | Moderne, schlanke Mods |
| [Modrinth](/gameserver/minecraft/linux/modrinth) | – | ✓ | Fertige Modpacks per Ein-Zeilen-Befehl |
| [BungeeCord](/gameserver/minecraft/linux/bungeecord) | ✓ | ✕ | Mehrere Server zu einem Netzwerk verbinden |

::: tip Unentschlossen?
Für die allermeisten Projekte ist **Paper** die richtige Wahl: kompatibel zu Spigot-Plugins, deutlich performanter als Vanilla und aktiv gepflegt.
:::

## Mit dem Server verbinden

Alle folgenden Schritte führst du über SSH aus. Wie du dich verbindest, steht hier: [Mit Linux Server verbinden (SSH)](/rootserver/linux/ssh-verbinden)

## Java installieren

Welche Java-Version du brauchst, hängt von der Minecraft-Version ab:

| Minecraft-Version | Benötigtes Java |
| --- | --- |
| 1.20.5 und neuer | Java 21 |
| 1.18 – 1.20.4 | Java 17 |
| 1.17.x | Java 16 |
| 1.16.5 und älter | Java 8 |

Auf Debian 13 und Ubuntu 24.04 liegt Java 21 direkt in den Paketquellen:

```bash
sudo apt update
sudo apt install -y openjdk-21-jre-headless
```

Die `headless`-Variante bringt keine grafischen Bibliotheken mit und ist für Server genau richtig.

Auf älteren Systemen, oder wenn du eine bestimmte Version brauchst, nutzt du die Paketquelle von Adoptium:

```bash
sudo apt install -y wget apt-transport-https gpg
wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public \
  | sudo gpg --dearmor -o /etc/apt/keyrings/adoptium.gpg
echo "deb [signed-by=/etc/apt/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" \
  | sudo tee /etc/apt/sources.list.d/adoptium.list
sudo apt update
sudo apt install -y temurin-21-jre
```

Prüfe danach die Installation:

```bash
java -version
```

::: tip Ausführliche Anleitung
Mehr Details und Alternativen findest du unter [Java installieren](/rootserver/anwendungen/java-installieren).
:::

## Eigenen Benutzer anlegen

Betreibe den Server niemals als `root`. Sollte eine Sicherheitslücke in einem Plugin ausgenutzt werden, hätte ein Angreifer sonst sofort vollen Zugriff auf das System.

```bash
sudo adduser --disabled-password --gecos "" minecraft
sudo mkdir -p /opt/minecraft
sudo chown -R minecraft:minecraft /opt/minecraft
```

Wechsle anschließend in diesen Benutzer:

```bash
sudo su - minecraft
cd /opt/minecraft
```

Lege für jeden Server ein eigenes Unterverzeichnis an, zum Beispiel `/opt/minecraft/survival`.

## Port freigeben

Minecraft nutzt standardmäßig **Port 25565 (TCP)**:

```bash
sudo ufw allow 25565/tcp
sudo ufw status
```

::: tip Firewall einrichten
Falls `ufw` noch nicht installiert ist: `sudo apt install -y ufw`. Aktiviere die Firewall erst, **nachdem** du SSH freigegeben hast — sonst sperrst du dich aus:

```bash
sudo ufw allow OpenSSH
sudo ufw enable
```
:::

## Startskript erstellen

Lege im Serverordner eine `start.sh` an:

```bash
nano start.sh
```

Mit folgendem Inhalt:

```bash
#!/bin/bash
java -Xms2G -Xmx4G -jar server.jar nogui
```

Ausführbar machen:

```bash
chmod +x start.sh
```

### Wie viel RAM?

| Spieleranzahl | Vanilla / Paper | Modpacks |
| --- | --- | --- |
| bis 10 | 2–4 GB | 4–6 GB |
| bis 30 | 4–6 GB | 6–10 GB |
| bis 100 | 8–12 GB | 12 GB+ |

Lass dem System immer 1–2 GB übrig. Prüfe den verfügbaren Speicher mit `free -h`.

## Server dauerhaft laufen lassen

Startest du den Server direkt in der SSH-Sitzung, endet er, sobald du die Verbindung trennst. Dafür gibt es zwei Lösungen.

### Variante 1: screen

Schnell eingerichtet und ideal zum Testen:

```bash
sudo apt install -y screen
screen -S minecraft
./start.sh
```

Mit `STRG+A` gefolgt von `D` löst du dich von der Sitzung, der Server läuft weiter. Zurück kommst du mit:

```bash
screen -r minecraft
```

::: tip Screen im Detail
Alle Befehle und Kniffe: [Screen installieren und nutzen](/rootserver/anwendungen/screen-installieren-und-nutzen)
:::

### Variante 2: systemd-Service

Die sauberere Lösung für den produktiven Betrieb — der Server startet dann auch nach einem Neustart des Systems automatisch.

```bash
sudo nano /etc/systemd/system/minecraft.service
```

```ini
[Unit]
Description=Minecraft Server
After=network.target

[Service]
User=minecraft
WorkingDirectory=/opt/minecraft/survival
ExecStart=/usr/bin/java -Xms2G -Xmx4G -jar server.jar nogui
Restart=on-failure
RestartSec=10
SuccessExitStatus=0 1

[Install]
WantedBy=multi-user.target
```

Aktivieren und starten:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now minecraft
sudo systemctl status minecraft
```

Die Konsolenausgabe liest du mit:

```bash
sudo journalctl -u minecraft -f
```

::: warning Keine Eingabe über systemd
Über einen systemd-Service kannst du keine Befehle in die Serverkonsole tippen. Nutze dafür entweder RCON oder starte den Server in einer `screen`-Sitzung innerhalb des Services.
:::

## EULA akzeptieren

Beim allerersten Start bricht jeder Minecraft-Server ab und legt die Datei `eula.txt` an:

```bash
nano eula.txt
```

Ändere die letzte Zeile:

```properties
eula=true
```

Alternativ in einem Befehl:

```bash
sed -i 's/eula=false/eula=true/' eula.txt
```

## Wichtige Einstellungen in der server.properties

| Eigenschaft | Bedeutung |
| --- | --- |
| `server-port=25565` | Port des Servers |
| `max-players=20` | Maximale Spieleranzahl |
| `difficulty=normal` | Schwierigkeitsgrad |
| `online-mode=true` | Prüfung der Spieler bei Mojang |
| `view-distance=10` | Sichtweite in Chunks — starker Einfluss auf die Last |
| `motd=Mein Server` | Beschreibung in der Serverliste |

::: danger online-mode niemals leichtfertig deaktivieren
Mit `online-mode=false` kann sich jeder mit einem beliebigen Namen verbinden — auch mit dem eines Administrators. Deaktiviere die Einstellung ausschließlich bei Backend-Servern hinter einem Proxy, und binde diese dann auf `127.0.0.1`.
:::

## Backups einrichten

Ein einfacher Cronjob sichert die Welt täglich um 4 Uhr:

```bash
crontab -e
```

```
0 4 * * * tar -czf /opt/minecraft/backups/world-$(date +\%F).tar.gz -C /opt/minecraft/survival world
```

Lege das Zielverzeichnis vorher an und kopiere die Sicherungen zusätzlich auf ein anderes System.

## Troubleshooting

- **`java: command not found`:** Java ist nicht installiert oder liegt nicht im Pfad.
- **`UnsupportedClassVersionError`:** Java-Version passt nicht zur Minecraft-Version.
- **`Failed to bind to port`:** Port belegt. Prüfen mit `sudo ss -tulpn | grep 25565`.
- **Server stoppt beim Trennen der SSH-Verbindung:** `screen` oder einen systemd-Service verwenden.
- **`Permission denied` beim Start:** Dateirechte prüfen: `sudo chown -R minecraft:minecraft /opt/minecraft`.
- **Server läuft, ist aber nicht erreichbar:** `ufw status` prüfen und Portfreigabe kontrollieren.
