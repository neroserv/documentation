# Docker installieren

Docker ermöglicht es, Anwendungen in isolierten Containern zu betreiben. Diese Anleitung nutzt das offizielle Docker install script für eine schnelle und einfache Installation auf Debian/Ubuntu.

## Voraussetzungen

- Root-Zugriff (bzw. `sudo`-Rechte) auf einem Debian- oder Ubuntu-Server
- Internetzugang auf dem Server
- `curl` installiert

## Docker mit dem offiziellen Install Script installieren

Das [offizielle Docker install script](https://github.com/docker/docker-install) automatisiert die gesamte Installation:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Das Script kümmert sich um:
- Entfernen alter Docker-Versionen
- Hinzufügen der Docker-Repository
- Installation von Docker Engine, Docker Compose und allen Dependencies
- Automatische Erkennung deiner Linux-Distribution

::: tip Alternative Distributionen
Das Script funktioniert auf Debian, Ubuntu, Fedora, CentOS und vielen anderen Linux-Distributionen automatisch.
:::

## Installation testen

Nach erfolgreicher Installation teste Docker:

```bash
sudo docker run hello-world
```

Überprüfe die Docker Compose-Version:

```bash
docker compose version
```

## Docker ohne sudo nutzen (optional)

Um `docker`-Befehle ohne `sudo` auszuführen, füge deinen Benutzer der `docker`-Gruppe hinzu:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

::: warning Sicherheitshinweis
Mitglieder der `docker`-Gruppe haben faktisch root-Rechte auf dem Host-System, da sie beliebige Container mit vollem Zugriff starten können. Vergib diese Rechte nur an vertrauenswürdige Benutzer.
:::

## Troubleshooting

- **"Cannot connect to the Docker daemon":** Prüfe, ob der Dienst läuft: `sudo systemctl status docker`
- **"permission denied":** Verwende `sudo` oder füge deinen Benutzer zur `docker`-Gruppe hinzu (siehe oben)
- **Kein Internetzugriff aus Containern:** Prüfe, ob eine Firewall den Docker-Netzwerkbrücken-Traffic blockiert
