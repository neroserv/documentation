# Windows Firewall einstellen

## Was ist Windows Firewall?

Die **Windows Firewall** schützt deinen Server vor unerwünschtem Netzwerk-Traffic. Sie entscheidet, welche Verbindungen rein- und rausdürfen.

---

## Windows Firewall öffnen

### Methode 1: Über Start-Menü

1. Drücke **Windows-Taste**
2. Gib ein: `Firewall`
3. Klicke auf **Windows Defender Firewall**

### Methode 2: Über Systemsteuerung

1. Öffne **Systemsteuerung**
2. Gehe zu **System und Sicherheit**
3. Klicke auf **Windows Defender Firewall**

### Methode 3: PowerShell (schnell)

```powershell
wf.msc
```

---

## Firewall aktivieren / deaktivieren

::: warning Vorsicht!
**Die Firewall deaktivieren macht deinen Server anfällig für Angriffe!**

Deaktiviere sie nur, wenn du genau weißt, was du tust.
:::

1. Öffne **Windows Defender Firewall**
2. Klicke **Windows Defender Firewall aktivieren oder deaktivieren** (links)
3. Wähle:
   - 🟢 **Aktiviert** (empfohlen!)
   - 🔴 **Deaktiviert** (NICHT empfohlen!)
4. Speichern

---

## Regel hinzufügen (Port öffnen)

Du brauchst einen **bestimmten Port** offen? So geht's:

### Schritt 1: Erweiterte Einstellungen öffnen

1. Öffne **Windows Defender Firewall**
2. Klicke **Erweiterte Einstellungen** (links)

### Schritt 2: Eingangsregel erstellen

1. Klicke **Eingangsregeln** (links)
2. Klicke **Neue Regel** (rechts)
3. Wähle **Port**
4. Klicke **Weiter**

### Schritt 3: Port konfigurieren

1. Wähle **TCP** oder **UDP**
2. Gib den **Port ein** (z. B. 80, 443, 3306)
3. Klicke **Weiter**

### Schritt 4: Aktion setzen

1. Wähle **Verbindung zulassen**
2. Klicke **Weiter**

### Schritt 5: Profil wählen

1. Häkchen bei **Domäne**, **Privat**, **Öffentlich** setzen
2. Klicke **Weiter**

### Schritt 6: Name geben

1. Gib der Regel einen **Namen** (z. B. "HTTP")
2. Optionale **Beschreibung**
3. Klicke **Fertig**

✅ **Port ist offen!**

---

## Häufige Ports öffnen

| Port | Service | Protokoll |
|------|---------|-----------|
| 80 | HTTP (Website) | TCP |
| 443 | HTTPS (Website verschlüsselt) | TCP |
| 3389 | RDP (Remote Desktop) | TCP |
| 3306 | MySQL | TCP |
| 5432 | PostgreSQL | TCP |
| 25 | SMTP (E-Mail) | TCP |
| 110 | POP3 (E-Mail) | TCP |
| 143 | IMAP (E-Mail) | TCP |

---

## Ausgangsregeln (ausgehender Traffic)

Willst du kontrollieren, WAS dein Server **nach außen** sendet?

1. Klicke **Ausgangsregeln** (statt Eingangsregeln)
2. Folge den gleichen Schritten wie oben

::: warning Info
**Standardmäßig:** Ausgehender Traffic ist erlaubt. Nur einschränken, wenn nötig!
:::

---

## Regel löschen

Eine Regel brauchst du nicht mehr?

1. Öffne **Erweiterte Einstellungen**
2. Klicke **Eingangsregeln** oder **Ausgangsregeln**
3. Rechtsklick auf die Regel
4. Klicke **Löschen**

---

## Probleme beheben

❌ **"Kann Regel nicht erstellen"**
- Brauchst du **Admin-Rechte**? Starte PowerShell als Admin

❌ **"Port ist offen, aber funktioniert nicht"**
- Firewall-Regel ist korrekt? Überprüfe Regel-Einstellungen
- Läuft der Service auf dem Port? (z. B. Webserver für Port 80)
- Andere Anwendung blockiert den Port?

❌ **"RDP funktioniert nicht"**
- Ist Port **3389** offen?
- Firewall-Regel für RDP vorhanden?
- Server online und erreichbar?

---

## Mit PowerShell arbeiten (fortgeschritten)

### Port öffnen per PowerShell

```powershell
# HTTP öffnen
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol tcp -Action Allow

# HTTPS öffnen
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol tcp -Action Allow

# MySQL öffnen
New-NetFirewallRule -DisplayName "MySQL" -Direction Inbound -LocalPort 3306 -Protocol tcp -Action Allow
```

### Regel löschen per PowerShell

```powershell
Remove-NetFirewallRule -DisplayName "HTTP"
```

### Alle Regeln anzeigen

```powershell
Get-NetFirewallRule -Direction Inbound | Format-Table
```

---

## Sicherheits-Best-Practices

✅ **Wichtig:**
1. **Firewall aktiviert lassen** (immer!)
2. **Nur nötige Ports öffnen** (nicht alles!)
3. **Regelmäßig überprüfen** (welche Ports sind offen?)
4. **Starke Passwörter** (besonders für RDP)
5. **Updates einspielen** (Windows Defender aktuell halten)

---

## Nächste Schritte

- 🔒 Aktiviere **Windows Defender** (Antivirus)
- 📊 Überwache **Netzwerk-Aktivität**
- 🔐 Installiere **Windows Updates**
