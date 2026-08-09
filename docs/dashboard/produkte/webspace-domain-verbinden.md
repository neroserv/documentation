# Domain mit Webspace verbinden

## Website online bringen

Du hast Webspace und eine Domain? Verbinde sie!

---

## Domain verbinden

1. Gehe zu **https://dash.forgehost.de/webspace-accounts**
2. Klicke auf deinen **Webspace**
3. Suche den Button **Domain verbinden** oder **Domain hinzufügen**
4. Wähle deine **Domain** aus der Liste
5. Speichern ✅

---

## DNS-Records überprüfen

Nach der Verbindung:

1. Gehe zu **https://dash.forgehost.de/domains**
2. Klicke auf deine **Domain**
3. Öffne den Tab **DNS Manager**
4. Überprüfe, dass folgende Records existieren:
   - A-Record (zeigt auf Webspace-IP)
   - CNAME für www (falls nötig)
5. Falls nicht vorhanden: Manuelle Records erstellen

---

## Website testen

1. Öffne deinen Browser
2. Gib deine **Domain** ein (z. B. beispiel.com)
3. 🎉 Website ist erreichbar!

---

## Probleme?

- Website zeigt alte Seite? → Browser-Cache löschen
- Fehler 404? → Dateien ins richtige Verzeichnis uploaden (oft: /public_html)
- DNS funktioniert nicht? → Bis zu 48 Stunden warten

---

## Nächste Schritte

- 📧 Erstelle **E-Mail-Adressen**
- 🔒 Aktiviere **SSL-Zertifikat** (HTTPS)
