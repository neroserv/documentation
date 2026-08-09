# Support-Freigabe & "Login als Kunde"

## Was ist "Login als Kunde"?

Manchmal brauchen unsere Mitarbeitenden Zugriff auf dein Konto, um dir besser zu helfen:
- 🔧 Fehler zu analysieren und zu beheben
- 📊 Konfigurationen zu überprüfen
- 🆘 Technische Probleme zu lösen
- 🔒 Sicherheitsprobleme zu untersuchen

Mit **"Login als Kunde"** können Mitarbeitende – mit deiner ausdrücklichen Erlaubnis – zeitweise in dein Konto wechseln, um dir schneller zu helfen.

---

## Wie funktioniert das?

### Sicherheit steht an erster Stelle

Wir nehmen deinen Schutz **sehr ernst**:

✅ **Du kontrollierst alles:**
- **Du genehmigst aktiv**, bevor ein Mitarbeiter einsteigen kann
- Du setzt eine **zeitliche Frist** (z. B. 24 Stunden)
- Du kannst die Freigabe jederzeit **widerrufen**
- Nach Ablauf der Zeit **endet der Zugriff automatisch**

✅ **Alles wird protokolliert:**
- Jeder Login wird genau **dokumentiert** (wer, wann, warum)
- **Unveränderbare Logs** verhindern Manipulationen
- Du kannst die Zugriffe später einsehen

✅ **Deine sensiblen Daten bleiben geschützt:**
- Zahlungsinformationen (Kreditkarte, IBAN) sind **nicht sichtbar**
- Persönliche E-Mails sind **maskiert**
- Rechnungsarchive sind **ausgeblendet**
- Kritische Aktionen (Passwort ändern, Vertrag abschließen) sind **blockiert**

---

## Wie gebe ich Support-Freigabe?

### Schritt 1: Im Support-Ticket anfragen

Dein Support-Mitarbeiter wird dich fragen:
> "Darf ich in dein Konto wechseln, um das Problem zu analysieren?"

### Schritt 2: Freigabe erteilen

So genehmigst du den Zugriff:

1. Gehe zu **https://dash.forgehost.de/settings/security** (oder einen ähnlichen Ort)
2. Suche nach **"Support-Zugriff erteilen"** oder **"Login als Kunde erlauben"**
3. Du siehst:
   - **Ticket-Nummer** (wofür wird der Zugriff benötigt?)
   - **Dauer** (wie lange? z. B. 24 Stunden, 7 Tage)
   - **Mitarbeiter-Name** (wer wird Zugriff haben?)
4. Klicke auf **Freigabe erteilen**
5. ✅ Der Mitarbeiter kann sich jetzt einloggen

### Schritt 3: Mitarbeiter analysiert das Problem

Der Mitarbeiter:
- Loggt sich in dein Konto ein
- Sieht, was du normal siehst (mit Einschränkungen)
- Findet und behebt das Problem
- Berichtet dir die Ergebnisse

### Schritt 4: Freigabe endet

Die Freigabe endet **automatisch** wenn:
- ⏰ Die eingestellte Zeit abläuft (z. B. nach 24 Stunden)
- ✅ Das Support-Ticket gelöst ist
- 🛑 Du die Freigabe manuell widerrufst

---

## Was kann der Mitarbeiter NICHT sehen/ändern?

### Maskierte und versteckte Daten:

❌ **Nicht sichtbar:**
- Kreditkartennummern
- Bankverbindungen (IBAN)
- Rechnungsarchive
- Persönliche Chatnachrichten
- Passwörter

❌ **Nicht möglich:**
- Passwort ändern
- E-Mail-Adresse ändern
- Neue kostenpflichtige Verträge abschließen
- Zahlungsmethoden hinzufügen/entfernen
- Produkte löschen
- Wichtige Sicherheitseinstellungen ändern

### Was der Mitarbeiter sieht:

✅ **Sichtbar:**
- Deine Produkte (Domains, Server, etc.)
- Konfigurationen und Einstellungen
- Support-Tickets und Nachrichten
- Fehlermeldungen und Logs
- Allgemeine Account-Info

---

## Freigabe widerrufen

### Ich möchte den Zugriff beenden

Egal, warum – du kannst die Freigabe **jederzeit** widerrufen:

1. Gehe zu **https://dash.forgehost.de/settings/security**
2. Suche nach **"Aktive Support-Zugriffe"** oder **"Login als Kunde Zugriffe"**
3. Klicke auf die Freigabe und wähle **Widerrufen** oder **Beenden**
4. ✅ Sofort hat der Mitarbeiter keinen Zugriff mehr

