# Modrinth Modpack Server unter Windows installieren

Modrinth ist eine offene Plattform für Mods, Plugins und Modpacks. Der große Vorteil für Serverbetreiber: Modpacks liegen dort im offenen `.mrpack`-Format vor und lassen sich mit einem einzigen Befehl als Server aufsetzen — inklusive Mod-Loader, aller Mods und der mitgelieferten Konfiguration.

::: tip Vorher lesen
Java, Portfreigabe und EULA sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/windows/grundlagen)
:::

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **Chupacabra Tutorials**. Vielen Dank für das hilfreiche Tutorial!

Das Video zeigt die Modrinth-Seite aus Sicht des Spielers — hilfreich, um zu verstehen, wie deine Spieler das passende Client-Modpack installieren.

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/A9nO5_alOdM"
    title="How to Use Modrinth to Install Mods & Create Custom Modpacks (2026 Guide)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [How to Use Modrinth to Install Mods & Create Custom Modpacks (2026 Guide)](https://www.youtube.com/watch?v=A9nO5_alOdM)

## Voraussetzungen

- Windows Server oder Windows 10/11
- Java in der zum Modpack passenden Version
- Port 25565 (TCP) freigegeben
- 6–12 GB Arbeitsspeicher, je nach Modpack

## mrpack-install herunterladen

Für die Installation nutzen wir das quelloffene Werkzeug [mrpack-install](https://github.com/nothub/mrpack-install). Es liest eine `.mrpack`-Datei aus, installiert den passenden Loader und lädt alle Mods automatisch herunter.

Lade dir von der [Releases-Seite](https://github.com/nothub/mrpack-install/releases) die Datei `mrpack-install-windows-amd64.exe` herunter und lege sie in deinen Serverordner, zum Beispiel `C:\Minecraft\Modpack`.

::: tip Quellcode einsehen
Es handelt sich um ein Community-Projekt. Wenn du auf Nummer sicher gehen möchtest, wirf vorher einen Blick in das [GitHub-Repository](https://github.com/nothub/mrpack-install).
:::

## Modpack heraussuchen

Öffne [modrinth.com/modpacks](https://modrinth.com/modpacks) und suche dein Wunsch-Modpack. Den Bezeichner findest du in der Adresszeile:

```
https://modrinth.com/modpack/adrenaline
                              ^^^^^^^^^^
```

Achte auf der Seite darauf, dass das Pack unter **Server** als unterstützt markiert ist. Reine Client-Packs lassen sich nicht als Server betreiben.

## Modpack installieren

Öffne die Eingabeaufforderung im Serverordner und führe aus:

```cmd
mrpack-install-windows-amd64.exe adrenaline
```

Das Werkzeug ermittelt automatisch die aktuellste Version, installiert den benötigten Loader und lädt sämtliche Mods herunter.

Eine bestimmte Version installierst du so:

```cmd
mrpack-install-windows-amd64.exe adrenaline 1.4.0
```

Auch eine direkte URL oder eine lokal heruntergeladene `.mrpack`-Datei funktioniert:

```cmd
mrpack-install-windows-amd64.exe https://cdn.modrinth.com/data/.../pack.mrpack
mrpack-install-windows-amd64.exe C:\Downloads\modpack.mrpack
```

## Startdatei anlegen

Je nach Loader heißt die erzeugte Datei unterschiedlich. Bei Fabric:

```bat
@echo off
java -Xms4G -Xmx8G -jar fabric-server-launch.jar nogui
pause
```

Bei Forge oder NeoForge nutzt du stattdessen die mitgelieferte `run.bat` und stellst den Arbeitsspeicher in der `user_jvm_args.txt` ein.

## Ersten Start durchführen

Server starten, in der erzeugten `eula.txt` setzen:

```properties
eula=true
```

Erneut starten. Der erste Start großer Modpacks dauert oft **mehrere Minuten** — die Konsole wirkt zwischenzeitlich eingefroren, arbeitet aber.

## Passendes Client-Modpack

Deine Spieler installieren dasselbe Modpack über den [Modrinth App Launcher](https://modrinth.com/app), über Prism Launcher oder den ATLauncher. Wichtig ist nur, dass Pack **und Version** exakt übereinstimmen.

::: danger Versionen müssen identisch sein
Unterschiedliche Modpack-Versionen führen beim Verbinden zu einer Fehlermeldung über fehlende oder abweichende Mods. Kommuniziere die genaue Version an deine Spieler.
:::

## Modpack aktualisieren

1. Server mit `stop` beenden
2. Ordner `world` und `config` sichern
3. Neue Version installieren:

```cmd
mrpack-install-windows-amd64.exe adrenaline 1.5.0
```

4. Server starten und Konsolenausgabe prüfen

::: warning Immer erst sichern
Modpack-Updates tauschen Mods aus und können Weltdaten unbrauchbar machen. Ein Backup vor jedem Update ist Pflicht.
:::

## Troubleshooting

- **`modpack not found`:** Bezeichner aus der URL prüfen — nicht den Anzeigenamen verwenden.
- **`OutOfMemoryError`:** `-Xmx` erhöhen; große Packs brauchen 8 GB und mehr.
- **Spieler werden abgewiesen:** Modpack-Version auf Client und Server abgleichen.
- **Pack lässt sich nicht installieren:** Es ist ein reines Client-Pack ohne Server-Unterstützung.
- **Start bricht mit fehlender Abhängigkeit ab:** Manche Packs erwarten zusätzlich eine bestimmte Java-Version — sie steht auf der Modrinth-Seite.
