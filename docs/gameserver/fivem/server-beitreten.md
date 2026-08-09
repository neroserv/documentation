# Server beitreten

Diese Anleitung zeigt dir als Spieler, wie du einem FiveM-Server beitrittst – entweder über die Serverliste, einen Invite-Link oder per Direktverbindung.

## Voraussetzungen

- Installierter [FiveM-Client](https://fivem.net/) (kostenlose Zusatzsoftware zu GTA V)
- Eine gültige Kopie von GTA V (Steam, Epic Games oder Rockstar Games Launcher)
- Die IP-Adresse und der Port deines Servers (Standard-Port: `30120`) oder ein Invite-Link

## Variante 1: Über die Serverliste

1. Starte den FiveM-Client.
2. Wechsle im Hauptmenü zum Tab **"Server"**.
3. Suche über das Suchfeld nach dem Namen deines Servers, oder filtere z. B. nach Tags/Sprache.
4. Klicke auf den gewünschten Server und anschließend auf **"Connect"** bzw. **"Verbinden"**.

::: tip Server als Favorit speichern
Über das Stern-Symbol neben dem Servereintrag kannst du deinen Server als Favorit markieren, um ihn beim nächsten Mal schneller wiederzufinden.
:::

## Variante 2: Direktverbindung per IP

Falls dein Server nicht in der öffentlichen Liste erscheint (z. B. bei privaten oder Whitelist-Servern) oder du ihn direkt ansteuern möchtest:

1. Öffne den FiveM-Client.
2. Drücke im Hauptmenü auf **"Direct Connect"** (Direktverbindung).
3. Gib die Serveradresse im Format `IP:Port` ein, zum Beispiel:

   ```
   123.123.123.123:30120
   ```

4. Klicke auf **"Connect"**.

Alternativ kannst du bereits **im Spiel** über die F8-Entwicklerkonsole verbinden:

```
connect 123.123.123.123:30120
```

## Variante 3: Über einen Invite-Link (cfx.re/join)

Sobald dein Server erfolgreich mit einem gültigen [Lizenz-Key](./lizenz-key-hinterlegen) registriert ist, generiert Cfx.re automatisch einen Kurzlink im Format `https://cfx.re/join/<server-id>`. Diesen Link findest du z. B. im txAdmin-Dashboard unter den Server-Informationen.

1. Öffne den Link im Browser oder klicke direkt darauf (z. B. aus Discord).
2. Der FiveM-Client öffnet sich automatisch und verbindet dich mit dem Server.

## Troubleshooting

- **"Server nicht erreichbar" / Timeout:** Prüfe, ob Port 30120 (TCP & UDP) auf dem Server freigegeben ist und der Server läuft.
- **"Kicked: Whitelist"**: Der Server hat eine Whitelist aktiviert – wende dich an einen Admin, um freigeschaltet zu werden (siehe [Admin hinzufügen](./admin-hinzufuegen)).
- **Verbindung bricht nach dem Laden ab:** Häufig verursacht durch fehlerhafte Resources auf dem Server oder veraltete FiveM-Client-Version – aktualisiere den Client über den integrierten Updater.
