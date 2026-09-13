# BungeeCord Netzwerk unter Windows einrichten

Mit einem Proxy verbindest du mehrere Minecraft-Server zu einem Netzwerk. Spieler verbinden sich mit einer einzigen Adresse und wechseln anschließend ohne Neuverbindung zwischen Lobby, Survival, Minispielen und weiteren Servern.

**BungeeCord** ist der etablierte Proxy für dieses Szenario. Er ist kein Spielserver — er reicht Verbindungen an dahinterliegende Server weiter.

::: tip Vorher lesen
Java, Portfreigabe und die Grundlagen zu Backend-Servern findest du hier: [Grundlagen](/gameserver/minecraft/windows/grundlagen)
:::

## Aufbau des Netzwerks

```
Spieler → BungeeCord (Port 25565)
              ├── Lobby     (Port 25566)
              ├── Survival  (Port 25567)
              └── Creative  (Port 25568)
```

Nur der Proxy ist von außen erreichbar. Die Backend-Server lauschen ausschließlich lokal.

## BungeeCord oder Velocity?

**Velocity** ist der modernere Proxy: schneller, sicherer in der Standardkonfiguration und aktiv weiterentwickelt. BungeeCord hat dafür die größere Auswahl an fertigen Plugins.

Für ein neues Netzwerk ist Velocity in der Regel die bessere Wahl — die Einrichtung läuft sehr ähnlich ab. Downloads: [papermc.io/downloads/velocity](https://papermc.io/downloads/velocity)

## Voraussetzungen

- Windows Server oder Windows 10/11
- Java in passender Version
- Port 25565 (TCP) für den Proxy freigegeben
- Mindestens zwei eingerichtete Backend-Server ([Paper](/gameserver/minecraft/windows/paper) empfohlen)

## BungeeCord herunterladen

Lade die aktuelle `BungeeCord.jar` von [ci.md-5.net/job/BungeeCord](https://ci.md-5.net/job/BungeeCord/lastSuccessfulBuild/artifact/bootstrap/target/BungeeCord.jar) in einen eigenen Ordner, etwa `C:\Minecraft\Proxy`.

## Startdatei anlegen

Der Proxy verarbeitet nur Verbindungen und braucht daher wenig Arbeitsspeicher:

```bat
@echo off
java -Xms512M -Xmx1G -jar BungeeCord.jar
pause
```

Starte die Datei einmal, damit die Konfiguration erzeugt wird, und beende den Proxy anschließend mit `end`.

## config.yml konfigurieren

Öffne die entstandene `config.yml`. Diese Abschnitte sind entscheidend:

```yaml
listeners:
  - host: 0.0.0.0:25565
    motd: '&aMein Netzwerk'
    max_players: 100
    priorities:
      - lobby

servers:
  lobby:
    address: 127.0.0.1:25566
    motd: 'Lobby'
    restricted: false
  survival:
    address: 127.0.0.1:25567
    motd: 'Survival'
    restricted: false

ip_forward: true
online_mode: true
```

- `priorities` legt fest, auf welchem Server Spieler landen
- `ip_forward: true` reicht die echte IP-Adresse an die Backend-Server weiter — ohne das sehen alle Plugins nur `127.0.0.1`
- `online_mode: true` gehört auf den **Proxy**, nicht auf die Backend-Server

## Backend-Server anpassen

Auf **jedem** Server hinter dem Proxy passt du die `server.properties` an:

```properties
server-port=25566
online-mode=false
```

Zusätzlich in der `spigot.yml` des jeweiligen Servers:

```yaml
settings:
  bungeecord: true
```

Bei Paper aktivierst du stattdessen in `config/paper-global.yml`:

```yaml
proxies:
  bungee-cord:
    online-mode: true
```

::: danger Backend-Server unbedingt absichern
Mit `online-mode=false` akzeptiert ein Server jeden Benutzernamen ohne Prüfung. Ist ein solcher Server direkt aus dem Internet erreichbar, kann sich jeder als Administrator ausgeben.

Zwei Maßnahmen sind Pflicht:
1. Die Backend-Ports in der Firewall **nicht** freigeben — nur Port 25565 des Proxys
2. In der `server.properties` auf `server-ip=127.0.0.1` binden, damit nur lokale Verbindungen angenommen werden
:::

## Netzwerk starten

Die Reihenfolge ist wichtig:

1. Alle Backend-Server starten und abwarten, bis `Done!` erscheint
2. Danach den Proxy starten

Verbinde dich anschließend mit `IP-Adresse:25565`. Du landest auf dem Server, der unter `priorities` an erster Stelle steht.

## Nützliche Plugins

Proxy-Plugins gehören in den Ordner `plugins` des **Proxys**, nicht der Backend-Server:

| Plugin | Zweck |
| --- | --- |
| BungeeGuard | Verhindert direkte Verbindungen zu Backend-Servern |
| LuckPerms (Bungee) | Netzwerkweite Rechteverwaltung |
| CMI / Hub-Plugins | Serverwechsel per Befehl oder Kompass |

::: tip BungeeGuard einsetzen
BungeeGuard ergänzt einen geheimen Schlüssel, den Backend-Server prüfen. Selbst wenn ein Port versehentlich offen steht, kommt niemand direkt durch.
:::

## Troubleshooting

- **`Unable to connect to Lobby`:** Backend-Server läuft nicht oder der Port in der `config.yml` stimmt nicht.
- **Spieler werden beim Wechsel getrennt:** `bungeecord: true` bzw. die Paper-Proxy-Einstellung fehlt auf dem Backend-Server.
- **Plugins sehen nur `127.0.0.1`:** `ip_forward: true` im Proxy setzen und Backend-Server neu starten.
- **`mismatched proxy`-Meldung:** Proxy und Backend erwarten unterschiedliche Weiterleitungsverfahren — bei Velocity `modern` auf beiden Seiten konfigurieren.
- **Jeder kann sich als Admin einloggen:** Backend-Port ist öffentlich erreichbar. Sofort Firewall prüfen und BungeeGuard einrichten.
