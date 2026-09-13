# Mailcow Mailserver installieren

Mailcow ist ein vollständiger Mailserver-Stack, der als Sammlung von Docker-Containern ausgeliefert wird: Postfix, Dovecot, Rspamd, SOGo-Webmail und eine deutschsprachige Weboberfläche zur Verwaltung. Statt jeden Dienst einzeln zu konfigurieren, bekommst du ein fertig verzahntes Paket, das du über eine Konfigurationsdatei steuerst.

Diese Anleitung führt dich von einem leeren KVM-Server bis zum ersten versendeten E-Mail: Voraussetzungen prüfen, DNS-Einträge setzen, Docker und Mailcow installieren, absichern, Domain und Postfächer anlegen.

::: danger Vorab: Backup erstellen
Ein Mailserver verwaltet Daten, die sich nicht wiederherstellen lassen, wenn etwas schiefgeht. Lege **vor der Installation** einen Snapshot bzw. ein Backup deines Servers an — und halte danach regelmäßige Sicherungen vor, besonders vor jedem Update.

So erstellst du ein Backup deines KVM-Servers: [Backup erstellen](/dashboard/produkte/backup-erstellen)
:::

::: tip Video-Empfehlung
Ein ausführliches Video zum Thema hat **jusec** veröffentlicht. Dort werden alle Schritte live durchgegangen — inklusive typischer Stolperfallen. Vielen Dank an jusec für das wirklich gute und verständliche Video!

<div style="position:relative;padding-top:56.25%;margin:1rem 0;border-radius:8px;overflow:hidden;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/Oi4VOW_g0rM"
    title="Mailcow Mailserver installieren – Video von jusec"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    loading="lazy"
  ></iframe>
</div>

