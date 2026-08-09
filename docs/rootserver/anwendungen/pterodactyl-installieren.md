# Pterodactyl Panel installieren

Pterodactyl ist ein modernes, webbasiertes Panel zur Verwaltung von Gameservern. Mit diesem quelloffenen Installer kannst du Pterodactyl automatisiert auf deinem Linux-Server bereitstellen.

::: info Pterodactyl Panel
Pterodactyl unterstützt die Verwaltung verschiedener Gameserver-Typen (FiveM, Minecraft, CS:GO, etc.) über ein zentrales Interface. Der Installer automatisiert die komplette Einrichtung.
:::

## Voraussetzungen

- Ein Debian-, Ubuntu- oder anderes Debian-basiertes Linux-System (Ubuntu 22.04 LTS empfohlen)
- **Root-Zugriff** (oder ein Benutzer mit `sudo`-Rechten)
- Freie **Ports 80** (HTTP) und **443** (HTTPS)
- Freie **Port 8080+** (für Node.js Wings-Daemon)
- Mindestens **2 GB RAM** und **10 GB Speicherplatz**
- Eine Domain für SSL-Zertifikate (optional, aber empfohlen)

## Schnellinstallation

Melde dich per SSH an deinem Server an und führe folgenden Befehl aus:

```bash
bash <(curl -s https://raw.githubusercontent.com/pterodactyl-installer/pterodactyl-installer/main/install.sh)
```

Das Installationsskript führt dich durch folgende Schritte:

1. Installation von Abhängigkeiten (PHP, MySQL, Nginx, etc.)
2. Download und Konfiguration des Pterodactyl Panels
3. Einrichtung der Datenbank
4. SSL-Zertifikat-Konfiguration via Let's Encrypt
5. Installation des Wings-Daemon (Node-Daemon für die Server-Verwaltung)

Nach Abschluss erhältst du die Zugangsadresse und Admin-Credentials für das Panel.

## Panel aufrufen

Nach erfolgreicher Installation rufe das Panel im Browser auf:

```
https://<deine-domain-oder-ip>
```

Melde dich mit den generierten Admin-Credentials an und beginne mit der Verwaltung deiner Gameserver.

## Wings-Daemon verwalten

Wings ist der Daemon, der Gameserver-Prozesse auf Nodes verwaltet. Nach der Installation läuft Wings typically auf `https://:<8080>`.

```bash
# Wings starten/neu starten
systemctl restart wings

# Status überprüfen
systemctl status wings

# Logs anschauen
journalctl -u wings -f
```

## Troubleshooting

- **Port 80/443 bereits belegt:** Überprüfe, ob bereits ein Webserver läuft. Beende oder konfiguriere ihn neu.
- **SSL-Zertifikat fehlgeschlagen:** Stelle sicher, dass deine Domain korrekt auf deinen Server zeigt (DNS-A-Record).
- **Wings verbindet sich nicht:** Überprüfe die Wings-Konfiguration in `/etc/pterodactyl/config.yml` und die Panel-Node-Einstellungen.

---

## 🙏 Credits

Dieses Installationsskript wurde vom **Pterodactyl Installer Team** entwickelt. Vielen Dank für dieses großartige Open-Source-Projekt!

→ Projekt auf GitHub: [pterodactyl-installer](https://github.com/pterodactyl-installer/pterodactyl-installer)
