# Certbot installieren

Certbot richtet automatisch kostenlose SSL/TLS-Zertifikate von **Let's Encrypt** ein und konfiguriert damit HTTPS für deinen Webserver. Diese Anleitung geht von einem bereits installierten [nginx](./nginx-installieren) auf Debian/Ubuntu aus.

## Voraussetzungen

- Ein laufender [nginx](./nginx-installieren)-Webserver mit eingerichtetem Server-Block für deine Domain
- Eine Domain, deren **DNS A-Record** bereits auf die IP-Adresse deines Servers zeigt
- Freigegebene Ports **80** und **443** in der Firewall

## Installation

1. Paketquellen aktualisieren:

   ```bash
   sudo apt update
   ```

2. Certbot inklusive nginx-Plugin installieren:

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

## Zertifikat ausstellen

1. Certbot mit dem nginx-Plugin ausführen und dabei deine Domain(s) angeben:

   ```bash
   sudo certbot --nginx -d deinedomain.de -d www.deinedomain.de
   ```

2. Folge den interaktiven Anweisungen:
   - E-Mail-Adresse für Sicherheits- und Ablaufbenachrichtigungen eingeben
   - Nutzungsbedingungen von Let's Encrypt akzeptieren
   - Optional: automatische Weiterleitung von HTTP auf HTTPS aktivieren (empfohlen)

3. Certbot passt die nginx-Konfiguration automatisch an und lädt nginx neu. Rufe anschließend `https://deinedomain.de` im Browser auf, um das Zertifikat zu testen.

Die ausgestellten Zertifikate liegen danach unter:

```
/etc/letsencrypt/live/deinedomain.de/fullchain.pem
/etc/letsencrypt/live/deinedomain.de/privkey.pem
```

## Automatische Verlängerung

Let's-Encrypt-Zertifikate sind nur 90 Tage gültig. Das `certbot`-Paket richtet dafür automatisch einen systemd-Timer bzw. Cronjob ein.

1. Automatische Verlängerung testen (führt keine echte Erneuerung durch):

   ```bash
   sudo certbot renew --dry-run
   ```

2. Timer-Status prüfen:

   ```bash
   sudo systemctl status certbot.timer
   ```

## Troubleshooting

- **"Timeout during connect" / Validierung schlägt fehl:** Stelle sicher, dass Port 80 erreichbar ist und dein DNS-Eintrag bereits korrekt auf die Server-IP zeigt (Propagation kann einige Minuten bis Stunden dauern).
- **Zertifikat wird nicht erneuert:** Prüfe die Logs unter `/var/log/letsencrypt/letsencrypt.log` sowie den Status des Timers mit `sudo systemctl status certbot.timer`.
- **Mehrere Domains/Subdomains absichern:** Führe `certbot --nginx` erneut mit zusätzlichen `-d`-Parametern aus, um weitere Domains zum bestehenden oder einem neuen Zertifikat hinzuzufügen.
