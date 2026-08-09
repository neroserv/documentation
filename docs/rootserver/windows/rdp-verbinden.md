# Mit Windows Server verbinden (RDP)

## Was ist RDP?

**RDP** (Remote Desktop Protocol) ist eine sichere Verbindung zu deinem Windows Server. Du siehst den Desktop, als würdest du am Server selbst sitzen.

---

## Verbindungsdaten sammeln

Bevor du dich verbindest, brauchst du:
1. **Server-IP-Adresse** (z. B. 192.0.2.1)
2. **Benutzername** (normalerweise "Administrator")
3. **Passwort** (wurde bei Server-Erstellung gesetzt)

Diese findest du in deinem Dashboard unter **https://dash.forgehost.de/vps/instances** → dein Server → Tab **Zugang**.

---

## Auf Windows verbinden

### Schritt 1: Remote Desktop öffnen

1. Drücke **Windows-Taste + R**
2. Gib ein: `mstsc`
3. Enter drücken → Remote Desktop Verbindung öffnet sich

### Schritt 2: Verbindungsdaten eingeben

1. Bei **Computer:** gib die **IP-Adresse** ein (z. B. 192.0.2.1)
2. Klicke auf **Verbinden**
3. Gib dein **Passwort** ein
4. Klicke **OK**

### Schritt 3: Zugriff akzeptieren

1. Du siehst eine Sicherheitswarnung über das Zertifikat
2. Klicke **Ja** → du akzeptierst
3. 🎉 Du bist verbunden!

---

## Auf macOS / Linux verbinden

Du brauchst einen **RDP-Client**:

**macOS:**
- Microsoft Remote Desktop (kostenlos aus App Store)
- oder Remmina

**Linux:**
```bash
sudo apt install remmina
# oder
remmina
```

Dann:
1. Client öffnen
2. IP-Adresse eingeben
3. Benutzername & Passwort
4. Verbinden

---

## Tipps für stabile Verbindung

- 🌐 **Schnelle Internet-Verbindung** nutzen (LAN besser als WLAN)
- 📍 **Von deinem Heimnetz** verbinden (keine öffentliche WLANs)
- 🔒 **VPN nutzen** (noch sicherer)
- ⏱️ **Bei Fehlern:** Kurz warten und erneut versuchen

---

## Häufige Fehler

❌ **"Verbindung konnte nicht hergestellt werden"**
- Ist die IP-Adresse korrekt?
- Ist der Server online?
- Blockiert eine Firewall den Port 3389?

❌ **"Passwort wird nicht akzeptiert"**
- Ist das richtige Passwort?
- Caps Lock aktiviert?
- Passwort mit Großbuchstaben/Zahlen?

❌ **"Verbindung langsam"**
- Server könnte überlastet sein
- Deine Internet-Verbindung ist langsam
- Zu viele Programme auf dem Client laufen

---

## Passwort zurücksetzen

Falls du das Passwort vergessen hast:

1. Gehe zu **https://dash.forgehost.de/vps/instances**
2. Öffne deinen Server → Tab **Zugang**
3. Klicke auf **Passwort ändern**
4. Setze ein **neues Passwort**
5. Speichern
6. Versuche erneut zu verbinden

---

## Sicherheits-Tipps

🔒 **Wichtig:**
- Nutze **starke Passwörter** (mind. 12 Zeichen)
- Ändere das Standard-Passwort
- Nutze nur vertrauenswürdige Netzwerke
- Verbinde über **VPN** (falls öffentliches WLAN)
- Speichere dein Passwort NICHT im RDP-Client

---

## Nächste Schritte

- 🔥 Konfiguriere **Windows Firewall**
- 🔐 Aktiviere **Windows Defender**
- 📊 Überprüfe **Ressourcen-Auslastung**
