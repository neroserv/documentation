# DNS für Webserver

## Website erreichbar machen

Du hostest deine Website auf einem Server? So verbindest du deine Domain:

---

## DNS-Einträge für Website

1. Gehe zu **https://dash.forgehost.de/domains**
2. Öffne deine Domain → Tab **DNS Manager**
3. Erstelle folgende Records:

### A-Record (IPv4)

```
Name: @
Typ: A
Wert: 192.0.2.1 (deine Server-IP)
TTL: 3600
```

### www-Subdomain (A-Record)

```
Name: www
Typ: A
Wert: 192.0.2.1 (deine Server-IP)
TTL: 3600
```

### IPv6 (optional)

```
Name: @
Typ: AAAA
Wert: 2001:db8::1 (deine IPv6)
TTL: 3600
```

---

## DNS speichern

1. Klicke auf **DNS Zone speichern**
2. ⏳ Warten auf Propagation (5 Min - 48 Std)
3. ✅ Website ist erreichbar!

---

## Test

```bash
nslookup beispiel.com
# oder
dig beispiel.com
```

---

## Nächste Schritte

- 🔒 Aktiviere **SSL-Zertifikat** (HTTPS)
- 📧 Richte **E-Mail-Einträge** ein
