# rDNS erstellen & Reverse DNS

## Was ist rDNS (Reverse DNS)?

**rDNS** oder **Reverse DNS (PTR-Eintrag)** ist das Gegenteil von normalem DNS:
- **Normales DNS:** IP-Adresse → Domainname (z. B. 192.0.2.1 → example.com)
- **rDNS:** Domainname → IP-Adresse (z. B. mail.example.com für deine Server-IP)

**Warum ist rDNS wichtig?**
- 📧 E-Mail-Server prüfen rDNS, um Spam zu erkennen
- 🔍 Viele Tools zeigen den rDNS-Namen statt der IP-Adresse
- 🛡️ Ein korrekter rDNS verbessert die E-Mail-Zustellbarkeit
- 🔐 Wichtig für Mail-Server und gehostete Dienste

---

## rDNS für deinen KVM-Server setzen

### Schritt 1: Öffne deinen Server

1. Gehe zu **https://dash.forgehost.de/vps/instances**
2. Klicke auf deinen **KVM-Server**
3. Suche den Tab **rDNS** (oder **Reverse DNS**)

### Schritt 2: Hostname eingeben

1. Du siehst eine Liste mit deinen **IP-Adressen** (IPv4 und IPv6)
2. Neben jeder IP gibt es ein **Eingabefeld**
3. Gib den gewünschten **Hostname** ein, z. B.:
   - `mail.beispiel.com` (für Mail-Server)
   - `server.beispiel.com` (für allgemeinen Server)
   - `api.beispiel.com` (für API-Server)
4. Der Hostname muss eine **gültige Domain** sein, die dir gehört

![rDNS (PTR) Einstellungen im Dashboard mit Eingabefeldern für IPv4 und IPv6](/images/rdns-ptr-panel.webp)

### Schritt 3: Speichern

1. Klicke auf **rDNS speichern** oder **Änderungen speichern**
2. ✅ rDNS ist gespeichert!

Die Änderung kann bis zu **24 Stunden** dauern, um sich global durchzusetzen.

---

## Wichtige Bedingungen

::: warning Bedingung
Der Hostname, den du als rDNS setzt, muss:

1. **Eine gültige Domain sein**, die dir gehört
2. **Auf die IP-Adresse zurück zeigen** (A- oder AAAA-Record)

**Beispiel:**
```
IP-Adresse: 192.0.2.1
rDNS setzen auf: mail.beispiel.com
DNS-Eintrag muss sein: mail.beispiel.com A 192.0.2.1
```

Wenn die DNS-Auflösung nicht passt, funktioniert rDNS nicht!
:::

---

## rDNS löschen / zurücksetzen

Möchtest du das rDNS wieder entfernen?

1. Öffne **rDNS** → Tab auf deinem Server
2. Lösche den **Text** im Eingabefeld (leer lassen)
3. Klicke auf **Speichern**
4. ✅ rDNS ist gelöscht

---

## rDNS anfordern (falls nicht möglich)

**Manche Server erlauben nicht, rDNS selbst zu setzen.**

Falls im rDNS-Tab kein Eingabefeld sichtbar ist:

1. Klicke auf **rDNS anfragen** oder **Support kontaktieren**
2. Gib an:
   - Deine **IP-Adresse**
   - Der gewünschte **Hostname**
3. Das Support-Team setzt es für dich

---

## rDNS testen

Möchtest du überprüfen, ob dein rDNS funktioniert?

**Online-Tester verwenden:**
1. Besuche https://www.whatsmydns.net
2. Wähle **PTR Lookup**
3. Gib deine **IP-Adresse** ein
4. Du siehst den aktuellen rDNS-Eintrag

**Auf deinem Server testen:**

Linux/Mac:
```bash
host 192.0.2.1
# oder
dig +short -x 192.0.2.1
```

Windows:
```cmd
nslookup 192.0.2.1
```

---

## Häufige Fehler

❌ **Falsch:**
- rDNS auf eine nicht-existente Domain setzen
- rDNS ohne entsprechenden DNS-A-Record setzen
- localhost oder interne IPs verwenden
- Tippfehler im Hostnamen

✅ **Richtig:**
- rDNS auf eine gültige Domain setzen, die dir gehört
- Erst A-Record erstellen, dann rDNS setzen
- Den exakten Hostnamen verwenden
- Groß-/Kleinschreibung überprüfen

---

## Warum ist rDNS für Mail-Server wichtig?

Wenn du einen Mail-Server betreibst:

1. Setze **rDNS** auf deine Mail-Server-IP
2. Erstelle einen **SPF-Record** (TXT): `v=spf1 mx ~all`
3. Aktiviere **DKIM** und **DMARC**
4. Damit vertrauen dir die Mail-Server anderer

---

## Nächste Schritte

- 📖 Konfiguriere **Firewall**-Regeln für deinen Server
- 💾 Erstelle **Backups** für deine Daten
- 🔒 Aktiviere **SSL-Zertifikate** für HTTPS
