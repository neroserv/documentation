# KVM-Server steuern (Power-Funktionen)

## Server starten, stoppen und neustarten

Dein Server braucht eine Pause? So kontrollierst du ihn:

---

## Server-Status anschauen

1. Gehe zu **https://dash.forgehost.de/vps/instances**
2. Klicke auf deinen **KVM-Server**
3. Du siehst den aktuellen **Status**:
   - 🟢 **Online** – Server läuft
   - 🔴 **Offline** – Server ist gestoppt
   - 🟡 **Provisioning** – Server wird gerade aufgebaut

---

## Server starten

Der Server ist aus und du möchtest ihn wieder anmachen?

1. Öffne deinen Server → **https://dash.forgehost.de/vps/instances**
2. Suche den Button **START** oder **Power On**
3. Klicke darauf
4. ⏳ Der Server startet (dauert 30-60 Sekunden)
5. 🟢 Status wechselt zu "Online"

---

## Server stoppen

Du möchtest deinen Server herunterfahren (ordnungsgemäß)?

1. Öffne deinen Server
2. Suche den Button **STOP** oder **Power Off** oder **Herunterfahren**
3. Klicke darauf
4. ⏳ Der Server fährt herunter (dauert einige Sekunden)
5. 🔴 Status wechselt zu "Offline"

::: tip Warnung
**Ordnungsgemäßes Herunterfahren** ist besser als Neustart. Windows/Linux fahren sauber herunter.
:::

---

## Server neustarten (Reboot)

Der Server braucht einen Neustart (z. B. nach Sicherheits-Updates)?

1. Öffne deinen Server
2. Suche den Button **REBOOT** oder **Restart** oder **Neu starten**
3. Klicke darauf
4. ⏳ Der Server startet neu (dauert 1-2 Minuten)
5. Der Server ist kurz offline und dann wieder online

::: warning Achtung!
Beim Neustart werden **laufende Programme** unterbrochen. Sichere vorher deine Daten, wenn nötig!
:::

---

## Erzwungenes Herunterfahren

**Nur im Notfall!** Falls der Server "hängt" und nicht reagiert:

1. Suche den Button **KILL** oder **Force Off** oder **Herunterfahren erzwingen**
2. **Warnung:** Das ist wie der Strom-Stecker ziehen!
3. Der Server stoppt sofort (Datenverlust möglich!)

::: danger Vorsicht!
Erzwungenes Herunterfahren kann Daten beschädigen. Nutze es nur, wenn der Server nicht reagiert!
:::

---

## Häufige Fragen

**Kann ich den Server während des Starts stoppen?**
Ja, aber das kann zu Problemen führen. Lass den Start/Stopp normalerweise abschließen.

**Wie lange dauert ein Neustart?**
Normalerweise 1-2 Minuten. Manchmal länger, wenn Updates installiert werden.

**Was passiert mit meinen Daten beim Stoppen?**
Deine Daten bleiben gespeichert auf der Festplatte. Nur laufende Programme stoppen.

**Kann ich automatische Neustarts planen?**
Ja! Schau in den Tab **Automatische Aufgaben** oder **Zeitpläne** für regelmäßige Neustarts.

---

## Nächste Schritte

- 🔗 Konfiguriere deine **Firewall**
- 💾 Erstelle **Backups**
- 📍 Setze **rDNS** für deine IP
