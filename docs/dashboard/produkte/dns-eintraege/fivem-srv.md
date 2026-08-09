# DNS für FiveM Server (SRV)

## FiveM Server über Domain erreichbar

Du möchtest, dass Spieler deinen FiveM Server über eine Domain joinen? Mit **SRV Records** funktioniert das!

---

## SRV Record erstellen

1. Gehe zu **https://dash.forgehost.de/domains**
2. Öffne deine Domain → Tab **DNS Manager**
3. Erstelle einen **SRV Record**:

```
Name: _cfx._tcp
Typ: SRV
Priorität: 10
Gewichtung: 60
Port: 30120
Ziel: server.beispiel.com
TTL: 3600
```

---

## A-Record für Server

Der Ziel-Hostname muss auch auf die Server-IP zeigen:

```
Name: server
Typ: A
Wert: 192.0.2.1 (deine Server-IP)
TTL: 3600
```

---

## Test

Spieler können sich verbinden mit:
```
connect beispiel.com:30120
```

---

## Nächste Schritte

- 🎮 Konfiguriere deine **server.cfg**
- 📊 Überwache **Server-Auslastung**
