# Fail2ban installieren

Eine Firewall entscheidet, welche Ports offen sind. Fail2ban geht einen Schritt weiter: Es liest laufend die Protokolle mit und sperrt IP-Adressen automatisch aus, die zu viele fehlgeschlagene Anmeldeversuche produzieren.

Damit laufen automatisierte Angriffe auf SSH, Mailserver oder Webanwendungen nach wenigen Versuchen ins Leere.

## Voraussetzungen

- Debian- oder Ubuntu-basierter Server
- Root-Rechte bzw. ein Benutzer mit `sudo`
- Sinnvollerweise vorher: [SSH-Zugang absichern](/rootserver/konfiguration/ssh-absichern)

## Installation

```bash
sudo apt update
sudo apt install -y fail2ban
```

Der Dienst startet direkt mit und wird automatisch beim Systemstart aktiviert.

## Eigene Konfiguration anlegen

::: warning jail.conf niemals bearbeiten
Die Datei `/etc/fail2ban/jail.conf` wird bei jedem Update überschrieben. Lege stattdessen eine `jail.local` an — sie hat Vorrang und bleibt erhalten.
:::

```bash
sudo nano /etc/fail2ban/jail.local
```

```ini
[DEFAULT]
# Wie lange eine IP gesperrt bleibt
bantime  = 1h

# Zeitfenster, in dem Fehlversuche gezählt werden
findtime = 10m

# Anzahl der Fehlversuche bis zur Sperre
maxretry = 5

# Eigene IP-Adressen niemals sperren
ignoreip = 127.0.0.1/8 ::1

backend  = systemd

[sshd]
enabled = true
```

::: tip Eigene IP eintragen
Ergänze bei `ignoreip` deine feste IP-Adresse, damit du dich nicht selbst aussperrst. Bei wechselnder IP lässt du es lieber leer und nutzt im Notfall die Konsole im Dashboard.
:::

::: warning backend = systemd
Auf Ubuntu 24.04 und neueren Systemen gibt es keine `/var/log/auth.log` mehr — Anmeldungen landen ausschließlich im Journal. Ohne `backend = systemd` findet Fail2ban dort nichts und sperrt niemanden.
:::

Konfiguration übernehmen:

```bash
sudo systemctl restart fail2ban
```

## Status prüfen

Aktive Jails anzeigen:

```bash
sudo fail2ban-client status
```

Details zu einem Jail, inklusive aktuell gesperrter IP-Adressen:

```bash
sudo fail2ban-client status sshd
```

## Sperre aufheben

```bash
sudo fail2ban-client set sshd unbanip 203.0.113.10
```

Eine IP dauerhaft sperren:

```bash
sudo fail2ban-client set sshd banip 203.0.113.10
```

## Wiederholungstäter länger sperren

Wer mehrfach auffällt, muss nicht nach einer Stunde zurückkommen dürfen:

```ini
[recidive]
enabled  = true
bantime  = 1w
findtime = 1d
maxretry = 5
```

Dieses Jail wertet das Protokoll von Fail2ban selbst aus und sperrt IP-Adressen, die wiederholt gesperrt wurden, gleich für eine Woche.

## Weitere Dienste schützen

Fail2ban bringt fertige Filter für viele Anwendungen mit. Aktiviere sie in der `jail.local`:

```ini
[nginx-http-auth]
enabled = true

[postfix]
enabled = true

[dovecot]
enabled = true
```

Welche Filter verfügbar sind, zeigt:

```bash
ls /etc/fail2ban/filter.d/
```

::: tip Nur aktivieren, was auch läuft
Ein Jail für einen nicht installierten Dienst lässt Fail2ban beim Start mit einem Fehler abbrechen, weil die zugehörige Protokolldatei fehlt.
:::

## Konfiguration testen

Bevor du neu startest, prüfe die Konfiguration:

```bash
sudo fail2ban-client -t
```

Ob ein Filter tatsächlich greift, testest du gegen ein echtes Protokoll:

```bash
sudo fail2ban-regex /var/log/auth.log /etc/fail2ban/filter.d/sshd.conf
```

Die Ausgabe zeigt, wie viele Zeilen der Filter erkannt hat. Steht dort `0 matched`, greift die Regel nicht.

## Zusammenspiel mit UFW

Fail2ban und [UFW](/rootserver/konfiguration/ufw-konfigurieren) arbeiten problemlos nebeneinander. Fail2ban setzt seine Sperren standardmäßig in eine eigene iptables-Kette, die vor den UFW-Regeln greift.

## Troubleshooting

- **`Failed during configuration: Have not found any log file`:** Ein aktiviertes Jail gehört zu einem Dienst, der nicht installiert ist — oder `backend = systemd` fehlt.
- **Niemand wird gesperrt:** Mit `fail2ban-regex` prüfen, ob der Filter überhaupt Treffer erzeugt.
- **Du hast dich selbst ausgesperrt:** Über die Konsole im ForgeHost Dashboard anmelden und `sudo fail2ban-client set sshd unbanip <deine-ip>` ausführen.
- **Dienst startet nicht:** `sudo journalctl -u fail2ban -n 50` zeigt die Ursache.
