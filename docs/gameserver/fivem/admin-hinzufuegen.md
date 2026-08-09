# Admin hinzufügen

Es gibt zwei gängige Wege, um dir oder anderen Spielern Admin-Rechte auf deinem FiveM-Server zu geben: über das **txAdmin-Webinterface** (empfohlen) oder manuell über **ACE-Permissions** in der `server.cfg`.

## Variante 1: Admin über txAdmin hinzufügen (empfohlen)

1. Öffne txAdmin im Browser unter `http://<deine-server-ip>:40120`.
2. Melde dich mit deinem txAdmin-Account an.
3. Navigiere im Menü zu **"Admins"**.
4. Klicke auf **"Add New Admin"**.
5. Trage einen Benutzernamen ein und wähle, ob du den Admin über eine **Discord-ID**, den **In-Game-Namen** oder direkt über den **FiveM-Identifier** verknüpfen möchtest.
6. Wähle eine Berechtigungsgruppe bzw. definiere die gewünschten Rechte (z. B. `all_permissions` für vollen Zugriff, oder einzelne Rechte wie `players.ban`, `settings.write`).
7. Speichere den Eintrag – txAdmin generiert bei Bedarf automatisch ein Passwort für den Web-Login.

::: tip Eigene Identifier herausfinden
Du findest deine eigenen Identifier (Steam, License, Discord, FiveM) im Spiel über die F8-Konsole mit dem Befehl `identifiers`, oder in txAdmin unter **"Players"**, wenn du bereits auf dem Server verbunden warst.
:::

## Variante 2: Admin manuell über server.cfg (ACE-Permissions)

Falls du ohne txAdmin arbeitest oder zusätzliche In-Game-Rechte über Ressourcen/Scripts steuern willst, kannst du Admins direkt über Access Control Entries in der `server.cfg` definieren:

```ini
# Rechte für die Gruppe "admin" definieren
add_ace group.admin command allow

# Spieler der Gruppe "admin" zuordnen (Beispiel mit Steam-Identifier)
add_principal identifier.steam:110000112345678 group.admin
```

Alternativ mit License- oder Discord-Identifier:

```ini
add_principal identifier.license:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx group.admin
add_principal identifier.discord:123456789012345678 group.admin
```

Speichere die `server.cfg` und starte den Server neu, damit die Änderungen greifen:

```bash
sh /home/FiveM/stop.sh
sh /home/FiveM/start.sh
```

::: warning Framework-eigene Admin-Systeme beachten
Nutzt du ein Framework wie ESX oder QBCore, verwalten diese Admin-Rechte häufig zusätzlich über eine eigene Datenbanktabelle (z. B. `users`-Tabelle mit `group`-Spalte). ACE-Permissions in der `server.cfg` steuern in dem Fall meist nur txAdmin- bzw. Core-Rechte, nicht zwingend die Framework-internen Berechtigungen.
:::

## Troubleshooting

- **Rechte greifen nicht:** Prüfe, ob der verwendete Identifier korrekt ist und der Spieler mit genau diesem Identifier verbunden ist (Identifier-Typen wie `steam`, `license`, `discord` können sich unterscheiden).
- **txAdmin-Login schlägt fehl:** Setze das Passwort über die txAdmin-Konsole (`sh /home/FiveM/attach.sh`) mit dem Recovery-Modus zurück, der beim ersten Start angezeigt wird.
