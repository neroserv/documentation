# Vanilla Minecraft Server unter Windows installieren

Vanilla ist der offizielle Server von Mojang — ohne Plugins, ohne Mods, exakt so, wie das Spiel gedacht ist. Für kleine Runden mit Freunden oder als Testumgebung ist er die einfachste Wahl.

::: tip Vorher lesen
Java, Portfreigabe, Startdatei und EULA sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/windows/grundlagen)
:::

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

## Voraussetzungen

- Windows Server oder Windows 10/11
- Java in der passenden Version (1.20.5+ benötigt Java 21)
- Port 25565 (TCP) freigegeben
- Mindestens 2 GB freier Arbeitsspeicher

## Serverdatei herunterladen

Öffne [minecraft.net/de-de/download/server](https://www.minecraft.net/de-de/download/server). Dort findest du immer die aktuellste Version.

Klicke auf **minecraft_server.X.X.X.jar** und speichere die Datei in deinem Serverordner, zum Beispiel `C:\Minecraft\Vanilla`. Benenne sie anschließend in `server.jar` um — das hält die Startdatei bei Updates unverändert.

::: tip Ältere Versionen
Brauchst du eine bestimmte ältere Version, findest du alle Downloads bei [mcversions.net](https://mcversions.net/).
:::

## Startdatei anlegen

Erstelle im selben Ordner eine `start.bat`:

```bat
@echo off
java -Xms2G -Xmx4G -jar server.jar nogui
pause
```

## Ersten Start durchführen

Führe die `start.bat` per Doppelklick aus. Der Server bricht mit dieser Meldung ab:

```
You need to agree to the EULA in order to run the server.
```

Das ist erwartet. Öffne die neu entstandene `eula.txt` und ändere:

```properties
eula=true
```

Speichern, `start.bat` erneut ausführen. Jetzt erzeugt der Server die Welt — beim ersten Mal dauert das ein bis zwei Minuten. Sobald `Done!` in der Konsole steht, ist er bereit.

## Einstellungen anpassen

Fahre den Server mit `stop` herunter, bevor du Dateien bearbeitest — sonst überschreibt er deine Änderungen beim Beenden.

Öffne `server.properties` und passe an, was du brauchst:

```properties
motd=Willkommen auf meinem Server
max-players=20
difficulty=normal
view-distance=10
spawn-protection=0
```

`spawn-protection=0` ist praktisch, weil sonst nur Operatoren rund um den Spawn bauen dürfen.

## Adminrechte vergeben

Starte den Server und tippe in der Konsole:

```
op DeinMinecraftName
```

Damit hast du im Spiel Zugriff auf alle Befehle.

## Whitelist einrichten

Ein öffentlich erreichbarer Server wird früher oder später gefunden. Eine Whitelist ist der einfachste Schutz:

```
whitelist on
whitelist add Spielername
whitelist reload
```

## Server aktualisieren

1. Server mit `stop` beenden
2. Ordner `world` und die `server.properties` sichern
3. Neue `server.jar` herunterladen und die alte ersetzen
4. Server starten

::: warning Ohne Backup kein Update
Ein Weltdownback auf eine ältere Minecraft-Version ist nicht möglich. Sichere den `world`-Ordner grundsätzlich vor jedem Versionssprung.
:::

## Troubleshooting

- **Server startet nicht, Fenster schließt sofort:** `pause` in der `start.bat` ergänzen und die Fehlermeldung lesen.
- **`UnsupportedClassVersionError`:** Java-Version passt nicht zur Minecraft-Version.
- **Spieler können nicht beitreten:** Firewall-Regel für Port 25565 prüfen.
- **Server ruckelt:** `view-distance` auf 8 reduzieren und dem Server mehr RAM zuweisen.
- **Du brauchst Plugins:** Vanilla unterstützt keine. Wechsle zu [Paper](/gameserver/minecraft/windows/paper).
