# Forge Minecraft Server unter Linux installieren

Forge ist die älteste und am weitesten verbreitete Mod-Plattform für Minecraft. Nahezu jedes große Modpack — von Feed The Beast bis All the Mods — setzt darauf. Anders als bei Plugins müssen hier **Server und Client dieselben Mods** in derselben Version installiert haben.

::: tip Vorher lesen
Java, Benutzer, Portfreigabe und Autostart sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/linux/grundlagen)
:::

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **The Breakdown**. Vielen Dank für das hilfreiche Tutorial!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/2OT71rR4oSY"
    title="How To Make a Minecraft Forge Server in 2026"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [How To Make a Minecraft Forge Server in 2026](https://www.youtube.com/watch?v=2OT71rR4oSY)

## Forge oder NeoForge?

Seit Minecraft 1.20.2 gibt es mit **NeoForge** eine aktiv gepflegte Abspaltung von Forge, auf die viele Mod-Entwickler gewechselt sind. Die Installation läuft identisch ab.

Richte dich danach, was deine Mods bzw. dein Modpack voraussetzen — mischen lässt sich beides nicht.

- Forge: [files.minecraftforge.net](https://files.minecraftforge.net/net/minecraftforge/forge/)
- NeoForge: [neoforged.net](https://neoforged.net/)

## Voraussetzungen

- Debian 12 / Ubuntu 22.04 oder neuer
- Java in der zur Minecraft-Version passenden Fassung
- Port 25565 (TCP) freigegeben
- **6–10 GB Arbeitsspeicher** — Modpacks brauchen deutlich mehr als Vanilla

## Installer herunterladen

Öffne [files.minecraftforge.net](https://files.minecraftforge.net/net/minecraftforge/forge/) und wähle links deine Minecraft-Version. Nimm den als **Recommended** markierten Build — er ist getestet und stabil.

Kopiere den Link zum **Installer** und lade ihn auf dem Server herunter:

```bash
sudo su - minecraft
mkdir -p /opt/minecraft/forge
cd /opt/minecraft/forge
wget https://maven.minecraftforge.net/net/minecraftforge/forge/1.21.1-52.0.40/forge-1.21.1-52.0.40-installer.jar
```

::: danger Nur die offizielle Quelle
Forge-Installer kursieren auf zahlreichen inoffiziellen Seiten, oft mit manipulierten Dateien. Lade ausschließlich über die offizielle Seite bzw. das offizielle Maven-Repository.
:::

## Forge installieren

```bash
java -jar forge-1.21.1-52.0.40-installer.jar --installServer
```

Der Installer lädt die Vanilla-Serverdateien sowie alle Bibliotheken herunter — das dauert einige Minuten.

Danach findest du im Ordner:

- `run.sh` — das fertige Startskript
- `user_jvm_args.txt` — hier stellst du den Arbeitsspeicher ein
- `libraries/` — die Abhängigkeiten von Forge

Der Installer selbst wird nicht mehr gebraucht:

```bash
rm forge-*-installer.jar forge-*-installer.jar.log
chmod +x run.sh
```

## Arbeitsspeicher festlegen

Ab Minecraft 1.17 steuerst du den RAM nicht mehr im Startskript, sondern in der `user_jvm_args.txt`:

```bash
nano user_jvm_args.txt
```

Am Ende ergänzen:

```
-Xms4G
-Xmx8G
```

Zeilen mit `#` am Anfang sind Kommentare und werden ignoriert.

::: warning Nicht zu knapp bemessen
Große Modpacks brechen mit `OutOfMemoryError` ab, wenn der Heap zu klein ist. Rechne bei 150+ Mods mit mindestens 8 GB.
:::

## Ersten Start durchführen

```bash
./run.sh
sed -i 's/eula=false/eula=true/' eula.txt
./run.sh
```

Forge lädt jetzt alle Mods und erzeugt die Welt. Der erste Start eines Modpacks kann **mehrere Minuten** dauern — das ist normal.

## Im Hintergrund betreiben

```bash
screen -S forge
./run.sh
```

Für einen systemd-Service passt du in der Unit die Zeile `ExecStart` an:

```ini
ExecStart=/opt/minecraft/forge/run.sh
```

## Mods installieren

```bash
cd /opt/minecraft/forge/mods
wget <mod-url>
```

Server neu starten. Beziehe Mods von [Modrinth](https://modrinth.com/mods) oder [CurseForge](https://www.curseforge.com/minecraft/mc-mods).

::: danger Client und Server müssen identisch sein
Spieler mit abweichenden Mods werden beim Verbinden abgewiesen. Reine Serverseiten-Mods sind die Ausnahme — sie sind in der Beschreibung entsprechend gekennzeichnet.
:::

## Fertiges Modpack aufsetzen

Für ein komplettes Modpack lädst du das **Server Pack** herunter, das die meisten Packs auf CurseForge anbieten:

```bash
wget <server-pack-url> -O serverpack.zip
unzip serverpack.zip -d /opt/minecraft/forge
cd /opt/minecraft/forge
chmod +x *.sh
./startserver.sh
```

Der genaue Name des Startskripts unterscheidet sich je nach Pack.

::: tip Modrinth-Modpacks einfacher installieren
Liegt dein Modpack auf Modrinth, geht es noch bequemer per Ein-Zeilen-Befehl: [Modrinth Modpack Server](/gameserver/minecraft/linux/modrinth)
:::

## Troubleshooting

- **`Missing or unsupported mandatory dependencies`:** Eine Mod benötigt eine weitere Mod. Die Konsole nennt sie namentlich.
- **`OutOfMemoryError`:** `-Xmx` in der `user_jvm_args.txt` erhöhen.
- **`Permission denied` bei `run.sh`:** `chmod +x run.sh`
- **Spieler werden abgewiesen:** Mod-Liste auf Client und Server abgleichen, Versionsnummern inklusive.
- **Absturz beim Weltladen:** Eine Mod ist inkompatibel. Halbiere die Mod-Liste testweise, um den Verursacher einzugrenzen.
