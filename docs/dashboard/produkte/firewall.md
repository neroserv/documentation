# Firewall verwalten

## Was ist eine Firewall?

Eine **Firewall** ist ein Schutzwall um deinen Server. Sie entscheidet, welchen Netzwerk-Traffic rein- und rauskommt.

**Beispiele:**
- Port 80 (HTTP) – Website sichtbar ✅
- Port 443 (HTTPS) – Website verschlüsselt ✅
- Port 22 (SSH) – Terminal-Zugang ✅
- Port 3306 (MySQL) – Nur interne Nutzung ✅

---

## Firewall öffnen

1. Gehe zu **https://dash.forgehost.de/vps/instances**
2. Klicke auf deinen **KVM-Server**
3. Öffne den Tab **Firewall**
4. Hier siehst du alle Regeln

::: tip Info
Falls **Firewall nicht sichtbar** ist: Sie ist noch nicht aktiviert. Kontaktiere den Support!
:::

---

## Neue Regel hinzufügen

Du möchtest einen Port öffnen?

1. Klicke auf **+ Regel hinzufügen**
2. Wähle die Einstellungen:
   - **Richtung:** Eingehend (Inbound) oder Ausgehend (Outbound)
   - **Protokoll:** TCP, UDP oder beides
   - **Port:** z. B. 80, 443, 3306
   - **Quelle/Ziel:** 0.0.0.0/0 (alle) oder spezifische IP
   - **Aktion:** Erlauben oder Blockieren
3. Speichern ✅

---

## Häufige Port-Regeln

| Port | Service | Protokoll |
|------|---------|-----------|
| 22 | SSH | TCP |
| 80 | HTTP | TCP |
| 443 | HTTPS | TCP |
| 3306 | MySQL | TCP |
| 5432 | PostgreSQL | TCP |
| 6379 | Redis | TCP |

---

## Regel bearbeiten oder löschen

1. Klicke auf die Regel
2. Wähle **Bearbeiten** oder **Löschen**
3. Speichern

::: warning Vorsicht!
Falsche Firewall-Regeln können dich aussperren! Sei sorgfältig bei SSH (Port 22)!
:::

---

## Nächste Schritte

- 💾 Erstelle **Backups**
- 📍 Setze **rDNS**
