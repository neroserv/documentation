# Resources hinzufügen

FiveM-Server werden über sogenannte **Resources** (Scripts, Maps, Frameworks) erweitert. Diese Anleitung zeigt dir, wie du eine neue Resource korrekt installierst und aktivierst.

## Voraussetzungen

- SSH- bzw. SFTP-Zugriff auf deinen Server
- Die Resource-Dateien (z. B. als `.zip`/`.tar.gz` heruntergeladen oder per `git clone`)

::: warning Nur vertrauenswürdige Quellen verwenden
Lade Resources ausschließlich von bekannten, vertrauenswürdigen Quellen (z. B. offiziellem GitHub-Repository des Entwicklers oder dem FiveM-Forum). Scripts können beliebigen Code auf deinem Server ausführen – bösartige oder "geleakte" Resources können Backdoors enthalten.
:::

## Schritt-für-Schritt

1. Verbinde dich per SSH oder SFTP mit deinem Server.
2. Wechsle in den `resources`-Ordner deiner Serverdaten, standardmäßig:

   ```
   /home/FiveM/server-data/resources/
   ```

3. Lege optional eine Kategorie-Unterordner an (z. B. `[frameworks]`, `[scripts]`, `[maps]`) – FiveM durchsucht Unterordner mit eckigen Klammern automatisch nach Resources.
4. Entpacke bzw. kopiere die Resource in den Zielordner, sodass die Ordnerstruktur z. B. so aussieht:

   ```
   resources/[scripts]/mein-script/fxmanifest.lua
   resources/[scripts]/mein-script/client.lua
   resources/[scripts]/mein-script/server.lua
   ```

5. Öffne deine `server.cfg` und aktiviere die Resource mit dem `ensure`-Befehl:

   ```ini
   ensure mein-script
   ```

6. Beachte die **Reihenfolge**: Resources, von denen andere Resources abhängen (z. B. `oxmysql`, `ox_lib`), müssen in der `server.cfg` **vor** den abhängigen Resources stehen.
7. Starte den Server neu oder lade die Resource live über die Konsole nach:

   ```bash
   sh /home/FiveM/attach.sh
   ```

   Danach in der Server-Konsole:

   ```
   refresh
   ensure mein-script
   ```

## Abhängigkeiten prüfen

Viele Resources benötigen zusätzliche Abhängigkeiten (z. B. `ox_lib`, `oxmysql`, ein bestimmtes Framework wie `es_extended` oder `qb-core`). Prüfe die Dokumentation bzw. `README` der jeweiligen Resource und installiere fehlende Abhängigkeiten zuerst nach demselben Schema.

## Troubleshooting

- **"Couldn't find resource" in der Konsole:** Der Ordnername in `resources/` muss exakt mit dem Namen im `ensure`-Befehl übereinstimmen, und es muss eine `fxmanifest.lua` (bzw. `__resource.lua` bei sehr alten Resources) vorhanden sein.
- **Fehler beim Start der Resource:** Kontrolliere die Konsolenausgabe auf fehlende Abhängigkeiten oder Syntaxfehler – häufig wird der genaue Fehlergrund direkt beim Start ausgegeben.
- **Resource lädt, funktioniert aber nicht:** Prüfe, ob alle in der `fxmanifest.lua` verlangten Konfigurationswerte (z. B. Datenbankzugang, API-Keys) korrekt gesetzt sind.
