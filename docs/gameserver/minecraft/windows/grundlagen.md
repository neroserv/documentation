# Minecraft Server unter Windows – Grundlagen

Bevor du dich für eine bestimmte Server-Software entscheidest, sind ein paar Schritte immer gleich: Java installieren, den Port freigeben und wissen, wie ein Server gestartet und beendet wird. Diese Seite erledigt diese Grundlagen einmal — die weiterführenden Anleitungen bauen darauf auf.

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **The Breakdown**. Vielen Dank für das hilfreiche Tutorial!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/dk25x0VMbCs"
    title="How To Host a Minecraft Server on Your PC (2026)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [How To Host a Minecraft Server on Your PC (2026)](https://www.youtube.com/watch?v=dk25x0VMbCs)

## Welche Server-Software passt zu dir?

| Software | Plugins | Mods | Typischer Einsatz |
| --- | --- | --- | --- |
| [Vanilla](/gameserver/minecraft/windows/vanilla) | ✕ | ✕ | Unverändertes Spielerlebnis, kleine Runden |
| [Paper](/gameserver/minecraft/windows/paper) | ✓ | ✕ | Der Standard für Plugin-Server, sehr performant |
| [Spigot](/gameserver/minecraft/windows/spigot) | ✓ | ✕ | Ältere Plugins, die Paper nicht unterstützt |
| [Forge](/gameserver/minecraft/windows/forge) | ✕ | ✓ | Klassische Modpacks |
| [Fabric](/gameserver/minecraft/windows/fabric) | ✕ | ✓ | Moderne, schlanke Mods |
| [Modrinth](/gameserver/minecraft/windows/modrinth) | – | ✓ | Fertige Modpacks per Ein-Zeilen-Befehl |
| [BungeeCord](/gameserver/minecraft/windows/bungeecord) | ✓ | ✕ | Mehrere Server zu einem Netzwerk verbinden |

::: tip Unentschlossen?
Für die allermeisten Projekte ist **Paper** die richtige Wahl: kompatibel zu Spigot-Plugins, deutlich performanter als Vanilla und aktiv gepflegt.
:::

## Java installieren

Minecraft-Server brauchen eine passende Java-Version. Welche das ist, hängt von der Spielversion ab:

| Minecraft-Version | Benötigtes Java |
| --- | --- |
| 1.20.5 und neuer | Java 21 |
| 1.18 – 1.20.4 | Java 17 |
| 1.17.x | Java 16 |
| 1.16.5 und älter | Java 8 |

Eine neuere Java-Version als gefordert funktioniert meist, aber nicht immer — ältere Modpacks sind hier oft empfindlich. Im Zweifel nimmst du genau die Version aus der Tabelle.

