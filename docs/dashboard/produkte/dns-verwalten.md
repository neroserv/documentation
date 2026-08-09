# DNS verwalten

## Was ist DNS?

DNS ist wie eine Telefonbuch für das Internet. Es sagt deinem Browser, wo deine Website lebt. Mit dem **DNS Manager** kannst du diese Einträge selbst ändern.

---

## DNS-Records bearbeiten

### Schritt 1: Öffne deinen DNS Manager

1. Gehe zu **https://dash.forgehost.de/domains**
2. Klicke auf deine Domain
3. Öffne den Tab **DNS Manager**
4. Hier siehst du alle DNS-Einträge

### Schritt 2: Record hinzufügen oder bearbeiten

1. Klicke auf **+ Record hinzufügen** oder bearbeite einen bestehenden
2. Wähle den **Record-Typ**:
   - **A** – Verbinde deine Domain mit einer IP-Adresse (Website)
   - **AAAA** – IPv6-Adresse
   - **CNAME** – Alias für eine andere Domain
   - **MX** – E-Mail-Server
   - **TXT** – Text-Einträge (für Verifikation, DKIM, etc.)
   - **NS** – Nameserver
3. Fülle die Felder aus:
   - **Name** – z. B. "www" oder "@" (für Root)
   - **Wert** – z. B. IP-Adresse oder Hostname
   - **TTL** – Wie lange sollen Browser den Eintrag cachen? (Standard: 3600)
4. Speichern

### Schritt 3: DNS-Zone speichern

1. Klicke auf **DNS Zone speichern** oder **Änderungen übernehmen**
2. Die Änderungen sind gespeichert ✅

---

## Beispiele für häufige DNS-Records

### Website hosten (A-Record)

```
Name: @
Typ: A
Wert: 192.0.2.1
TTL: 3600
```

### www-Subdomain (A-Record)

```
Name: www
Typ: A
Wert: 192.0.2.1
TTL: 3600
```

### E-Mail einrichten (MX-Record)

```
Name: @
Typ: MX
Wert: mail.beispiel.com
Priorität: 10
TTL: 3600
```

### Subdomain zu anderer Domain (CNAME)

```
Name: blog
Typ: CNAME
Wert: blog-plattform.com
TTL: 3600
```

---

## Wichtig: Nameserver

::: warning Bedingung
Damit deine DNS-Einträge funktionieren, müssen deine **Nameserver** auf ForgeHost zeigen.

Falls nicht: Ändere erst deine **Nameserver** (siehe nächste Seite).
:::

---

## DNS-Propagation

**Was ist Propagation?**
Wenn du einen DNS-Eintrag änderst, braucht das Internet Zeit, um die Änderung zu bemerken.

**Wie lange dauert es?**
- Normalerweise: 5 Minuten bis 2 Stunden
- Manchmal: bis zu 48 Stunden (je nach ISP und Cache-Einstellungen)

**Tipp:** Geduld haben! Deine Änderungen sind gespeichert, aber nicht sofort überall sichtbar.

---

## Häufige Fehler vermeiden

❌ **Falsch:**
- DNS-Eintrag ohne "https://" eingeben (z. B. "website.com" statt nur "192.0.2.1")
- Alte Records nicht löschen, neue dazufügen (kann zu Konflikten führen)
- TTL zu hoch setzen (braucht zu lange, um zu aktualisieren)

✅ **Richtig:**
- Nur IP-Adressen oder Hostnamen als Wert verwenden
- Alte Records löschen, bevor neue hinzufügen
- TTL 3600 (1 Stunde) ist ein guter Standard

---

## Nächste Schritte

- 📖 Ändere deine **Nameserver** (falls nötig)
- 🔒 Aktiviere **DNSSEC**
- 📧 Erstelle **E-Mail-Einträge** für deine Domain
