# Webserver (nginx installieren)

nginx ist ein schneller, ressourcenschonender Webserver und die Grundlage für viele weitere Anwendungen wie [phpMyAdmin](./phpmyadmin-nginx-mysql-installieren) oder SSL-Zertifikate mit [Certbot](./certbot-installieren). Diese Anleitung zeigt die Installation auf einem Debian- bzw. Ubuntu-Rootserver.

## Voraussetzungen

- Root-Zugriff (oder ein Benutzer mit `sudo`-Rechten) auf einem Debian- oder Ubuntu-Server
- Freigegebene Ports **80** (HTTP) und **443** (HTTPS) in der Firewall

## Installation

1. Paketquellen aktualisieren:

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. nginx installieren:

   ```bash
   sudo apt install nginx -y
   ```

3. Dienst aktivieren und starten:

   ```bash
   sudo systemctl enable --now nginx
   ```

4. Status prüfen:

   ```bash
   sudo systemctl status nginx
   ```

5. Firewall-Ports freigeben (Beispiel mit `ufw`):

   ```bash
   sudo ufw allow 'Nginx Full'
   ```

6. Installation im Browser testen, indem du die IP-Adresse deines Servers aufrufst:

   ```
   http://<deine-server-ip>
   ```

   Es sollte die Standard-nginx-Willkommensseite erscheinen.

## Wichtige Pfade

| Pfad | Zweck |
| --- | --- |
| `/etc/nginx/nginx.conf` | Haupt-Konfigurationsdatei |
| `/etc/nginx/sites-available/` | Konfigurationen einzelner Websites/vHosts |
| `/etc/nginx/sites-enabled/` | Symlinks auf aktive Konfigurationen aus `sites-available` |
| `/var/www/html/` | Standard-Wurzelverzeichnis für Webinhalte |
| `/var/log/nginx/access.log` / `error.log` | Zugriffs- und Fehlerprotokolle |

## Eigenen Server-Block (vHost) anlegen

1. Neue Konfigurationsdatei erstellen, z. B. für `deinedomain.de`:

   ```bash
   sudo nano /etc/nginx/sites-available/deinedomain.de
   ```

2. Grundgerüst einfügen:

   ```nginx
   server {
       listen 80;
       server_name deinedomain.de www.deinedomain.de;
       root /var/www/deinedomain.de;
       index index.html index.htm;

       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

3. Verzeichnis anlegen und Rechte setzen:

   ```bash
   sudo mkdir -p /var/www/deinedomain.de
   sudo chown -R www-data:www-data /var/www/deinedomain.de
   ```

4. Konfiguration aktivieren:

   ```bash
   sudo ln -s /etc/nginx/sites-available/deinedomain.de /etc/nginx/sites-enabled/
   ```

5. Konfiguration testen und nginx neu laden:

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

::: tip SSL-Zertifikat einrichten
Sobald dein Server-Block läuft und deine Domain per DNS auf den Server zeigt, kannst du mit [Certbot](./certbot-installieren) ein kostenloses Let's-Encrypt-Zertifikat einrichten.
:::

## Troubleshooting

- **"nginx: [emerg] bind() to 0.0.0.0:80 failed":** Es läuft bereits ein anderer Webserver (z. B. Apache) auf Port 80. Prüfe mit `sudo ss -tulpn | grep :80`, welcher Prozess den Port belegt.
- **502 Bad Gateway:** Tritt meist bei nginx als Reverse-Proxy auf, wenn das dahinterliegende Backend (z. B. PHP-FPM) nicht erreichbar ist.
- **Änderungen an der Konfiguration wirken nicht:** Prüfe die Syntax mit `sudo nginx -t` und lade nginx danach mit `sudo systemctl reload nginx` neu.
