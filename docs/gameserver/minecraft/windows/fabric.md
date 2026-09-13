# Fabric Minecraft Server unter Windows installieren

Fabric ist die moderne, schlanke Alternative zu Forge. Der Mod-Loader startet schneller, erscheint meist wenige Tage nach einer neuen Minecraft-Version und ist die Grundlage vieler Performance-Mods wie Lithium, Krypton oder Ferrite Core.

::: tip Vorher lesen
Java, Portfreigabe und EULA sind für alle Server-Varianten identisch und hier zusammengefasst: [Grundlagen](/gameserver/minecraft/windows/grundlagen)
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

- Windows Server oder Windows 10/11
- Java in der zur Minecraft-Version passenden Fassung
- Port 25565 (TCP) freigegeben
- 4–8 GB Arbeitsspeicher, je nach Anzahl der Mods

## Installer herunterladen

Öffne [fabricmc.net/use/server](https://fabricmc.net/use/server/). Dort kannst du dir entweder direkt eine fertige Server-Datei erzeugen lassen oder den universellen Installer herunterladen.

Wir nutzen den Installer, weil sich damit auch spätere Versionswechsel erledigen lassen. Lade die `fabric-installer-X.X.X.jar` in deinen Serverordner, zum Beispiel `C:\Minecraft\Fabric`.

## Fabric installieren

Öffne die Eingabeaufforderung im Serverordner und führe aus:

```cmd
java -jar fabric-installer-1.0.1.jar server -mcversion 1.21.4 -downloadMinecraft
```

Passe Dateinamen und Minecraft-Version an. Die Option `-downloadMinecraft` sorgt dafür, dass der Vanilla-Server gleich mit heruntergeladen wird.

Danach liegt die Datei `fabric-server-launch.jar` im Ordner.

## Startdatei anlegen

Erstelle eine `start.bat`:

```bat
@echo off
java -Xms4G -Xmx6G -jar fabric-server-launch.jar nogui
pause
```

## Ersten Start durchführen

`start.bat` ausführen, in der erzeugten `eula.txt` setzen:

```properties
eula=true
```

Erneut starten. Fabric erstellt den Ordner `mods` und erzeugt die Welt.

## Fabric API installieren

Nahezu jede Fabric-Mod setzt die **Fabric API** voraus. Sie ist nicht Teil des Loaders und muss separat installiert werden.

Lade sie von [modrinth.com/mod/fabric-api](https://modrinth.com/mod/fabric-api) in der zu deiner Minecraft-Version passenden Fassung und lege sie in den Ordner `mods`.

::: warning Häufigster Fehler
Fehlt die Fabric API, starten die meisten Mods nicht und der Server bricht mit einer Abhängigkeitsmeldung ab. Installiere sie immer zuerst.
:::

## Mods installieren

1. Server mit `stop` beenden
2. Mod-Dateien in den Ordner `mods` legen
3. Server neu starten

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

## Auf eine neue Version wechseln

1. Server mit `stop` beenden, `world` und `mods` sichern
2. Installer mit der neuen `-mcversion` erneut ausführen
3. Alle Mods durch Fassungen für die neue Version ersetzen
4. Server starten

## Troubleshooting

- **`Could not find Fabric API`:** Fabric API fehlt im `mods`-Ordner oder passt nicht zur Version.
- **Mod lädt nicht:** Prüfen, ob es sich um eine Forge-Version der Mod handelt — die ist inkompatibel.
- **Spieler werden abgewiesen:** Client-seitige Mods müssen auf beiden Seiten identisch sein.
- **`UnsupportedClassVersionError`:** Java-Version passt nicht zur Minecraft-Version.
