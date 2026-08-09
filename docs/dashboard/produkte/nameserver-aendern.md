# Nameserver ändern

## Was sind Nameserver?

Nameserver sind wie die "Verwaltungsstelle" deiner Domain. Sie sagen dem Internet, welche DNS-Einträge du für deine Domain hast.

**Zwei Szenarien:**
1. 🟢 **Du möchtest DNS hier verwalten** → Nutze unsere Nameserver
2. 🔵 **Du möchtest DNS woanders verwalten** → Ändere deine Nameserver

---

## Unsere Standard-Nameserver nutzen

Du möchtest bei uns bleiben und deine DNS-Einträge mit unserem Manager verwalten?

### Schritt 1: Öffne deine Domain

1. Gehe zu **https://dash.forgehost.de/domains**
2. Klicke auf deine Domain
3. Öffne den Tab **Übersicht** oder **Nameserver**

### Schritt 2: Auf Standard zurücksetzen

1. Suche den Button **Auf Standard zurücksetzen** oder **Standardnameserver**
2. Klicke darauf
3. ✅ Deine Nameserver zeigen jetzt auf uns!

**Unsere Standard-Nameserver sind:**
```
ns1.forgehost.de
ns2.forgehost.de
ns3.forgehost.de
```

---

## Zu anderen Nameservern wechseln

Du möchtest deine DNS-Einträge bei einem anderen Provider verwalten (z. B. Cloudflare)?

### Schritt 1: Neue Nameserver notieren

Gib deinem anderen Provider (z. B. Cloudflare) deine Domain. Sie geben dir dann neue Nameserver-Adressen.

**Beispiel:**
```
ns1.cloudflare.com
ns2.cloudflare.com
```

### Schritt 2: Nameserver ändern

1. Gehe zu **https://dash.forgehost.de/domains**
2. Klicke auf deine Domain
3. Suche den Button **Nameserver ändern**
4. Klicke darauf → es öffnet sich ein Dialog
5. Gib die **neuen Nameserver** ein (von deinem anderen Provider)
6. Speichern ✅

### Schritt 3: Warten

Die Änderung braucht Zeit:
- **Schnell:** 5 Minuten bis 2 Stunden
- **Normal:** 24 Stunden
- **Langsam:** bis zu 48 Stunden

Sei geduldig!

---

## Was passiert nach dem Wechsel?

::: warning Wichtig!
Sobald du deine Nameserver wechselst:

1. ❌ **Unser DNS Manager funktioniert nicht mehr** für deine Domain
2. ✅ **Der neue Provider verwaltet deine DNS-Einträge**
3. 🔧 **Du musst alle DNS-Einträge erneut anlegen** beim neuen Provider

Falls du etwas falsch machst, funktioniert deine Website/E-Mail nicht!
:::

---

## Zurück zu unseren Nameservern

Bereust du den Wechsel? So wechselst du zurück:

1. Gehe zu **https://dash.forgehost.de/domains**
2. Klicke auf deine Domain
3. Öffne **Nameserver ändern**
4. Klicke auf **Auf Standard zurücksetzen** oder gib unsere Nameserver ein
5. Speichern

**Unsere Standard-Nameserver:**
```
ns1.forgehost.de
ns2.forgehost.de
ns3.forgehost.de
```

---

## Häufige Fragen

**Kann ich mehrere Nameserver setzen?**
Ja! Normalerweise 2-3 Nameserver. Manche Provider erlauben auch 4+.

**Was passiert mit meinen alten DNS-Einträgen?**
Sie sind weg, wenn du zu anderen Nameservern wechselst. Du musst sie beim neuen Provider neu anlegen.

**Warum ist meine Website weg nach dem Wechsel?**
Weil der neue Provider keine DNS-Einträge hat. Du musst dort DNS-Records erstellen.

**Kann ich Nameserver und DNS-Manager kombinieren?**
Ja! Du kannst Nameserver auf einen Provider setzen und in unserem Manager DNS-Einträge anlegen (funktioniert aber nur, wenn unsere Nameserver eingestellt sind).

---

## Nächste Schritte

- 📖 **DNS verwalten** – bei uns im Manager
- 🔗 **Domain mit Webspace verbinden**
- 📧 **E-Mail einrichten** – mit MX-Records
