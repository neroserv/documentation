# Forge Minecraft Server unter Windows installieren

Forge ist die älteste und am weitesten verbreitete Mod-Plattform für Minecraft. Nahezu jedes große Modpack — von Feed The Beast bis All the Mods — setzt darauf. Anders als bei Plugins müssen hier **Server und Client dieselben Mods** in derselben Version installiert haben.

::: tip Vorher lesen
Java, Portfreigabe und EULA sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/windows/grundlagen)
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

Seit Minecraft 1.20.2 gibt es mit **NeoForge** einen aktiv gepflegten Abspaltung von Forge, auf die viele Mod-Entwickler gewechselt sind. Die Installation läuft identisch ab.

Die Regel ist einfach: Richte dich danach, was deine Mods bzw. dein Modpack voraussetzen. Mischen lässt sich beides nicht.

- Forge: [files.minecraftforge.net](https://files.minecraftforge.net/net/minecraftforge/forge/)
- NeoForge: [neoforged.net](https://neoforged.net/)

## Voraussetzungen

- Windows Server oder Windows 10/11
- Java in der zur Minecraft-Version passenden Fassung
- Port 25565 (TCP) freigegeben
- **6–10 GB Arbeitsspeicher** — Modpacks brauchen deutlich mehr als Vanilla

## Installer herunterladen

Öffne [files.minecraftforge.net](https://files.minecraftforge.net/net/minecraftforge/forge/) und wähle links deine Minecraft-Version.

Dort stehen zwei Builds zur Wahl:

- **Latest** — neuester Build, kann noch Fehler enthalten
- **Recommended** — getestet und stabil, für Server die richtige Wahl

Klicke auf **Installer**. Die Seite zeigt zunächst Werbung; nach einigen Sekunden erscheint oben rechts **SKIP**. Nutze ausschließlich diesen Weg — Downloads von Drittseiten enthalten regelmäßig Schadsoftware.

::: danger Nur die offizielle Quelle
Forge-Installer kursieren auf zahlreichen inoffiziellen Seiten, oft mit manipulierten Dateien. Lade grundsätzlich nur über die offizielle Seite.
:::

## Forge installieren

Lege die heruntergeladene Datei in deinen Serverordner, etwa `C:\Minecraft\Forge`. Öffne dort die Eingabeaufforderung und führe aus:

```cmd
java -jar forge-1.21.1-52.0.40-installer.jar --installServer
```

Passe den Dateinamen an deinen Download an. Der Installer lädt nun die Vanilla-Serverdateien sowie alle Bibliotheken herunter — das dauert einige Minuten.

Nach Abschluss findest du im Ordner:

- `run.bat` — die fertige Startdatei
- `user_jvm_args.txt` — hier stellst du den Arbeitsspeicher ein
- `libraries/` — die Abhängigkeiten von Forge

## Arbeitsspeicher festlegen

Ab Minecraft 1.17 steuerst du den RAM nicht mehr in der Startdatei, sondern in der `user_jvm_args.txt`. Öffne sie und ergänze am Ende:

```
-Xms4G
-Xmx8G
```

Zeilen, die mit `#` beginnen, sind Kommentare und werden ignoriert.

::: warning Nicht zu knapp bemessen
Große Modpacks brechen mit `OutOfMemoryError` ab, wenn der Heap zu klein ist. Rechne bei 150+ Mods mit mindestens 8 GB.
:::

## Ersten Start durchführen

Führe die `run.bat` aus. Wie gewohnt bricht der Server ab und legt die `eula.txt` an:

```properties
eula=true
```

Erneut starten. Forge lädt jetzt alle Mods und erzeugt die Welt. Der erste Start eines Modpacks kann **mehrere Minuten** dauern — das ist normal.

## Mods installieren

1. Server mit `stop` beenden
2. Mod-Dateien als `.jar` in den Ordner `mods` legen
3. Server neu starten

Beziehe Mods von [Modrinth](https://modrinth.com/mods) oder [CurseForge](https://www.curseforge.com/minecraft/mc-mods).

::: danger Client und Server müssen identisch sein
Spieler mit abweichenden Mods werden beim Verbinden abgewiesen. Reine Serverseiten-Mods sind die Ausnahme — sie sind in der Beschreibung entsprechend gekennzeichnet.
:::

## Fertiges Modpack aufsetzen

Für ein komplettes Modpack lädst du das **Server Pack** herunter, das die meisten Packs auf CurseForge anbieten. Es enthält Mods, Konfiguration und eine passende Startdatei.

1. Server-Pack entpacken
2. Enthaltene Installations- oder Startdatei ausführen
3. EULA akzeptieren
4. Arbeitsspeicher in der `user_jvm_args.txt` anpassen

::: tip Modrinth-Modpacks einfacher installieren
Liegt dein Modpack auf Modrinth, geht es noch bequemer per Ein-Zeilen-Befehl: [Modrinth Modpack Server](/gameserver/minecraft/windows/modrinth)
:::

## Troubleshooting

- **`Missing or unsupported mandatory dependencies`:** Eine Mod benötigt eine weitere Mod. Die Konsole nennt sie namentlich.
- **`OutOfMemoryError`:** `-Xmx` in der `user_jvm_args.txt` erhöhen.
- **Spieler werden abgewiesen:** Mod-Liste auf Client und Server abgleichen — Versionsnummern inklusive.
- **Start dauert sehr lange:** Bei großen Packs normal. Erst ab etwa 10 Minuten ohne Konsolenausgabe lohnt eine Fehlersuche.
- **Absturz beim Weltladen:** Eine Mod ist inkompatibel. Halbiere die Mod-Liste testweise, um den Verursacher einzugrenzen.
