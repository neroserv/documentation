# Paper Minecraft Server unter Linux installieren

Paper ist die meistgenutzte Server-Software für Minecraft. Sie basiert auf Spigot, ist aber deutlich stärker optimiert, behebt zahlreiche Vanilla-Fehler und bietet umfangreiche eigene Konfigurationsmöglichkeiten. Alle Spigot- und Bukkit-Plugins laufen darauf.

::: tip Vorher lesen
Java, Benutzer, Portfreigabe und Autostart sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/linux/grundlagen)
:::

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **Murmelmeister**. Vielen Dank für das hilfreiche Tutorial!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/oyNl52tMghI"
    title="Minecraft Netzwerk auf Linux richtig einrichten 2026 (Paper, Velocity & Java)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [Minecraft Netzwerk auf Linux richtig einrichten 2026 (Paper, Velocity & Java)](https://www.youtube.com/watch?v=oyNl52tMghI)

## Warum Paper?

- Spürbar bessere Leistung als Vanilla und Spigot, besonders bei vielen Entitäten
- Behebt Exploits und Dupe-Bugs, die in Vanilla offen bleiben
- Volle Kompatibilität mit Bukkit- und Spigot-Plugins
- Feingranulare Einstellungen in `paper-world-defaults.yml`

## Voraussetzungen

- Debian 12 / Ubuntu 22.04 oder neuer
- Java in der passenden Version (1.20.5+ benötigt Java 21)
- Port 25565 (TCP) freigegeben
- Mindestens 4 GB Arbeitsspeicher empfohlen

## Paper herunterladen

Paper stellt eine API bereit, über die du immer den aktuellsten Build beziehen kannst — praktisch für Skripte und Updates.

```bash
sudo su - minecraft
mkdir -p /opt/minecraft/paper
cd /opt/minecraft/paper
```

Die jeweils aktuelle Download-Adresse findest du auf [papermc.io/downloads/paper](https://papermc.io/downloads/paper). Kopiere den Link und lade die Datei:

```bash
wget -O server.jar "https://api.papermc.io/v2/projects/paper/versions/1.21.4/builds/<build>/downloads/paper-1.21.4-<build>.jar"
```

Alternativ ermittelst du den neuesten Build automatisch:

```bash
MCVER=1.21.4
BUILD=$(curl -s https://api.papermc.io/v2/projects/paper/versions/$MCVER/builds \
  | jq -r '.builds[-1].build')
wget -O server.jar \
  "https://api.papermc.io/v2/projects/paper/versions/$MCVER/builds/$BUILD/downloads/paper-$MCVER-$BUILD.jar"
```

Dafür muss `jq` installiert sein: `sudo apt install -y jq curl`

::: warning Experimentelle Builds
Ist eine Version noch als **Experimental** gekennzeichnet, gilt sie nicht als stabil. Für einen produktiven Server nimmst du besser die letzte als stabil markierte Minecraft-Version.
:::

## Startskript mit optimierten Flags

Paper profitiert deutlich von angepassten JVM-Flags:

```bash
nano start.sh
```

```bash
#!/bin/bash
java -Xms4G -Xmx4G \
  -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 \
  -jar server.jar nogui
```

```bash
chmod +x start.sh
```

::: tip Xms und Xmx gleich setzen
Bei Paper wird empfohlen, Start- und Maximalwert des Arbeitsspeichers identisch zu wählen. Das vermeidet, dass die JVM den Heap zur Laufzeit umverteilt.
:::

## Ersten Start durchführen

```bash
./start.sh
sed -i 's/eula=false/eula=true/' eula.txt
./start.sh
```

Paper erzeugt jetzt die Welt und legt zusätzlich den Ordner `plugins` sowie die Paper-Konfigurationsdateien an.

## Im Hintergrund betreiben

```bash
screen -S paper
./start.sh
```

Für den Dauerbetrieb richte einen systemd-Service ein — siehe [Grundlagen](/gameserver/minecraft/linux/grundlagen).

## Plugins installieren

```bash
cd /opt/minecraft/paper/plugins
wget <plugin-url>
```

Danach den Server neu starten. Beziehe Plugins von [Modrinth](https://modrinth.com/plugins), [Hangar](https://hangar.papermc.io/) oder [SpigotMC](https://www.spigotmc.org/resources/).

Mit `plugins` in der Konsole siehst du, was geladen wurde — grün bedeutet aktiv, rot steht für einen Fehler.

::: warning Auf die Version achten
Ein Plugin muss zur Minecraft-Version deines Servers passen. Plugins für ältere Versionen verhindern häufig den kompletten Serverstart.
:::

Ein bewährter Grundstock:

| Plugin | Zweck |
| --- | --- |
| EssentialsX | Grundbefehle, Homes, Warps |
| LuckPerms | Rechte- und Gruppenverwaltung |
| CoreProtect | Protokollierung und Rückgängigmachen von Griefing |
| Vault | Schnittstelle zwischen Wirtschafts- und Rechte-Plugins |
| WorldEdit | Bauwerkzeuge für Administratoren |

## Performance feinjustieren

Paper legt beim ersten Start `config/paper-global.yml` und `config/paper-world-defaults.yml` an. Prüfe die Serverlast jederzeit mit dem Konsolenbefehl `tps` — Werte um 20.0 sind optimal, dauerhaft unter 18.0 deutet auf ein Problem hin.

Für eine gezielte Ursachensuche eignet sich das Plugin [Spark](https://modrinth.com/plugin/spark) mit `/spark profiler`.

## Server aktualisieren

```bash
# Server stoppen, dann:
cp -r world world-backup-$(date +%F)
cp -r plugins plugins-backup-$(date +%F)
wget -O server.jar "<neue-paper-url>"
./start.sh
```

Achte beim Start auf Warnungen zu Plugins, die noch nicht zur neuen Version passen.

## Troubleshooting

- **Plugin lädt nicht:** Version passt nicht oder eine Abhängigkeit fehlt — die Konsole nennt den Grund.
- **`tps` dauerhaft niedrig:** Sichtweite reduzieren, Entitäten prüfen, mit Spark profilen.
- **Server belegt sehr viel RAM:** Das ist bei `-Xms=-Xmx` normal — die JVM reserviert den Speicher vorab.
- **Welt eines Vanilla-Servers übernehmen:** Funktioniert; kopiere den `world`-Ordner in den Paper-Ordner.
