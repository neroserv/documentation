# DNS für TeamSpeak Server

## TeamSpeak über Domain verbinden

Mit **SRV Records** können sich Spieler über deine Domain connecten.

```
Name: _ts3._tcp
Typ: SRV
Priorität: 10
Gewichtung: 60
Port: 9987
Ziel: ts.beispiel.com
TTL: 3600
```

**A-Record:**
```
Name: ts
Typ: A
Wert: 192.0.2.1
TTL: 3600
```

Connect: `beispiel.com:9987`
