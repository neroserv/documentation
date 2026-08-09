# screen installieren und nutzen

`screen` erlaubt es dir, Terminal-Sitzungen im Hintergrund laufen zu lassen – ideal, um lang laufende Prozesse (z. B. Server, Installationen, Downloads) auch nach dem Trennen der SSH-Verbindung weiterlaufen zu lassen.

## Installation

```bash
sudo apt update
sudo apt install screen -y
```

Version prüfen:

```bash
screen --version
```

## Grundlegende Nutzung

### Neue Sitzung starten

```bash
screen -S meinesitzung
```

Der Parameter `-S` vergibt einen frei wählbaren Namen für die Sitzung, damit du sie später leichter wiederfindest.

### Sitzung im Hintergrund lassen (Detach)

Innerhalb der Sitzung:

```
CTRL+A gefolgt von D
```

Die Sitzung läuft danach im Hintergrund weiter, auch wenn du dich per SSH abmeldest.

### Laufende Sitzungen anzeigen

```bash
screen -ls
```

Beispielausgabe:

```
There are screens on:
    12345.meinesitzung   (Detached)
1 Socket in /run/screen/S-root.
```

### Wieder zu einer Sitzung verbinden (Attach)

```bash
screen -r meinesitzung
```

Alternativ über die ID:

```bash
screen -r 12345
```

### Sitzung beenden

Innerhalb der Sitzung einfach den laufenden Vorgang beenden und:

```bash
exit
```

Oder von außen, ohne die Sitzung erneut zu betreten:

```bash
screen -X -S meinesitzung quit
```

## Praxisbeispiel

Einen Server-Prozess in einer eigenen Sitzung starten, damit er nach dem Verbindungsabbruch weiterläuft:

```bash
screen -S gameserver
./start-server.sh
# Danach: CTRL+A, D zum Detachen
```

Später wieder verbinden, um die Ausgabe zu prüfen:

```bash
screen -r gameserver
```

## Nützliche Tastenkombinationen innerhalb von screen

| Tastenkombination | Funktion |
| --- | --- |
| `CTRL+A` `D` | Sitzung detachen (im Hintergrund weiterlaufen lassen) |
| `CTRL+A` `C` | Neues Fenster innerhalb der Sitzung erstellen |
| `CTRL+A` `N` | Zum nächsten Fenster wechseln |
| `CTRL+A` `P` | Zum vorherigen Fenster wechseln |
| `CTRL+A` `K` | Aktuelles Fenster beenden (kill) |

## Troubleshooting

- **"There is no screen to be resumed":** Es existiert keine passende Sitzung mit diesem Namen – prüfe mit `screen -ls`, welche Sitzungen aktuell laufen.
- **"There is a screen on... (Attached)":** Die Sitzung ist bereits in einer anderen Verbindung aktiv verbunden. Nutze `screen -d -r meinesitzung`, um sie dort zu trennen und hier zu übernehmen.
