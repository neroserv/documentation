# Speed Test durchführen

## Was ist Speed Test?

Ein **Speed Test** misst deine **Internet-Geschwindigkeit**:
- 📥 Download-Speed
- 📤 Upload-Speed
- ⏱️ Ping (Reaktionszeit)

---

## Mit speedtest-cli testen

**speedtest-cli** ist ein Kommando-Zeilen-Tool zur Geschwindigkeitsmessung.

### Installation

```bash
pip install speedtest-cli
```

### Speed Test durchführen

```bash
speedtest-cli
```

Die Messung dauert etwa **1-2 Minuten**.

---

## Mit spezifischem Server testen

Du kannst einen bestimmten **Server** auswählen (z. B. einen deutschen Server):

```bash
speedtest-cli --server <SERVER_ID>
```

---

## Verfügbare Deutsche Speedtest Server

| Server | Server ID |
|--------|-----------|
| CITUX GmbH | 4175 |
| Telemaxl Telekommunikation GmbH | 18613 |
| 1&1 Mobilfunk | 55133 |
| SYNLINQ | 32298 |
| StudNet Bonn | 28602 |
| LWLcom GmbH | 53256 |

**Beispiel:**
```bash
speedtest-cli --server 4175
```

---

## Weitere Speedtest Server (Europa & mehr)

| Land | Server | Server ID |
|------|--------|-----------|
| 🇦🇹 Österreich | Nessus GmbH | 3744 |
| 🇨🇭 Schweiz | Salt Mobile SA | 41691 |
| 🇳🇱 Niederlande | WorldStream B.V. | 6554 |
| 🇦🇹 Österreich | Eranium B.V. | 13764 |
| 🇫🇷 Frankreich | Moji | 62035 |
| 🇫🇷 Frankreich | Applivare | 45202 |
| 🇫🇷 Frankreich | Eurofiber France | 61486 |
| 🇫🇷 Frankreich | BOUYGUES TELECOM CUBIC | 51781 |
| 🇪🇸 Spanien | VOO | 45280 |
| 🇧🇪 Belgien | Orange Belgium | 30594 |
| 🇧🇪 Belgien | Adamant Ltd. | 5884 |
| 🇩🇪 Minecraft Network | FynnCraft Minecraft Network | 58321 |

---

## Ergebnisse speichern

Um die Ergebnisse zu speichern:

```bash
speedtest-cli --csv > speed-test.csv
```

Die Datei enthält:
- Zeitstempel
- Download/Upload Speed
- Ping
- Server ID

---

## Häufige Probleme

**Messung ist sehr langsam?**
- Dein Internet ist langsam (das ist das Ergebnis!)
- Versuche einen anderen Server

**Server reagiert nicht?**
- Server könnte überlastet sein
- Versuche einen anderen Server

**Unterschiedliche Ergebnisse?**
- Normale: Die Geschwindigkeit variiert
- Führe mehrfach durch, um einen Durchschnitt zu bekommen

---

## Tipps für bessere Messungen

1. **Keine anderen Programme** während des Tests starten
2. **LAN-Kabel** nutzen statt WLAN (schneller & zuverlässiger)
3. **Zu verschiedenen Zeiten** testen (morgens, mittags, abends)
4. **Mehrfach testen** und Durchschnitt bilden
5. **Dokumentieren** (z. B. in CSV-Datei)

---

## Weitere Tools

- `mtr` – Netzwerk-Diagnose
- `ping` – Latenz überprüfen
- `iperf` – Bandbreite zwischen zwei Servern

Alle sind über Paketmanager installierbar!
