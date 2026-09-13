# Vanilla Minecraft Server unter Linux installieren

Vanilla ist der offizielle Server von Mojang — ohne Plugins, ohne Mods, exakt so, wie das Spiel gedacht ist. Für kleine Runden oder als Testumgebung ist er die einfachste Wahl.

::: tip Vorher lesen
Java, Benutzer, Portfreigabe und Autostart sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/linux/grundlagen)
:::

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

## Voraussetzungen

- Debian 12 / Ubuntu 22.04 oder neuer
- Java in der passenden Version (1.20.5+ benötigt Java 21)
- Port 25565 (TCP) freigegeben
- Mindestens 2 GB freier Arbeitsspeicher

## Verzeichnis vorbereiten

```bash
sudo su - minecraft
mkdir -p /opt/minecraft/vanilla
cd /opt/minecraft/vanilla
```

## Serverdatei herunterladen

Die aktuelle Download-Adresse findest du auf [minecraft.net/de-de/download/server](https://www.minecraft.net/de-de/download/server). Kopiere den Link zur `.jar`-Datei und lade sie herunter:

```bash
wget -O server.jar "https://piston-data.mojang.com/v1/objects/<hash>/server.jar"
```

::: warning Link ändert sich mit jeder Version
Mojang vergibt für jede Version eine eigene Adresse mit Prüfsumme. Ein fest notierter Link wird mit dem nächsten Update ungültig — hole ihn dir immer frisch von der offiziellen Seite.
:::

Ältere Versionen findest du bei [mcversions.net](https://mcversions.net/).

## Startskript anlegen

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
```

Der Server bricht ab:

```
You need to agree to the EULA in order to run the server.
```

Das ist erwartet. EULA bestätigen:

```bash
sed -i 's/eula=false/eula=true/' eula.txt
```

Erneut starten. Der Server erzeugt jetzt die Welt — beim ersten Mal dauert das ein bis zwei Minuten. Sobald `Done!` erscheint, ist er bereit.

## Im Hintergrund betreiben

```bash
screen -S vanilla
./start.sh
```

Mit `STRG+A` und `D` löst du dich von der Sitzung. Zurück geht es mit `screen -r vanilla`.

Für den Dauerbetrieb empfiehlt sich ein systemd-Service — die Einrichtung ist in den [Grundlagen](/gameserver/minecraft/linux/grundlagen) beschrieben.

## Einstellungen anpassen

Beende den Server mit `stop`, bevor du Dateien bearbeitest:

```bash
nano server.properties
```

```properties
motd=Willkommen auf meinem Server
max-players=20
difficulty=normal
view-distance=10
spawn-protection=0
```

## Adminrechte vergeben

In der Serverkonsole:

```
op DeinMinecraftName
```

## Whitelist einrichten

```
whitelist on
whitelist add Spielername
whitelist reload
```

## Server aktualisieren

```bash
# Server stoppen, dann:
cp -r world world-backup-$(date +%F)
wget -O server.jar "<neue-url>"
./start.sh
```

::: warning Ohne Backup kein Update
Ein Rückschritt auf eine ältere Minecraft-Version ist mit einer bereits konvertierten Welt nicht möglich. Sichere den `world`-Ordner vor jedem Versionssprung.
:::

## Troubleshooting

- **`UnsupportedClassVersionError`:** Java-Version passt nicht zur Minecraft-Version.
- **Server stoppt beim Abmelden:** `screen` oder systemd nutzen.
- **Spieler können nicht beitreten:** `sudo ufw status` prüfen.
- **Server ruckelt:** `view-distance` auf 8 reduzieren, mehr RAM zuweisen.
- **Du brauchst Plugins:** Vanilla unterstützt keine. Wechsle zu [Paper](/gameserver/minecraft/linux/paper).
