# SSH-Zugang absichern

Ein frisch aufgesetzter Server wird innerhalb weniger Minuten automatisiert nach offenen SSH-Ports durchsucht und mit Anmeldeversuchen bombardiert. Mit wenigen Handgriffen fällt dieser gesamte Angriffsweg weg.

Der Kern ist schnell erzählt: Anmeldung per Schlüssel statt Passwort, danach Passwortanmeldung und Root-Login abschalten.

## Voraussetzungen

- Zugriff auf den Server per [SSH](/rootserver/linux/ssh-verbinden)
- Root-Rechte bzw. ein Benutzer mit `sudo`
- Ein Terminal auf deinem lokalen Rechner

::: danger Zweites Terminal offen halten
Lass während der gesamten Anleitung **eine funktionierende SSH-Sitzung offen**. Jede Änderung testest du in einem neuen Fenster. Nur so kommst du bei einem Fehler noch an den Server heran.
:::

## Schritt 1: SSH-Schlüssel erzeugen

Auf deinem **lokalen** Rechner — nicht auf dem Server:

```bash
ssh-keygen -t ed25519 -C "mein-notebook"
```

Bestätige den vorgeschlagenen Pfad mit Enter und vergib eine Passphrase. Sie schützt den Schlüssel, falls dein Rechner in falsche Hände gerät.

Es entstehen zwei Dateien:

- `~/.ssh/id_ed25519` — der **private** Schlüssel, bleibt für immer auf deinem Rechner
- `~/.ssh/id_ed25519.pub` — der öffentliche Schlüssel, kommt auf den Server

::: warning Privaten Schlüssel niemals weitergeben
Der private Schlüssel wird nie kopiert, nie verschickt und nie auf den Server gelegt. Wer ihn besitzt, kommt auf deinen Server.
:::

## Schritt 2: Schlüssel auf den Server übertragen

```bash
ssh-copy-id benutzer@deine-server-ip
```

Du wirst noch einmal nach dem Passwort gefragt — danach nicht mehr.

Steht `ssh-copy-id` nicht zur Verfügung (etwa unter Windows), geht es auch manuell:

```bash
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh benutzer@server-ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

Teste jetzt in einem **neuen** Fenster:

```bash
ssh benutzer@deine-server-ip
```

Die Anmeldung muss ohne Serverpasswort funktionieren. Erst wenn das klappt, geht es weiter.

## Schritt 3: Passwortanmeldung abschalten

```bash
sudo nano /etc/ssh/sshd_config
```

Setze bzw. ändere diese Werte:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
KbdInteractiveAuthentication no
```

::: warning Eingebundene Konfigurationsdateien beachten
Auf Debian 12 und Ubuntu 22.04+ lädt die `sshd_config` am Anfang zusätzliche Dateien aus `/etc/ssh/sshd_config.d/`. Ein dortiger Eintrag **überschreibt** deine Änderung. Prüfe deshalb:

```bash
grep -r "PasswordAuthentication" /etc/ssh/sshd_config.d/
```
:::

Konfiguration auf Syntaxfehler prüfen und erst dann übernehmen:

```bash
sudo sshd -t && sudo systemctl restart ssh
```

Bricht `sshd -t` mit einer Meldung ab, wird der Dienst gar nicht erst neu gestartet — deine bestehende Verbindung bleibt erhalten.

Prüfe anschließend, was wirklich aktiv ist:

```bash
sudo sshd -T | grep -E "permitrootlogin|passwordauthentication"
```

## Schritt 4: Weitere Härtung

Diese Einstellungen sind optional, aber sinnvoll:

```
MaxAuthTries 3
LoginGraceTime 20
AllowUsers deinbenutzer
X11Forwarding no
```

`AllowUsers` ist besonders wirksam: Nur die dort genannten Benutzer dürfen sich überhaupt anmelden.

## SSH-Port ändern

Ein anderer Port verhindert keinen gezielten Angriff, reduziert aber das Grundrauschen automatisierter Scans deutlich.

```
Port 2222
```

Vorher unbedingt in der Firewall freigeben:

```bash
sudo ufw allow 2222/tcp
sudo sshd -t && sudo systemctl restart ssh
```

::: warning Socket-Aktivierung unter Ubuntu
Ab Ubuntu 22.10 wird SSH über ein systemd-Socket gestartet. Die Zeile `Port` in der `sshd_config` bleibt dort wirkungslos. Setze den Port stattdessen so:

```bash
sudo systemctl edit ssh.socket
```

```ini
[Socket]
ListenStream=
ListenStream=2222
```

```bash
sudo systemctl daemon-reload
sudo systemctl restart ssh.socket
```
:::

Verbinden dich danach mit:

```bash
ssh -p 2222 benutzer@server-ip
```

## Nächste Schritte

- [UFW installieren und konfigurieren](/rootserver/konfiguration/ufw-konfigurieren) — nur benötigte Ports offen halten
- [Fail2ban installieren](/rootserver/konfiguration/fail2ban-installieren) — auffällige IP-Adressen automatisch sperren

## Troubleshooting

- **`Permission denied (publickey)`:** Der Schlüssel liegt nicht in `~/.ssh/authorized_keys` des richtigen Benutzers, oder die Rechte stimmen nicht: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`
- **Änderung wirkt nicht:** Ein Eintrag in `/etc/ssh/sshd_config.d/` überschreibt sie. Mit `sudo sshd -T` prüfen, was gilt.
- **Ausgesperrt:** Über die Konsole im ForgeHost Dashboard anmelden und die Konfiguration zurücksetzen.
- **Nach Portwechsel keine Verbindung:** Firewall-Freigabe fehlt, oder unter Ubuntu greift die Socket-Aktivierung.
