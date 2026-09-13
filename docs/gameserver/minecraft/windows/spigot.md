# Spigot Minecraft Server unter Windows installieren

Spigot war jahrelang der Standard für Plugin-Server und ist bis heute die Grundlage, auf der Paper aufbaut. Die Installation unterscheidet sich allerdings von allen anderen Varianten: Aus rechtlichen Gründen darf Spigot keine fertigen Serverdateien anbieten — du erzeugst sie mit **BuildTools** selbst.

::: tip Für die meisten ist Paper die bessere Wahl
Paper ist zu Spigot-Plugins vollständig kompatibel, spürbar performanter und lässt sich direkt herunterladen. Greife zu Spigot nur, wenn ein Plugin ausdrücklich Spigot voraussetzt: [Paper installieren](/gameserver/minecraft/windows/paper)
:::

## Voraussetzungen

- Windows Server oder Windows 10/11
- Java (JDK, nicht nur JRE) in passender Version
- [Git für Windows](https://git-scm.com/download/win) — BuildTools benötigt es zwingend
- Port 25565 (TCP) freigegeben
- Etwa 2 GB freier Speicherplatz für den Build-Vorgang

## BuildTools herunterladen

Lege einen separaten Ordner an, zum Beispiel `C:\Minecraft\BuildTools`. Der Build erzeugt zahlreiche temporäre Dateien, die im Serverordner nur stören würden.

Lade die [BuildTools.jar](https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar) dorthin herunter.

## Spigot bauen

Öffne die Eingabeaufforderung in diesem Ordner und starte den Build für deine Wunschversion:

```cmd
java -jar BuildTools.jar --rev 1.21.4
```

BuildTools lädt daraufhin die Quellen von Mojang und Spigot, entpackt sie und kompiliert den Server. Das dauert je nach Rechner und Anbindung **10 bis 30 Minuten** — das ist normal, auch wenn zwischendurch längere Pausen ohne Ausgabe auftreten.

Weitere nützliche Aufrufe:

```cmd
:: Neueste stabile Version bauen
java -jar BuildTools.jar --rev latest

:: Nur Spigot, ohne CraftBukkit-Artefakte
java -jar BuildTools.jar --rev 1.21.4 --compile spigot
```

Nach Abschluss liegt im Ordner die Datei `spigot-1.21.4.jar`.

::: warning Ohne Git kein Build
Fehlt Git, bricht BuildTools mit einer Meldung über einen nicht gefundenen Befehl ab. Installiere Git und öffne die Eingabeaufforderung danach neu.
:::

## Server einrichten

Kopiere die erzeugte `spigot-1.21.4.jar` in deinen eigentlichen Serverordner, etwa `C:\Minecraft\Spigot`, und benenne sie in `server.jar` um.

Lege daneben eine `start.bat` an:

```bat
@echo off
java -Xms2G -Xmx4G -jar server.jar nogui
pause
```

## Ersten Start durchführen

`start.bat` ausführen, danach in der erzeugten `eula.txt`:

```properties
eula=true
```

Erneut starten. Spigot erzeugt jetzt die Welt und legt den Ordner `plugins` sowie die Datei `spigot.yml` an.

## Plugins installieren

Lege die `.jar`-Dateien in den Ordner `plugins` und starte den Server neu. Eine große Auswahl findest du auf [SpigotMC](https://www.spigotmc.org/resources/).

Mit `plugins` in der Konsole prüfst du, was erfolgreich geladen wurde.

## spigot.yml

Neben `server.properties` und `bukkit.yml` bringt Spigot die `spigot.yml` mit. Relevante Werte:

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

1. Server mit `stop` beenden und `world` sowie `plugins` sichern
2. Im BuildTools-Ordner erneut `java -jar BuildTools.jar --rev <neue Version>` ausführen
3. Erzeugte `.jar` in den Serverordner kopieren und die alte ersetzen
4. Server starten und auf Plugin-Warnungen achten

::: tip BuildTools aktuell halten
Lade vor jedem Build die aktuelle `BuildTools.jar` neu herunter. Eine veraltete Version kann neue Minecraft-Versionen nicht bauen.
:::

## Troubleshooting

- **`git` wurde nicht gefunden:** Git für Windows installieren und Eingabeaufforderung neu öffnen.
- **Build bricht mit Speicherfehler ab:** Mehr Heap zuweisen: `java -Xmx2G -jar BuildTools.jar --rev 1.21.4`
- **Build hängt scheinbar:** Geduld — das Kompilieren läuft ohne Fortschrittsanzeige. Erst nach über einer Stunde lohnt ein Abbruch.
- **`--rev` Version nicht verfügbar:** Sehr neue Minecraft-Versionen brauchen ein paar Tage, bis Spigot nachzieht.
- **Plugin verlangt Paper:** Manche moderne Plugins nutzen ausschließlich die Paper-API und laufen auf Spigot nicht.
