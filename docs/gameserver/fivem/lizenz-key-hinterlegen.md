# FiveM Lizenz Key hinterlegen

Jeder öffentlich erreichbare FiveM-Server benötigt einen **Lizenz-Key** (`sv_licenseKey`), der über das offizielle [Cfx.re Portal](https://portal.cfx.re/) generiert wird. Ohne gültigen Lizenz-Key startet dein Server entweder gar nicht oder wird nicht im Server-Browser gelistet.

## Voraussetzungen

- Ein Cfx.re-Account (Anmeldung erfolgt über deinen Steam- oder Discord-Account)
- Zugriff auf die `server.cfg` deines Servers (Standardpfad: `/home/FiveM/server-data/server.cfg` bzw. `/home/FiveM/server.cfg`, abhängig von deiner Installation)

## Schritt-für-Schritt

1. Rufe [https://portal.cfx.re/](https://portal.cfx.re/) auf und melde dich mit deinem Cfx.re-Account an.
2. Klicke auf **"New Server"** bzw. **"Register new server"**.
3. Vergib einen Namen für deine Server-Registrierung (dieser dient nur der eigenen Übersicht im Portal).
4. Kopiere den generierten Key – er beginnt in der Regel mit `cfxk_`.
5. Öffne deine `server.cfg` und trage den Key wie folgt ein (idealerweise ganz oben, vor den `sv_hostname`- und Endpoint-Einstellungen):

   ```ini
   sv_licenseKey "cfxk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   ```

6. Speichere die Datei und starte den Server neu:

   ```bash
   sh /home/FiveM/stop.sh
   sh /home/FiveM/start.sh
   ```

7. Kontrolliere die Server-Konsole (`sh /home/FiveM/attach.sh`) auf Fehlermeldungen bezüglich des Lizenz-Keys.

::: warning Ein Key pro Server
Verwende pro physischem Server-Prozess immer nur einen eigenen Lizenz-Key. Wird derselbe Key gleichzeitig auf mehreren Servern verwendet, kann Cfx.re die betroffenen Server sperren.
:::

## Troubleshooting

- **"Invalid license key" in der Konsole:** Prüfe, ob der Key vollständig und ohne zusätzliche Leerzeichen kopiert wurde.
- **Server erscheint nicht in der Serverliste:** Stelle sicher, dass Port 30120 (TCP & UDP) korrekt freigegeben ist und der Lizenz-Key aktiv im Cfx.re Portal hinterlegt ist.
