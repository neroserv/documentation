# Steam Web API Key hinterlegen

Damit dein FiveM-Server gültige **Steam-Identifier** für verbundene Spieler auflösen kann (z. B. für Whitelists, Bans oder Framework-Berechtigungen), musst du einen Steam Web API Key hinterlegen. Ohne diesen Key bleibt der Steam-Identifier bei manchen Spielern leer.

## Voraussetzungen

- Ein Steam-Account
- Zugriff auf die `server.cfg` deines Servers

## Schritt-für-Schritt

1. Rufe [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey) auf und melde dich mit deinem Steam-Account an.
2. Trage als **"Domain Name"** eine beliebige Domain ein (z. B. deine eigene Domain oder ersatzweise `localhost`) und bestätige mit **"Register"**.
3. Kopiere den angezeigten API-Key.
4. Öffne deine `server.cfg` und trage den Key wie folgt ein:

   ```ini
   steam_webApiKey "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   ```

5. Speichere die Datei und starte den Server neu:

   ```bash
   sh /home/FiveM/stop.sh
   sh /home/FiveM/start.sh
   ```

6. Verbinde dich testweise mit dem Server und prüfe in der Konsole bzw. über txAdmin (Spieler-Liste), ob ein `steam:`-Identifier angezeigt wird.

::: tip Geheim halten
Behandle deinen Steam Web API Key wie ein Passwort und teile ihn nicht öffentlich – über ihn lassen sich Steam-Kontoinformationen abfragen.
:::

## Troubleshooting

- **Kein Steam-Identifier trotz Key:** Manche Spieler haben ihr Steam-Profil auf "privat" gestellt – in dem Fall kann kein Steam-Identifier ermittelt werden, unabhängig vom API-Key.
- **Server startet nicht nach Eintragen des Keys:** Prüfe die `server.cfg` auf Tippfehler, insbesondere fehlende Anführungszeichen um den Key.
