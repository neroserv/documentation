# Spigot Minecraft Server unter Linux installieren

Spigot war jahrelang der Standard für Plugin-Server und ist bis heute die Grundlage, auf der Paper aufbaut. Die Installation unterscheidet sich allerdings von allen anderen Varianten: Aus rechtlichen Gründen darf Spigot keine fertigen Serverdateien anbieten — du erzeugst sie mit **BuildTools** selbst.

::: tip Für die meisten ist Paper die bessere Wahl
Paper ist zu Spigot-Plugins vollständig kompatibel, spürbar performanter und lässt sich direkt herunterladen. Greife zu Spigot nur, wenn ein Plugin ausdrücklich Spigot voraussetzt: [Paper installieren](/gameserver/minecraft/linux/paper)
:::

## Voraussetzungen

- Debian 12 / Ubuntu 22.04 oder neuer
- Java **JDK** (nicht nur JRE) in passender Version
- `git` — BuildTools benötigt es zwingend
- Port 25565 (TCP) freigegeben
- Etwa 2 GB freier Speicherplatz für den Build-Vorgang

## Abhängigkeiten installieren

```bash
sudo apt update
sudo apt install -y git openjdk-21-jdk wget
```

::: warning JDK statt JRE
BuildTools kompiliert Quellcode und braucht dafür das vollständige **JDK**. Mit einem reinen JRE bricht der Vorgang ab.
:::

## BuildTools herunterladen

Lege einen separaten Ordner an — der Build erzeugt zahlreiche temporäre Dateien, die im Serverordner nur stören würden.

```bash
sudo su - minecraft
mkdir -p /opt/minecraft/buildtools
cd /opt/minecraft/buildtools
wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
```

## Spigot bauen

```bash
java -jar BuildTools.jar --rev 1.21.4
```

BuildTools lädt die Quellen von Mojang und Spigot, entpackt sie und kompiliert den Server. Das dauert je nach System und Anbindung **10 bis 30 Minuten** — auch längere Pausen ohne Ausgabe sind normal.

Weitere nützliche Aufrufe:

```bash
# Neueste stabile Version bauen
java -jar BuildTools.jar --rev latest

# Nur Spigot, ohne CraftBukkit-Artefakte
java -jar BuildTools.jar --rev 1.21.4 --compile spigot
```

Nach Abschluss liegt die Datei `spigot-1.21.4.jar` im Ordner.

::: tip Auf kleinen Servern
Bei wenig Arbeitsspeicher kann der Build abbrechen. Weise der JVM dann mehr Heap zu: `java -Xmx2G -jar BuildTools.jar --rev 1.21.4`
:::

## Server einrichten

```bash
mkdir -p /opt/minecraft/spigot
cp /opt/minecraft/buildtools/spigot-1.21.4.jar /opt/minecraft/spigot/server.jar
cd /opt/minecraft/spigot
```

Startskript anlegen:

```bash
nano start.sh
```

```bash
#!/bin/bash
java -Xms2G -Xmx4G -jar server.jar nogui
```

```bash
chmod +x start.sh
```

## Ersten Start durchführen

```bash
./start.sh
sed -i 's/eula=false/eula=true/' eula.txt
./start.sh
```

Spigot erzeugt jetzt die Welt und legt den Ordner `plugins` sowie die Datei `spigot.yml` an.

## Plugins installieren

```bash
cd /opt/minecraft/spigot/plugins
wget <plugin-url>
```

Server neu starten und mit `plugins` in der Konsole prüfen, was geladen wurde. Eine große Auswahl findest du auf [SpigotMC](https://www.spigotmc.org/resources/).

## spigot.yml

Neben `server.properties` und `bukkit.yml` bringt Spigot die `spigot.yml` mit:

```yaml
world-settings:
  default:
    view-distance: 10
    entity-activation-range:
      animals: 32
      monsters: 32
    merge-radius:
      item: 2.5
```

Kleinere Aktivierungsradien entlasten den Server deutlich, wenn viele Tiere oder Monster geladen sind.

## Auf eine neue Version aktualisieren

Bei Spigot bedeutet ein Update: neu bauen.

```bash
# Server stoppen, dann:
cp -r world world-backup-$(date +%F)
cd /opt/minecraft/buildtools
wget -N https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
java -jar BuildTools.jar --rev 1.21.5
cp spigot-1.21.5.jar /opt/minecraft/spigot/server.jar
```

::: tip BuildTools aktuell halten
Lade vor jedem Build die aktuelle `BuildTools.jar` neu herunter. Eine veraltete Version kann neue Minecraft-Versionen nicht bauen.
:::

## Troubleshooting

- **`git` wurde nicht gefunden:** `sudo apt install -y git`
- **Build bricht mit Speicherfehler ab:** Mehr Heap zuweisen (`-Xmx2G`).
- **Build hängt scheinbar:** Geduld — das Kompilieren läuft ohne Fortschrittsanzeige.
- **`--rev` Version nicht verfügbar:** Sehr neue Minecraft-Versionen brauchen ein paar Tage, bis Spigot nachzieht.
- **Plugin verlangt Paper:** Manche moderne Plugins nutzen ausschließlich die Paper-API und laufen auf Spigot nicht.
