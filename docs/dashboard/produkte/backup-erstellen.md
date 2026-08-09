# Backup erstellen & wiederherstellen

## Warum Backups?

Ein **Backup** ist eine Sicherheitskopie deines Servers. Falls etwas schiefgeht, kannst du den alten Stand wiederherstellen!

---

## Backup erstellen

1. Gehe zu **https://dash.forgehost.de/vps/instances**
2. Klicke auf deinen **KVM-Server**
3. Öffne den Tab **Backups**
4. Klicke auf **+ Backup erstellen**
5. ⏳ Das Backup wird erstellt (dauert Minuten bis Stunden je nach Größe)
6. ✅ Backup ist bereit!

::: tip Limit beachten
Du hast ein Limit an Backup-Slots! Alte Backups werden überschrieben, wenn das Limit voll ist.
:::

---

## Backup wiederherstellen

::: danger Warnung!
Das **überschreibt** deinen aktuellen Serverstand! Daten gehen verloren!
:::

1. Öffne den Tab **Backups**
2. Klicke auf das Backup, das du wiederherstellen möchtest
3. Klicke auf **Wiederherstellen**
4. ⏳ Der Server wird aus dem Backup wiederhergestellt (dauert lange!)
5. ✅ Fertig!

---

## Backup löschen

Du brauchst das Backup nicht mehr?

1. Öffne **Backups** Tab
2. Klicke auf **Löschen** neben dem Backup
3. ✅ Platz frei für neue Backups!

---

## Backup-Tipps

- 📅 Erstelle regelmäßig Backups (täglich oder wöchentlich)
- 🔄 Nutze **automatische Zeitpläne**, um regelmäßig zu sichern
- 🗂️ Gib deinen Backups sinnvolle Namen (z. B. "Vor Update")
- 🛡️ Teste gelegentlich eine Wiederherstellung (im Notfall!)

---

## Nächste Schritte

- 🔗 Konfiguriere deine **Firewall**
- 📍 Setze **rDNS**