Lade dir einen Build von [Adoptium](https://adoptium.net/de/temurin/releases/) herunter. Wähle **Windows**, **x64** und das **JDK** als `.msi`-Installer. Im Installationsassistenten aktivierst du den Punkt **Set JAVA_HOME variable**.

Prüfe danach in der Eingabeaufforderung, ob alles sitzt:

```cmd
java -version
```

Die Ausgabe muss die erwartete Hauptversionsnummer enthalten, zum Beispiel `openjdk version "21.0.5"`.

::: warning Neustart nötig
Ist `java` nach der Installation nicht auffindbar, öffne die Eingabeaufforderung neu. Windows übernimmt geänderte Umgebungsvariablen nicht in bereits offene Fenster.
:::

## Port freigeben

Minecraft nutzt standardmäßig **Port 25565 (TCP)**. Auf einem Windows-Server legst du dafür eine eingehende Firewall-Regel an:

```powershell
New-NetFirewallRule -DisplayName "Minecraft Server" -Direction Inbound -Protocol TCP -LocalPort 25565 -Action Allow
```

Führe PowerShell dafür als Administrator aus.

::: tip Firewall im Detail
Die grafische Variante ist hier beschrieben: [Windows Firewall einstellen](/rootserver/windows/firewall-einstellen)
:::

## Ordnerstruktur anlegen

Lege für jeden Server einen eigenen Ordner an, zum Beispiel `C:\Minecraft\Survival`. Mische niemals mehrere Server in einem Verzeichnis — sie würden sich gegenseitig die Welt- und Konfigurationsdateien überschreiben.

## Startdatei erstellen

Server startet man nicht per Doppelklick auf die `.jar`, sondern über eine Startdatei. Nur so lässt sich der Arbeitsspeicher festlegen und die Konsole bleibt nach einem Absturz offen.

Erstelle im Serverordner eine Datei `start.bat` mit diesem Inhalt:

```bat
@echo off
java -Xms2G -Xmx4G -jar server.jar nogui
pause
```

- `-Xms` ist der Startwert des Arbeitsspeichers, `-Xmx` das Maximum
- `nogui` unterdrückt das grafische Fenster und spart Ressourcen
- `pause` hält das Fenster offen, damit du Fehlermeldungen lesen kannst

::: warning Dateiendung prüfen
Windows blendet bekannte Dateiendungen standardmäßig aus. Aktiviere im Explorer unter **Ansicht → Dateinamenerweiterungen** die Anzeige, sonst heißt deine Datei am Ende `start.bat.txt` und lässt sich nicht ausführen.
:::

### Wie viel RAM?

| Spieleranzahl | Vanilla / Paper | Modpacks |
| --- | --- | --- |
| bis 10 | 2–4 GB | 4–6 GB |
| bis 30 | 4–6 GB | 6–10 GB |
| bis 100 | 8–12 GB | 12 GB+ |

Weise dem Server nie den gesamten Arbeitsspeicher des Systems zu — mindestens 1–2 GB bleiben für Windows selbst reserviert.

## EULA akzeptieren

Beim allerersten Start bricht jeder Minecraft-Server ab und legt die Datei `eula.txt` an. Öffne sie und ändere die letzte Zeile:

```properties
eula=true
```

Damit bestätigst du die [Minecraft-EULA](https://aka.ms/MinecraftEULA). Danach startest du erneut, und der Server erzeugt die Welt.

## Wichtige Einstellungen in der server.properties

Nach dem zweiten Start liegt die Datei `server.properties` im Ordner. Die wichtigsten Werte:

| Eigenschaft | Bedeutung |
| --- | --- |
| `server-port=25565` | Port des Servers |
| `max-players=20` | Maximale Spieleranzahl |
| `difficulty=normal` | Schwierigkeitsgrad |
| `gamemode=survival` | Standard-Spielmodus |
| `online-mode=true` | Prüfung der Spieler bei Mojang |
| `view-distance=10` | Sichtweite in Chunks — starker Einfluss auf die Last |
| `motd=Mein Server` | Beschreibung in der Serverliste |

::: danger online-mode niemals leichtfertig deaktivieren
Mit `online-mode=false` kann sich jeder mit einem beliebigen Namen verbinden — auch mit dem eines Administrators. Deaktiviere die Einstellung ausschließlich bei Backend-Servern hinter einem Proxy, und sichere diese dann per Firewall ab.
:::

## Server verwalten

Nützliche Befehle direkt in der Serverkonsole:

```
op DeinName          Adminrechte vergeben
whitelist on         Whitelist aktivieren
whitelist add Name   Spieler zur Whitelist hinzufügen
stop                 Server sauber herunterfahren
```

::: danger Niemals das Fenster einfach schließen
Wird der Server hart beendet, bleiben Weltdaten ungespeichert und können beschädigt werden. Fahre ihn immer mit `stop` herunter.
:::

## Server erreichbar machen

Spieler verbinden sich über `IP-Adresse:25565`. Komfortabler ist eine eigene Domain — wie du die passenden Einträge setzt, steht hier: [DNS-Einträge für Minecraft-Server](/dashboard/produkte/dns-eintraege/minecraft)

## Troubleshooting

- **`'java' ist kein Befehl`:** Java fehlt oder wurde ohne `JAVA_HOME` installiert. Eingabeaufforderung neu öffnen, sonst neu installieren.
- **`UnsupportedClassVersionError`:** Deine Java-Version ist zu alt für diese Minecraft-Version. Vergleiche mit der Tabelle oben.
- **`Failed to bind to port`:** Port 25565 ist bereits belegt. Prüfe mit `netstat -ano | findstr :25565`, welcher Prozess ihn hält.
- **Fenster schließt sich sofort:** Das `pause` in der `start.bat` fehlt — ohne das siehst du die Fehlermeldung nicht.
- **Server läuft, ist aber nicht erreichbar:** Firewall-Regel und Portfreigabe prüfen.
