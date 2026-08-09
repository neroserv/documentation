# phpMyAdmin mit nginx und MySQL installieren

phpMyAdmin ist eine Weboberfläche zur Verwaltung von MySQL-/MariaDB-Datenbanken. Da das offizielle Debian/Ubuntu-Paket standardmäßig auf Apache ausgelegt ist, richten wir es hier manuell mit **nginx** und **PHP-FPM** ein.

## Voraussetzungen

- Ein laufender [nginx](./nginx-installieren)-Webserver
- Root-Zugriff (bzw. `sudo`-Rechte)

## Schritt 1: MySQL/MariaDB installieren

```bash
sudo apt update
sudo apt install mysql-server -y
sudo mysql_secure_installation
```

Folge dem Assistenten von `mysql_secure_installation`, um ein root-Passwort zu setzen, anonyme Benutzer zu entfernen und Remote-root-Logins zu deaktivieren.

## Schritt 2: PHP-FPM und benötigte Erweiterungen installieren

```bash
sudo apt install php-fpm php-mysql php-mbstring php-zip php-gd php-json php-curl -y
```

Ermittle die installierte PHP-Version (wird für die nginx-Konfiguration benötigt):

```bash
php -v
```

## Schritt 3: phpMyAdmin herunterladen

```bash
cd /usr/share
sudo wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz
sudo tar xzf phpMyAdmin-latest-all-languages.tar.gz
sudo mv phpMyAdmin-*-all-languages phpmyadmin
sudo rm phpMyAdmin-latest-all-languages.tar.gz
```

Konfigurationsdatei aus der Vorlage erstellen:

```bash
sudo cp /usr/share/phpmyadmin/config.sample.inc.php /usr/share/phpmyadmin/config.inc.php
```

Öffne die Datei und trage bei `$cfg['blowfish_secret']` eine zufällige, mindestens 32 Zeichen lange Zeichenkette ein (z. B. erzeugt mit `openssl rand -base64 32`):

```bash
sudo nano /usr/share/phpmyadmin/config.inc.php
```

Temporäres Verzeichnis anlegen und Rechte setzen:

```bash
sudo mkdir -p /usr/share/phpmyadmin/tmp
sudo chown -R www-data:www-data /usr/share/phpmyadmin/tmp
```

## Schritt 4: nginx-Server-Block einrichten

```bash
sudo nano /etc/nginx/sites-available/phpmyadmin
```

```nginx
server {
    listen 80;
    server_name phpmyadmin.deinedomain.de;

    root /usr/share/phpmyadmin;
    index index.php;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

::: tip PHP-Version anpassen
Ersetze `php8.2-fpm.sock` durch die auf deinem Server tatsächlich installierte PHP-FPM-Version (siehe `php -v` in Schritt 2, Socket-Dateien liegen unter `/run/php/`).
:::

Konfiguration aktivieren und nginx neu laden:

```bash
sudo ln -s /etc/nginx/sites-available/phpmyadmin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Schritt 5: Zugriff testen

Rufe im Browser auf:

```
http://phpmyadmin.deinedomain.de
```

Melde dich mit einem MySQL-Benutzer an (z. B. `root` und dem in Schritt 1 gesetzten Passwort, oder einem eigens angelegten Datenbank-Benutzer).

::: danger Öffentlichen Zugriff absichern
phpMyAdmin ist ein beliebtes Angriffsziel. Sichere den Zugriff zusätzlich ab, z. B. durch:
- HTTP Basic-Auth vor phpMyAdmin (`auth_basic` in nginx)
- IP-Beschränkung auf vertrauenswürdige Adressen
- Ein SSL-Zertifikat via [Certbot](./certbot-installieren)
:::

## Troubleshooting

- **502 Bad Gateway:** Der PHP-FPM-Socket-Pfad in der nginx-Konfiguration stimmt nicht mit der installierten PHP-Version überein – prüfe `/run/php/`.
- **"Cannot log in to the MySQL server":** Prüfe Benutzername/Passwort sowie, ob der MySQL-Benutzer per `localhost` oder `%` (remote) zugelassen ist.
- **Weiße Seite / kein PHP wird ausgeführt:** Prüfe, ob PHP-FPM läuft (`sudo systemctl status php8.2-fpm`) und die `location ~ \.php$`-Direktive korrekt in der nginx-Konfiguration steht.
