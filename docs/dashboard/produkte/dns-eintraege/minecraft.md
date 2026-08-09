# DNS für Minecraft Server

## Minecraft Server über Domain verbinden

Spieler sollen sich mit deiner Domain connecten können? Mit **SRV Records** funktioniert das!

---

## SRV Record erstellen

1. Gehe zu **https://dash.forgehost.de/domains**
2. Öffne deine Domain → Tab **DNS Manager**
3. Erstelle einen **SRV Record**:

```
Name: _minecraft._tcp
Typ: SRV
Priorität: 0
Gewichtung: 5
Port: 25565
Ziel: mc.beispiel.com
TTL: 3600
```

---

## A-Record für Server

Der Ziel-Hostname muss auf die Server-IP zeigen:

```
Name: mc
Typ: A
Wert: 192.0.2.1 (deine Server-IP)
TTL: 3600
```

---

## Test

Spieler können sich verbinden mit:
```
Server: beispiel.com
```

---

## Nächste Schritte

- 🎮 Konfiguriere **server.properties**
- 📊 Starte deinen **Minecraft Server**