---

## Audit-Log & Transparenz

### Was wird protokolliert?

Jeder Zugriff wird dokumentiert mit:
- **Admin-Nutzer:** Welcher Mitarbeiter?
- **Kunden-ID:** Dein Account
- **Zeitstempel:** Wann wurde zugegriffen?
- **IP-Adresse:** Von wo aus?
- **Zugriffsgrund:** Welches Ticket/Problem?
- **Aktionen:** Was wurde angeschaut / überprüft?

### Wo kann ich die Logs sehen?

1. Gehe zu **https://dash.forgehost.de/settings/security**
2. Suche nach **"Zugriffs-Logs"** oder **"Support-Zugriff-Verlauf"**
3. Sieh alle vergangenen Zugriffe
4. Jeder Eintrag ist **unveränderbar** und **signiert**

---

## DSGVO & Datenschutz

Wir halten uns **streng an DSGVO** und deutsches Datenschutzrecht:

### Rechtsgrundlage:
- **Vertragserfüllung** – wir brauchen Zugriff, um dir Support zu leisten
- **Berechtigtes Interesse** – schneller Support ist für beide Seiten wichtig
- **Sicherheit** – Sicherheitsprobleme müssen schnell gelöst werden

### Deine Rechte:
- ✅ Du musst **zustimmen**, bevor Zugriff möglich ist (Opt-in)
- ✅ Du kannst die Zustimmung **jederzeit widerrufen**
- ✅ Du kannst deine **Zugriffs-Logs einsehen**
- ✅ Du hast **Auskunftsrecht** über deine Daten
- ✅ Du kannst **Datenportabilität** anfordern

---

## Häufig gestellte Fragen

### Kann der Mitarbeiter mein Passwort sehen?

**Nein!** Dein Passwort ist:
- Im System **verschlüsselt**
- Auch für Mitarbeiter **nicht sichtbar**
- Wird nur von dir für deinen eigenen Login verwendet

Der Mitarbeiter loggt sich mit speziellen Admin-Rechten ein, nicht mit deinem Passwort.

### Wie lange darf der Mitarbeiter bleiben?

Du bestimmst die **Dauer** selbst:
- 24 Stunden (Standard)
- 7 Tage
- Oder eine andere Frist, die du wählst

Danach endet der Zugriff **automatisch**.

### Kann ich sehen, was der Mitarbeiter gemacht hat?

Ja! Du siehst:
- **Was** angeschaut wurde
- **Wann** auf dein Konto zugegriffen wurde
- **Von welcher IP-Adresse**
- **Welches Ticket** der Grund war

Alle Aktionen sind im Audit-Log dokumentiert.

### Was ist, wenn ich das nicht möchte?

**Kein Problem!**
- Du **musst keine Freigabe erteilen**
- Wenn du nicht möchtest, kann der Support auch anders helfen
- Es könnte länger dauern, aber deine Privatsphäre steht an erster Stelle

Sprich mit dem Support-Mitarbeiter, wenn du Bedenken hast!

### Ist das sicher?

Ja! Wir nutzen:
- **Opt-in Freigabe** – nur mit deiner aktiven Zustimmung
- **Zeitliche Limits** – der Zugriff endet automatisch
- **Audit-Logging** – alles wird protokolliert
- **Datenmaskierung** – deine Geheimnisse bleiben geheim
- **Beschränkungen** – kritische Aktionen sind blockiert

Das ist **branchenstandard für sichere Admin-Zugriffe**.

---

## Tipps für maximale Sicherheit

1. **Kurze Fristen nutzen** – 24 Stunden statt 7 Tage
2. **Sofort widerrufen** – wenn das Problem gelöst ist
3. **Logs überprüfen** – schau dir regelmäßig an, wer zugegriffen hat
4. **Passwort ändern** – nach kritischen Problemen sicherheitshalber neu setzen
5. **Fragen stellen** – wenn etwas unklar ist, frag den Support!

---

## Noch Fragen?

- **Wie gebe ich Freigabe?** → Im Support-Ticket, wenn der Mitarbeiter darum fragt
- **Kann ich das rückgängig machen?** → Ja, jederzeit **widerrufen**
- **Ist das sicher?** → Ja, mit mehreren Sicherheitsebenen
- **Was ist mit DSGVO?** → Wir halten uns vollständig an alle Vorschriften

**Im Zweifelsfall:** Sprich mit dem Support-Team. Deine Sicherheit ist unsere Priorität! 🔒
