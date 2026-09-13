# Paper Minecraft Server unter Windows installieren

Paper ist die meistgenutzte Server-Software für Minecraft. Sie basiert auf Spigot, ist aber deutlich stärker optimiert, behebt zahlreiche Vanilla-Fehler und bietet umfangreiche eigene Konfigurationsmöglichkeiten. Alle Spigot- und Bukkit-Plugins laufen darauf.

::: tip Vorher lesen
Java, Portfreigabe, Startdatei und EULA sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/windows/grundlagen)
:::

## Video-Tutorial

Ergänzend zu dieser Anleitung findest du hier ein aktuelles Video von **The Breakdown**. Vielen Dank für das hilfreiche Tutorial!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/fQG9t8kSaMU"
    title="How To Make a Paper Minecraft Server (2026)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [How To Make a Paper Minecraft Server (2026)](https://www.youtube.com/watch?v=fQG9t8kSaMU)

## Warum Paper?

- Spürbar bessere Leistung als Vanilla und Spigot, besonders bei vielen Entitäten
- Behebt Exploits und Dupe-Bugs, die in Vanilla offen bleiben
- Volle Kompatibilität mit Bukkit- und Spigot-Plugins
- Feingranulare Einstellungen in `paper-world-defaults.yml`

## Voraussetzungen

- Windows Server oder Windows 10/11
- Java in der passenden Version (1.20.5+ benötigt Java 21)
- Port 25565 (TCP) freigegeben
- Mindestens 4 GB Arbeitsspeicher empfohlen

## Paper herunterladen

Öffne [papermc.io/downloads/paper](https://papermc.io/downloads/paper) und wähle deine Minecraft-Version. Lade den obersten Build herunter — das ist der aktuellste.

Speichere die Datei in deinem Serverordner und benenne sie in `server.jar` um.

::: warning Experimentelle Builds
Ist eine Version noch als **Experimental** gekennzeichnet, gilt sie nicht als stabil. Für einen produktiven Server nimmst du besser die letzte als stabil markierte Minecraft-Version.
:::

## Startdatei mit optimierten Flags

Paper profitiert deutlich von angepassten JVM-Flags. Erstelle eine `start.bat` mit folgendem Inhalt:

```bat
@echo off
java -Xms4G -Xmx4G -XX:+UseG1GC -XX:+ParallelRefProcEnabled ^
 -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions ^
 -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 ^
 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M ^
 -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 ^
 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 ^
 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 ^
 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 ^
 -jar server.jar nogui
pause
```

::: tip Xms und Xmx gleich setzen
Bei Paper wird empfohlen, Start- und Maximalwert des Arbeitsspeichers identisch zu wählen. Das vermeidet, dass die JVM den Heap zur Laufzeit umverteilt.
:::

Das `^` am Zeilenende ist die Zeilenfortsetzung unter Windows. Achte darauf, dass danach kein Leerzeichen steht.

## Ersten Start durchführen

Führe die `start.bat` aus. Der Server bricht ab und legt die `eula.txt` an. Setze darin:

```properties
eula=true
```

Starte erneut. Paper erzeugt jetzt die Welt und legt zusätzlich den Ordner `plugins` sowie die Paper-Konfigurationsdateien an.

## Plugins installieren

1. Plugin als `.jar` herunterladen, etwa von [Modrinth](https://modrinth.com/plugins), [Hangar](https://hangar.papermc.io/) oder [SpigotMC](https://www.spigotmc.org/resources/)
2. Datei in den Ordner `plugins` legen
3. Server mit `stop` beenden und neu starten

Mit `/plugins` im Spiel oder `plugins` in der Konsole siehst du, was geladen wurde. Grün bedeutet aktiv, rot steht für einen Fehler beim Laden.

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

Paper legt beim ersten Start `config/paper-global.yml` und `config/paper-world-defaults.yml` an. Zwei Werte mit großer Wirkung:

```yaml
chunks:
  max-auto-save-chunks-per-tick: 8
entities:
  spawning:
    despawn-ranges:
      monster:
        hard: 96
```

Prüfe die Serverlast jederzeit mit dem Konsolenbefehl `tps`. Werte um 20.0 sind optimal, dauerhaft unter 18.0 deutet auf ein Problem hin.

## Server aktualisieren

1. Server mit `stop` beenden
2. `world`-Ordner und `plugins` sichern
3. Neue Paper-Datei herunterladen, alte `server.jar` ersetzen
4. Starten und in der Konsole auf Plugin-Warnungen achten

## Troubleshooting

- **Plugin lädt nicht:** Version passt nicht, oder eine Abhängigkeit fehlt. Die Konsole nennt den Grund beim Start.
- **`tps` dauerhaft niedrig:** Sichtweite reduzieren, Entitäten prüfen, Timings-Report über `/timings paste` auswerten.
- **Server belegt sehr viel RAM:** Das ist bei `-Xms=-Xmx` normal — die JVM reserviert den Speicher vorab.
- **Welt eines Vanilla-Servers übernehmen:** Funktioniert; kopiere den `world`-Ordner einfach in den Paper-Ordner.
