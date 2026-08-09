# FiveM Server unter Linux installieren

Diese Anleitung zeigt dir, wie du einen FiveM-Server auf einem Debian- bzw. Ubuntu-basierten Linux-Server automatisiert installierst. Dafür verwenden wir den quelloffenen [fivem-installer](https://github.com/Twe3x/fivem-installer) von Twe3x, der Serverdateien, txAdmin, eine optionale Datenbank sowie praktische Verwaltungsskripte in einem Rutsch einrichtet.

::: warning Nutzung auf eigene Verantwortung
Der Installer ist ein Community-Projekt und nicht offiziell von Cfx.re. Wirf vor der Ausführung einen Blick in den [Quellcode des Skripts](https://github.com/Twe3x/fivem-installer/blob/main/setup.sh), wenn du auf Nummer sicher gehen willst.
:::

## Voraussetzungen

- Ein Debian-, Ubuntu- oder anderes Debian-basiertes Linux-System (z. B. Ubuntu 22.04 LTS)
- **Root-Zugriff** (oder ein Benutzer mit `sudo`-Rechten)
- Freie **Ports 30120** (Spielserver, TCP/UDP) und **40120** (txAdmin-Webinterface)
- Ausreichend Arbeitsspeicher und Speicherplatz für Serverartefakte und Ressourcen

Prüfe vor der Installation, ob die benötigten Ports in deiner Firewall freigegeben sind, zum Beispiel mit `ufw`:

```bash
sudo ufw allow 30120/tcp
sudo ufw allow 30120/udp
sudo ufw allow 40120/tcp
```

## Schnellinstallation

Melde dich per SSH an deinem Server an und führe folgenden Befehl aus, um das interaktive Installationsmenü zu starten:

```bash
bash <(curl -s https://raw.githubusercontent.com/Twe3x/fivem-installer/main/setup.sh)
```

Das Skript führt dich anschließend Schritt für Schritt durch die Einrichtung und fragt unter anderem ab:

1. Welche Artefakt-Version installiert werden soll (empfohlen oder aktuellste Version)
2. Ob txAdmin eingerichtet werden soll
3. Ob eine MariaDB-Datenbank inklusive PHPMyAdmin installiert werden soll
4. Ob der Server automatisch nach einem Neustart des Systems starten soll (Crontab)

Nach Abschluss der Installation liegen alle Dateien standardmäßig unter `/home/FiveM/` – inklusive Serverartefakte, `cfx-server-data`, der generierten `server.cfg` sowie der Verwaltungsskripte.

## Automatisierte (non-interaktive) Installation

Für automatisierte Deployments, z. B. in Provisionierungs-Skripten, unterstützt der Installer einen non-interaktiven Modus mit Flags:

```bash
bash <(curl -s https://raw.githubusercontent.com/Twe3x/fivem-installer/main/setup.sh) \
  --non-interactive --crontab --version latest --phpmyadmin --simple \
  --generate_password
```

Damit wird der Server vollautomatisch mit der aktuellsten Artefakt-Version, Autostart per Crontab sowie einer MariaDB/PHPMyAdmin-Instanz mit automatisch generiertem Passwort eingerichtet.

### Verfügbare CLI-Flags

| Flag | Beschreibung |
| --- | --- |
| `--non-interactive` | Führt die Installation ohne Rückfragen durch |
| `-v, --version <URL\|latest>` | Legt die zu installierende Artefakt-Version fest |
| `-u, --update <pfad>` | Aktualisiert eine bestehende Installation |
| `-c, --crontab` | Aktiviert den Autostart des Servers nach einem Systemneustart |
| `--no-txadmin` | Installiert den Server ohne txAdmin-Interface |
| `--kill-port` | Beendet Prozesse, die Port 40120 blockieren |
| `--delete-dir` | Entfernt das Verzeichnis `/home/FiveM` vollständig |
| `-p, --phpmyadmin` | Installiert MariaDB und PHPMyAdmin |
| `--security` / `--simple` | Wählt den Installationsmodus der Datenbank |
| `--db_user <name>` | Setzt den Datenbank-Benutzernamen |
| `--db_password <passwort>` | Setzt das Datenbank-Passwort |
| `--generate_password` | Generiert automatisch ein sicheres Datenbank-Passwort |

## Server verwalten

Nach der Installation stehen dir im Ordner `/home/FiveM/` drei Skripte zur Verwaltung des Servers zur Verfügung. Der Server läuft dabei in einer `screen`-Sitzung, damit er auch nach dem Trennen der SSH-Verbindung weiterläuft.

```bash
# Server starten
sh /home/FiveM/start.sh

# Server stoppen (beendet die screen-Sitzung)
sh /home/FiveM/stop.sh

# Live-Konsole des Servers öffnen
sh /home/FiveM/attach.sh
```

Um die Konsole wieder zu verlassen, ohne den Server zu stoppen, drücke `CTRL+A` gefolgt von `D` (Screen-Sitzung im Hintergrund lassen).

## txAdmin aufrufen

Sofern txAdmin nicht per `--no-txadmin` deaktiviert wurde, zeigt dir das Skript nach Abschluss der Installation eine **PIN** an. Rufe anschließend im Browser folgende Adresse auf:

```
http://<deine-server-ip>:40120
```

Gib dort den angezeigten PIN-Code ein, um dein Admin-Konto einzurichten und den Server über die Weboberfläche zu verwalten.

## Server aktualisieren

Um eine bestehende Installation auf eine neue Artefakt-Version zu aktualisieren, nutze das `--update`-Flag mit dem Pfad zur bestehenden Installation:

```bash
bash <(curl -s https://raw.githubusercontent.com/Twe3x/fivem-installer/main/setup.sh) --update /home/FiveM
```

## Deinstallation

Möchtest du die Installation vollständig entfernen, kannst du das `--delete-dir`-Flag verwenden. Das entfernt das Verzeichnis `/home/FiveM` inklusive aller Server- und Konfigurationsdateien unwiderruflich:

```bash
bash <(curl -s https://raw.githubusercontent.com/Twe3x/fivem-installer/main/setup.sh) --delete-dir
```

::: danger Achtung
Dieser Befehl löscht alle Serverdaten, Ressourcen und die Konfiguration unwiderruflich. Erstelle vorher unbedingt ein Backup, falls du Ressourcen oder die Datenbank behalten möchtest.
:::

## Troubleshooting

- **Port 40120 ist bereits belegt:** Führe die Installation erneut mit dem Flag `--kill-port` aus, um blockierende Prozesse zu beenden.
- **Server startet nicht nach einem Reboot:** Prüfe, ob die Installation mit `-c` / `--crontab` durchgeführt wurde, und kontrolliere den Crontab-Eintrag mit `crontab -l`.
- **Keine Verbindung zum Spielserver möglich:** Kontrolliere, ob Port 30120 (TCP & UDP) in deiner Firewall sowie ggf. im Netzwerk deines Hosting-Providers freigegeben ist.

---

## 🙏 Credits

Dieses Installationsskript wurde von **[Twe3x](https://github.com/Twe3x)** entwickelt. Vielen Dank für diese hervorragende Open-Source-Lösung!

→ Projekt auf GitHub: [fivem-installer](https://github.com/Twe3x/fivem-installer)
