# Fabric Minecraft Server unter Linux installieren

Fabric ist die moderne, schlanke Alternative zu Forge. Der Mod-Loader startet schneller, erscheint meist wenige Tage nach einer neuen Minecraft-Version und ist die Grundlage vieler Performance-Mods wie Lithium, Krypton oder FerriteCore.

::: tip Vorher lesen
Java, Benutzer, Portfreigabe und Autostart sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/linux/grundlagen)
:::

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **The Breakdown**. Vielen Dank für das hilfreiche Tutorial!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/IMBQ6p_WwBM"
    title="How To Make a Fabric Server in Minecraft 26.2"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [How To Make a Fabric Server in Minecraft 26.2](https://www.youtube.com/watch?v=IMBQ6p_WwBM)

## Fabric oder Forge?

| | Fabric | Forge |
| --- | --- | --- |
| Startzeit | sehr kurz | länger |
| Verfügbarkeit neuer Versionen | meist innerhalb weniger Tage | dauert oft länger |
| Große Modpacks | wachsende Auswahl | größte Auswahl |
| Technische Mods | zunehmend verbreitet | traditionell stark |

Beide Loader sind zueinander inkompatibel. Entscheidend ist, was deine Mods voraussetzen.

## Voraussetzungen

- Debian 12 / Ubuntu 22.04 oder neuer
- Java in der zur Minecraft-Version passenden Fassung
- Port 25565 (TCP) freigegeben
- 4–8 GB Arbeitsspeicher, je nach Anzahl der Mods

## Installer herunterladen

```bash
sudo su - minecraft
mkdir -p /opt/minecraft/fabric
cd /opt/minecraft/fabric
```

Die aktuelle Version des Installers findest du auf [fabricmc.net/use/server](https://fabricmc.net/use/server/):

```bash
wget https://maven.fabricmc.net/net/fabricmc/fabric-installer/1.0.1/fabric-installer-1.0.1.jar
```

## Fabric installieren

```bash
java -jar fabric-installer-1.0.1.jar server -mcversion 1.21.4 -downloadMinecraft
```

Passe Dateinamen und Minecraft-Version an. Die Option `-downloadMinecraft` sorgt dafür, dass der Vanilla-Server gleich mitgeladen wird.

Danach liegt die Datei `fabric-server-launch.jar` im Ordner. Der Installer wird nicht mehr gebraucht:

```bash
rm fabric-installer-*.jar
```

## Startskript anlegen

```bash
nano start.sh
```

```bash
#!/bin/bash
java -Xms4G -Xmx6G -jar fabric-server-launch.jar nogui
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

Fabric erstellt den Ordner `mods` und erzeugt die Welt.

## Fabric API installieren

Nahezu jede Fabric-Mod setzt die **Fabric API** voraus. Sie ist nicht Teil des Loaders und muss separat installiert werden.

Lade sie von [modrinth.com/mod/fabric-api](https://modrinth.com/mod/fabric-api) in der zu deiner Minecraft-Version passenden Fassung in den Ordner `mods`:

```bash
cd /opt/minecraft/fabric/mods
wget <fabric-api-url>
```

::: warning Häufigster Fehler
Fehlt die Fabric API, starten die meisten Mods nicht und der Server bricht mit einer Abhängigkeitsmeldung ab. Installiere sie immer zuerst.
:::

## Mods installieren

```bash
cd /opt/minecraft/fabric/mods
wget <mod-url>
```

Achte darauf, dass jede Mod für **Fabric** und für deine Minecraft-Version gebaut ist. Auf Modrinth lässt sich beides direkt filtern.

### Performance-Mods für Server

| Mod | Wirkung |
| --- | --- |
| Lithium | Optimiert allgemeine Serverlogik |
| Krypton | Verbessert den Netzwerk-Stack |
| FerriteCore | Reduziert den Speicherverbrauch |
| Spark | Profiler zur Ursachensuche bei Lags |

Diese Mods laufen serverseitig und müssen von Spielern nicht installiert werden.

::: tip Server- und Clientmods unterscheiden
Auf Modrinth ist bei jeder Mod angegeben, ob sie client-, server- oder beidseitig benötigt wird. Reine Servermods erleichtern dir den Betrieb erheblich, weil Spieler nichts installieren müssen.
:::

## Im Hintergrund betreiben

```bash
screen -S fabric
./start.sh
```

Für den Dauerbetrieb richte einen systemd-Service ein — siehe [Grundlagen](/gameserver/minecraft/linux/grundlagen).

## Auf eine neue Version wechseln

```bash
# Server stoppen, dann:
cp -r world world-backup-$(date +%F)
mv mods mods-alt
mkdir mods
java -jar fabric-installer-1.0.1.jar server -mcversion 1.21.5 -downloadMinecraft
```

Anschließend alle Mods in der Fassung für die neue Version neu herunterladen.

## Troubleshooting

- **`Could not find Fabric API`:** Fabric API fehlt im `mods`-Ordner oder passt nicht zur Version.
- **Mod lädt nicht:** Prüfen, ob es sich um eine Forge-Version der Mod handelt — die ist inkompatibel.
- **Spieler werden abgewiesen:** Client-seitige Mods müssen auf beiden Seiten identisch sein.
- **`UnsupportedClassVersionError`:** Java-Version passt nicht zur Minecraft-Version.