Direkt auf YouTube ansehen: [youtu.be/Oi4VOW_g0rM](https://www.youtube.com/watch?v=Oi4VOW_g0rM)
:::

---

## Systemvoraussetzungen

Mailcow startet rund 20 Container gleichzeitig. Entsprechend solltest du beim Server nicht zu knapp kalkulieren — insbesondere der Arbeitsspeicher ist der begrenzende Faktor, weil Rspamd und ClamAV ihre Signaturen im RAM halten.

| Ressource | Mindestanforderung | Empfehlung für den produktiven Betrieb |
| --- | --- | --- |
| CPU | 1 GHz, 1 Kern | 2–4 Kerne |
| RAM | 6 GB + 1 GB Swap | 8 GB oder mehr |
| Speicher | 20 GB (ohne Maildaten) | 40 GB+, je nach Mailvolumen |
| Architektur | x86_64 oder ARM64 | x86_64 |
| Virtualisierung | KVM oder Bare Metal | KVM |

::: warning Keine Container-Virtualisierung
Mailcow lässt sich **nicht** in OpenVZ, LXC oder Virtuozzo betreiben, weil dort der benötigte Kernel-Zugriff für Docker fehlt. Du brauchst einen vollvirtualisierten Server (KVM) oder Hardware.
:::

### Software

- Debian 12 / Ubuntu 22.04 oder neuer (frisch installiert, ohne Panel wie Plesk oder cPanel)
- Docker Engine 24.0 oder neuer mit Docker Compose v2
- Kein zweiter Mailserver auf dem System — ein vorinstalliertes Postfix, Exim oder Sendmail muss vorher entfernt werden
- Die Ports 80 und 443 dürfen nicht bereits von einem Webserver belegt sein

### Benötigte Ports

Diese Ports müssen in der Firewall erreichbar sein:

| Port | Protokoll | Zweck |
| --- | --- | --- |
| 25 | SMTP | Mailempfang und -versand zwischen Servern |
| 465 | SMTPS | Mailversand durch Clients (implizites TLS) |
| 587 | Submission | Mailversand durch Clients (STARTTLS) |
| 143 / 993 | IMAP / IMAPS | Postfachzugriff |
| 110 / 995 | POP3 / POP3S | Postfachzugriff (optional) |
| 4190 | ManageSieve | Serverseitige Filterregeln |
| 80 / 443 | HTTP / HTTPS | Weboberfläche und Let's-Encrypt-Zertifikate |

::: tip Port 25 ausgehend
Ohne einen offenen ausgehenden Port 25 kann ein Mailserver keine E-Mails zustellen. Viele Anbieter sperren ihn deshalb standardmäßig — **bei ForgeHost ist er offen**, du musst also nichts freischalten lassen und kannst direkt loslegen.
:::

---

## Server und Domain vorbereiten

Für das Setup brauchst du zwei Dinge: einen durchgehend erreichbaren Server mit fester IP-Adresse und eine eigene Domain.

Bei **ForgeHost** deckst du beides ab. Für Mailcow eignet sich ein KVM-Server mit mindestens 8 GB RAM. Die passende Domain bestellst du direkt im selben Dashboard, damit DNS-Verwaltung und Server an einer Stelle liegen.

- [Domain kaufen](/dashboard/produkte/domain-kaufen)
- [DNS-Einträge verwalten](/dashboard/produkte/dns-verwalten)

Wir gehen im Folgenden davon aus, dass dein Mailserver unter `mail.example.com` erreichbar sein soll. Ersetze das überall durch deine eigene Domain.

---

## DNS-Einträge setzen

Kaum ein Thema entscheidet so stark über die Zustellbarkeit wie sauberes DNS. Nimm dir die Einträge einzeln vor.

### Reverse DNS (PTR)

Empfangende Mailserver prüfen, ob sich die IP-Adresse deines Servers zu einem Hostnamen auflösen lässt — und ob dieser Hostname zur IP zurückführt. Fehlt der PTR-Eintrag, landen deine Mails mit hoher Wahrscheinlichkeit im Spam oder werden direkt abgelehnt.

Setze den PTR sowohl für IPv4 als auch für IPv6 auf `mail.example.com`.

::: tip rDNS im ForgeHost Dashboard
Wie du den PTR-Eintrag für deinen KVM-Server setzt, ist hier Schritt für Schritt beschrieben: [rDNS erstellen](/dashboard/produkte/rdns-erstellen)
:::

### Grundlegende Einträge

Diese Einträge legst du dort an, wo deine Domain verwaltet wird:

| Name | Typ | Wert |
| --- | --- | --- |
| `mail` | A | IPv4-Adresse deines Servers |
| `mail` | AAAA | IPv6-Adresse deines Servers |
| `autodiscover` | CNAME | `mail.example.com` |
| `autoconfig` | CNAME | `mail.example.com` |
| `@` | MX (Priorität 10) | `mail.example.com` |

Die beiden CNAME-Einträge sind bequem, aber kein Selbstzweck: Outlook und Thunderbird fragen genau diese Hostnamen ab, um Postfächer automatisch einzurichten. Deine Nutzer müssen dann nur noch Adresse und Passwort eingeben.

### SPF, DKIM und DMARC

Ohne diese drei Einträge kann jeder beliebige Server behaupten, in deinem Namen zu schreiben. Sie gehören zum Pflichtprogramm.

**SPF** legt fest, welche Server überhaupt E-Mails für deine Domain verschicken dürfen. Der Empfänger vergleicht die absendende IP mit deiner Liste und erkennt Fälschungen.

**DKIM** hängt jeder ausgehenden Mail eine kryptografische Signatur an. Der Empfänger holt sich den öffentlichen Schlüssel aus deinem DNS und kann so prüfen, ob die Nachricht unterwegs verändert wurde.

**DMARC** verknüpft beides und beantwortet die entscheidende Frage: Was soll passieren, wenn SPF oder DKIM fehlschlagen? Zusätzlich bekommst du Berichte darüber, wer in deinem Namen versendet.

| Name | Typ | Wert |
| --- | --- | --- |
| `@` | TXT | `v=spf1 mx a -all` |
| `dkim._domainkey` | TXT | wird später in Mailcow erzeugt |
| `_dmarc` | TXT | `v=DMARC1; p=reject; rua=mailto:report@example.com` |

::: tip Sanft einsteigen
`p=reject` ist die strengste DMARC-Richtlinie. Wenn du dir bei deiner Konfiguration noch unsicher bist, starte mit `p=quarantine` oder `p=none`, wertet die Reports ein paar Tage aus und ziehe die Richtlinie danach an.
:::

Der DKIM-Eintrag bleibt zunächst leer — den Schlüssel generiert Mailcow erst, wenn wir die Domain in der Oberfläche angelegt haben.

---

## Docker installieren

Mailcow läuft vollständig in Containern, also brauchen wir zuerst Docker mitsamt Compose-Plugin. Das offizielle Installationsskript erledigt das auf Debian und Ubuntu in einem Rutsch:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Anschließend prüfst du, ob Compose v2 verfügbar ist:

```bash
docker compose version
```

::: tip Ausführliche Anleitung
Mehr Details, Alternativen und Troubleshooting zu Docker findest du unter [Docker installieren](/rootserver/anwendungen/docker-installieren).
:::

## Systempakete nachinstallieren

Die Setup-Skripte von Mailcow greifen auf ein paar Standardwerkzeuge zurück. Die installierst du vorab, damit `generate_config.sh` später nicht abbricht:

```bash
sudo apt update
sudo apt install -y git curl openssl gawk coreutils grep jq nano
```

---

## Mailcow installieren

### Repository klonen

Wechsle auf den Root-Benutzer und hole dir das Projekt nach `/opt`. Die `umask 0022` ist dabei nicht optional — mit abweichenden Dateirechten starten einige Container später nicht sauber.

```bash
sudo su
umask 0022
cd /opt
git clone https://github.com/mailcow/mailcow-dockerized
cd mailcow-dockerized
```

### Konfiguration erzeugen

Jetzt erzeugst du die zentrale Konfigurationsdatei:

```bash
./generate_config.sh
```

Das Skript stellt dir einige Fragen. Die wichtigste ist gleich die erste: der **FQDN deines Mailservers**. Trage hier `mail.example.com` ein — exakt den Hostnamen, den du im A-Record und im PTR hinterlegt hast. Danach wählst du noch Zeitzone und Branch (`master` für den stabilen Zweig).

![Mailcow generate_config.sh – Abfrage des Hostnamens und der Zeitzone](/images/mailcow/generate-config.webp)

Als Ergebnis liegt die Datei `mailcow.conf` im Verzeichnis. Für ein Standard-Setup passt sie so, wie sie ist. Anpassungen nimmst du bei Bedarf hier vor:

```bash
nano mailcow.conf
```

::: tip Häufige Anpassung
Wenn auf dem Server bereits ein Reverse Proxy auf Port 80/443 läuft, änderst du in der `mailcow.conf` die Werte `HTTP_PORT` und `HTTPS_PORT` und bindest Mailcow über den Proxy ein.
:::

### Container starten

Zuerst lädst du alle Images herunter, danach startest du den Stack im Hintergrund:

```bash
docker compose pull
docker compose up -d
```

Der erste Start dauert je nach Anbindung ein paar Minuten. Mailcow holt dabei auch das Let's-Encrypt-Zertifikat für deinen Hostnamen — dafür müssen Port 80 und der A-Record korrekt sein.

Den Status der Container prüfst du mit:

```bash
docker compose ps
```

---

## Erster Login

Sobald alle Container laufen, erreichst du die Oberfläche unter `https://mail.example.com`. Die Administration liegt unter dem Pfad `/admin`.

Melde dich mit den Standardzugangsdaten an:

- Benutzername: `admin`
- Passwort: `moohoo`

![Login-Maske der Mailcow-Weboberfläche](/images/mailcow/mailcow-erster-login.webp)

::: danger Sofort ändern
Diese Zugangsdaten sind öffentlich bekannt und identisch bei jeder Mailcow-Installation. Ändere das Passwort, bevor du irgendetwas anderes tust.
:::

---

## Absicherung

### Admin-Passwort ändern

Öffne oben rechts **System → Konfiguration** und klicke beim Benutzer `admin` auf **Bearbeiten**.

![Benutzerübersicht in der Mailcow-Konfiguration mit der Schaltfläche Bearbeiten](/images/mailcow/admin-bearbeiten.webp)

Vergib nun ein langes, zufälliges Passwort und speichere die Änderung.

![Formular zum Setzen eines neuen Admin-Passworts](/images/mailcow/neues-passwort.webp)

### Zwei-Faktor-Authentifizierung aktivieren

Ein Mailserver-Admin-Zugang ist ein lohnendes Ziel — ein zweiter Faktor sollte daher gesetzt sein. Du findest die Einstellung ebenfalls unter **System → Konfiguration** im Reiter **Zwei-Faktor-Authentifizierung**.

![Auswahl der 2FA-Methoden in Mailcow](/images/mailcow/2fa.webp)

Mailcow unterstützt WebAuthn/FIDO2-Sticks sowie klassische TOTP-Apps wie Aegis, 2FAS oder den Google Authenticator.

::: warning Backup-Codes
Notiere dir die Wiederherstellungscodes an einem sicheren Ort. Ohne zweiten Faktor und ohne Codes kommst du nur noch über die Kommandozeile an deine Instanz.
:::

---

## E-Mail-Domain anlegen

Jetzt bringen wir Mailcow bei, für welche Domain es zuständig ist. Navigiere zu **E-Mail → Konfiguration** und klicke auf **Domain hinzufügen**.

![Domainübersicht in Mailcow mit der Schaltfläche Domain hinzufügen](/images/mailcow/domain-hinzufuegen.webp)

Im Dialog trägst du oben deine Domain ein. Die weiteren Felder — maximale Postfachgröße, Anzahl der Aliase, Mailbox-Limit — kannst du bei den Standardwerten belassen und später jederzeit anpassen.

![Dialog zum Anlegen einer neuen E-Mail-Domain](/images/mailcow/domain-hinzufuegen2.webp)

::: tip Richtig speichern
Wähle zum Abschluss **Domain hinzufügen und SOGo neustarten**. Ohne den Neustart kennt das Webmail die neue Domain noch nicht.
:::

---

## DKIM-Schlüssel eintragen

Beim Anlegen der Domain hat Mailcow im Hintergrund ein DKIM-Schlüsselpaar erzeugt. Den öffentlichen Teil davon brauchen wir jetzt für den noch fehlenden DNS-Eintrag.

Klicke in der Domainübersicht auf **DNS**. Mailcow prüft daraufhin sämtliche Einträge deiner Domain und zeigt an, was bereits korrekt gesetzt ist und was noch fehlt. Optionale Empfehlungen sind gesondert markiert.

![DNS-Prüfung in Mailcow mit Soll- und Ist-Werten je Eintrag](/images/mailcow/mailcow-dns.webp)

Ganz unten findest du den DKIM-Eintrag. Kopiere Name und Wert unverändert in die DNS-Verwaltung deiner Domain.

![DKIM-Eintrag in der DNS-Verwaltung](/images/mailcow/dkim.webp)

::: tip Geduld bei der Prüfung
Nach dem Speichern kann es bis zu 24 Stunden dauern, bis der Eintrag überall bekannt ist. Lade die DNS-Seite in Mailcow später erneut — alle Zeilen sollten dann grün sein.
:::

---

## Postfach erstellen

Die Domain steht, jetzt kommt das erste Postfach. Wechsle auf den Reiter **Mailboxen** und klicke auf **Mailbox hinzufügen**.

![Mailbox-Übersicht mit der Schaltfläche Mailbox hinzufügen](/images/mailcow/mailbox-hinzufuegen.webp)

Im Formular ist vor allem das Feld **Benutzername** entscheidend: Es bildet den Teil vor dem `@` deiner künftigen Adresse. Vor- und Nachname erscheinen später beim Empfänger als Anzeigename. Vergib ein sicheres Passwort und lege bei Bedarf ein Speicherlimit fest.

![Formular zum Anlegen eines neuen Postfachs](/images/mailcow/postfach-erstellen.webp)

Mit **Hinzufügen** ist das Postfach sofort einsatzbereit.

---

## Postfach nutzen

### Über die Weboberfläche

Rufe `https://mail.example.com` auf und melde dich mit der vollständigen E-Mail-Adresse und dem Postfach-Passwort an. Du landest im Benutzerbereich unter `/user` und wirst von dort ins SOGo-Webmail weitergeleitet.

Über das Werkzeug-Symbol oben rechts kommst du jederzeit zurück in die Mailcow-Einstellungen deines Benutzers — dort lässt sich auch für einzelne Postfächer ein zweiter Faktor hinterlegen.

::: tip Admin-Login ist nicht Postfach-Login
Als Admin kannst du dich über die Mailbox-Liste in den Kontext eines Benutzers einloggen. Das zeigt dir dessen Einstellungen, gibt dir aber bewusst keinen Zugriff auf die Mails selbst.
:::

### In Mail-Clients und auf dem Smartphone

Die Zugangsdaten für Thunderbird, Outlook, Apple Mail und Co. findest du in den Einstellungen des jeweiligen Postfachs. Die Standardwerte sind:

| Dienst | Server | Port | Verschlüsselung |
| --- | --- | --- | --- |
| IMAP | `mail.example.com` | 993 | SSL/TLS |
| SMTP | `mail.example.com` | 465 | SSL/TLS |
| SMTP (Alternative) | `mail.example.com` | 587 | STARTTLS |
| ManageSieve | `mail.example.com` | 4190 | STARTTLS |

Als Benutzername dient immer die vollständige E-Mail-Adresse.

Für iPhone und iPad bietet Mailcow ein fertiges Konfigurationsprofil an: Öffne die Postfach-Einstellungen direkt auf dem Gerät, lade das Profil herunter und installiere es in den Systemeinstellungen. Mail, Kalender und Kontakte sind damit in einem Schritt eingerichtet.

---

## Erweiterte Funktionen

### Protokolle je Postfach einschränken

Nicht jedes Postfach braucht jedes Protokoll. Für ein Postfach, das ausschließlich Benachrichtigungen aus deinem Homelab verschickt, reicht SMTP — IMAP, POP3 und der Weboberflächen-Zugang können deaktiviert bleiben.

Du findest die Schalter in den Einstellungen der jeweiligen Mailbox. Jedes abgeschaltete Protokoll ist eine Angriffsfläche weniger.

### App-Passwörter verwenden

Statt das echte Postfach-Passwort in einer Anwendung zu hinterlegen, erzeugst du in Mailcow ein App-Passwort und schränkst es auf die benötigten Protokolle ein.

Der Vorteil zeigt sich im Ernstfall: Wird die Konfiguration eines Dienstes kompromittiert, tauschst du nur dieses eine Passwort aus. Das eigentliche Postfach bleibt unberührt, und mit einem reinen SMTP-Passwort lässt sich niemand in dein Postfach einloggen.

---

## Betrieb und Wartung

### Updates einspielen

Mailcow bringt ein eigenes Update-Skript mit, das Repository, Images und Konfiguration gemeinsam aktualisiert:

```bash
cd /opt/mailcow-dockerized
./update.sh
```

### Backups erstellen

Vor größeren Änderungen und regelmäßig im laufenden Betrieb sicherst du Maildaten und Datenbanken:

```bash
cd /opt/mailcow-dockerized
./helper-scripts/backup_and_restore.sh backup all
```

Dasselbe Skript spielt mit `restore` auch wieder ein. Lege die Sicherungen zusätzlich außerhalb des Servers ab.

---

## Zustellbarkeit testen

Ob deine DNS-Einträge in der Praxis greifen, zeigt sich erst beim echten Versand. Zum Prüfen und Nachschärfen nutzen wir gerne [mail-tester.com](https://www.mail-tester.com/) — das Tool analysiert eine real zugestellte Nachricht und benennt konkret, was noch fehlt.

So gehst du vor:

1. Öffne [mail-tester.com](https://www.mail-tester.com/) — dort wird dir eine zufällige Test-Adresse angezeigt.
2. Schreibe von deinem neuen Postfach aus eine ganz normale E-Mail an diese Adresse, am besten mit Betreff und ein paar Sätzen Text.
3. Klicke auf der Seite auf **Then check your score**.

Du bekommst eine Bewertung von 0 bis 10 und dazu eine aufgeschlüsselte Liste. Geprüft werden unter anderem:

- **SPF, DKIM und DMARC** — ob die Einträge existieren, syntaktisch stimmen und zum Absender passen
- **Reverse DNS** — ob sich die IP deines Servers zum Hostnamen auflöst und wieder zurück
- **Blacklists** — ob deine IP-Adresse auf bekannten Sperrlisten steht
- **SpamAssassin-Score** — wie der Inhalt der Mail selbst bewertet wird
- **Aufbau der Nachricht** — fehlende Header, defekte Links, fehlender Text-Teil bei HTML-Mails

::: tip 10/10 als Ziel
Strebe die volle Punktzahl an. Jeder Abzug hat einen benannten Grund, und die Seite verrät dir direkt, welcher Eintrag dafür verantwortlich ist. Nach jeder DNS-Änderung testest du einfach mit einer **neuen** Test-Adresse erneut — jede Adresse ist nur für einen Durchlauf gedacht.
:::

::: warning Ergebnis richtig einordnen
Eine frisch vergebene IP-Adresse hat bei großen Anbietern noch keine Reputation aufgebaut. Selbst bei 10/10 kann es in den ersten Tagen vorkommen, dass Mails im Spam landen. Das legt sich, sobald regelmäßig Nachrichten von deinem Server zugestellt werden.
:::

---

## Troubleshooting

- **Zertifikat wird nicht ausgestellt:** Port 80 muss von außen erreichbar sein und der A-Record auf die richtige IP zeigen. Logs prüfen mit `docker compose logs acme-mailcow`.
- **Mails gehen raus, kommen aber nirgends an:** In fast allen Fällen fehlt der PTR-Eintrag oder der ausgehende Port 25 ist gesperrt.
- **Mails landen im Spam:** Prüfe SPF, DKIM und DMARC über die DNS-Seite in Mailcow und lass zusätzlich einen Testversand über [mail-tester.com](https://www.mail-tester.com/) laufen — dort siehst du direkt, welcher Eintrag noch klemmt. Frische IP-Adressen brauchen zusätzlich einige Tage, bis sie bei großen Anbietern Vertrauen aufgebaut haben.
- **Container starten nicht:** Meist fehlt Arbeitsspeicher. Prüfe mit `free -h`, ob Swap aktiv ist.
- **Port 80 oder 443 belegt:** Ein laufender Nginx oder Apache blockiert Mailcow. Dienst stoppen oder die Ports in der `mailcow.conf` ändern.
- **Login schlägt fehl trotz richtigem Passwort:** Prüfe, ob für das Postfach der Zugang zur Weboberfläche überhaupt aktiviert ist.

---

## Fazit

Mit Mailcow hast du einen vollwertigen Mailserver, der sich fast vollständig über die Weboberfläche bedienen lässt. Spamfilter, Zertifikate, DKIM-Verwaltung, Zwei-Faktor-Authentifizierung und Autokonfiguration für Clients sind bereits integriert — Dinge, die man bei einem manuell aufgesetzten Postfix-Stack einzeln zusammenbauen müsste.

Der Aufwand steckt weniger in der Installation als im DNS. Nimm dir für PTR, SPF, DKIM und DMARC die Zeit, die es braucht, und prüfe sie am Ende über die DNS-Seite in Mailcow. Stimmt dieses Fundament, läuft der Rest erfahrungsgemäß sehr stabil.

::: tip Nochmals danke an jusec
Das oben verlinkte Video von **jusec** geht alle Schritte live durch und zeigt zusätzlich Praxisfälle, die in einer schriftlichen Anleitung schwer abzubilden sind. Absolute Empfehlung — schau gerne dort vorbei und lass ein Abo da: [youtu.be/Oi4VOW_g0rM](https://www.youtube.com/watch?v=Oi4VOW_g0rM)
:::

## Weiterführende Links

- [Offizielle Mailcow-Dokumentation](https://docs.mailcow.email/de/)
- [mail-tester.com](https://www.mail-tester.com/) – Zustellbarkeit und DNS-Einträge testen
- [rDNS erstellen](/dashboard/produkte/rdns-erstellen)
- [DNS verwalten](/dashboard/produkte/dns-verwalten)
- [Docker installieren](/rootserver/anwendungen/docker-installieren)
