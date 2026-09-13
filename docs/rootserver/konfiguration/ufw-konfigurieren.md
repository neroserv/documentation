# UFW installieren und konfigurieren

UFW (**U**ncomplicated **F**irewall) ist eine vereinfachte Bedienoberfläche für die Linux-Firewall. Statt `iptables`-Regeln zu schreiben, gibst du lesbare Befehle ein — das Ergebnis ist dasselbe, der Weg dorthin deutlich kürzer.

Das Prinzip: Alles Eingehende wird blockiert, und du gibst gezielt frei, was erreichbar sein soll.

## Voraussetzungen

- Debian- oder Ubuntu-basierter Server
- Root-Rechte bzw. ein Benutzer mit `sudo`
- Eine bestehende [SSH-Verbindung](/rootserver/linux/ssh-verbinden)

## Installation

```bash
sudo apt update
sudo apt install -y ufw
```

## Grundregeln setzen

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Damit ist von außen zunächst nichts erreichbar, während dein Server selbst weiterhin Verbindungen aufbauen darf — für Updates zum Beispiel.

## SSH freigeben — vor dem Aktivieren

::: danger Der wichtigste Schritt
Aktivierst du UFW ohne SSH-Freigabe, wird deine laufende Verbindung beim nächsten Paket gekappt und du kommst nicht mehr auf den Server. Gib SSH **immer zuerst** frei.
:::

```bash
sudo ufw allow OpenSSH
```

Läuft SSH auf einem abweichenden Port:

```bash
sudo ufw allow 2222/tcp
```

## Firewall aktivieren

```bash
sudo ufw enable
```

Bestätige die Rückfrage mit `y`. Prüfe danach den Status:

```bash
sudo ufw status verbose
```

## Weitere Ports freigeben

```bash
# Webserver
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Über den Dienstnamen
sudo ufw allow 'Nginx Full'

# Minecraft
sudo ufw allow 25565/tcp

# Portbereich
sudo ufw allow 30120:30130/tcp

# Nur für eine bestimmte IP-Adresse
sudo ufw allow from 203.0.113.10 to any port 3306 proto tcp
```

Die letzte Variante ist besonders nützlich für Datenbanken: Der Port ist dann ausschließlich für einen bekannten Absender offen, nicht für das gesamte Internet.

Welche Dienstnamen UFW kennt, zeigt:

```bash
sudo ufw app list
```

## Regeln löschen

Regeln nummeriert anzeigen:

```bash
sudo ufw status numbered
```

Dann gezielt entfernen:

```bash
sudo ufw delete 3
```

Oder über die ursprüngliche Regel:

```bash
sudo ufw delete allow 80/tcp
```

## Regeln zuerst testen

Mit `--dry-run` siehst du, was ein Befehl bewirken würde, ohne dass er angewendet wird:

```bash
sudo ufw --dry-run allow 8080/tcp
```

## Protokollierung

```bash
sudo ufw logging on
```

Die Einträge findest du in `/var/log/ufw.log`. Für eine intensivere Aufzeichnung stehen `low`, `medium` und `high` zur Verfügung — im Dauerbetrieb wächst die Datei damit allerdings schnell.

## Firewall vorübergehend abschalten

```bash
sudo ufw disable
sudo ufw enable
```

Zum vollständigen Zurücksetzen aller Regeln:

```bash
sudo ufw reset
```

::: warning Nach dem Zurücksetzen
`ufw reset` entfernt auch die SSH-Freigabe. Setze sie sofort neu, bevor du die Firewall wieder aktivierst.
:::

## Docker und UFW

::: warning Docker umgeht UFW
Veröffentlicht ein Container einen Port mit `-p 8080:80`, schreibt Docker eigene iptables-Regeln direkt in die `DOCKER`-Kette. Diese greifen **vor** UFW — der Port ist dann öffentlich erreichbar, obwohl `ufw status` das Gegenteil nahelegt.

Binde Container deshalb gezielt auf localhost:

```bash
docker run -p 127.0.0.1:8080:80 ...
```

Oder in der `docker-compose.yml`:

```yaml
ports:
  - "127.0.0.1:8080:80"
```
:::

## Nächste Schritte

- [SSH-Zugang absichern](/rootserver/konfiguration/ssh-absichern)
- [Fail2ban installieren](/rootserver/konfiguration/fail2ban-installieren)

## Troubleshooting

- **Nach `ufw enable` keine Verbindung mehr:** Über die Konsole im ForgeHost Dashboard anmelden und `sudo ufw disable` ausführen.
- **Port ist trotz Freigabe nicht erreichbar:** Prüfe mit `sudo ss -tulpn`, ob der Dienst überhaupt lauscht — und ob er auf `127.0.0.1` statt auf `0.0.0.0` gebunden ist.
- **Port ist trotz Sperre erreichbar:** Fast immer Docker (siehe oben).
- **Regeln nach Neustart weg:** UFW ist nicht aktiviert. Mit `sudo systemctl enable ufw` nachholen.
