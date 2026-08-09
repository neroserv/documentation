![ForgeHost Logo](https://cdn.forgehost.de/branding/forgehost-logo-schrift-normal.svg)

# ForgeHost Dokumentation

Willkommen in der offiziellen **ForgeHost** Dokumentation! 📚

Hier findest du umfassende Anleitungen zur Verwaltung deiner Hosting-Produkte, Server-Konfiguration und vieles mehr.

---

## 🚀 Schnellstart

Die Dokumentation ist in folgende Bereiche unterteilt:

### 📊 **Dashboard**
Verwalte dein ForgeHost Konto, Produkte und Abrechnung.
- [Login & Registrierung](./docs/dashboard/login-registrierung.md)
- [Mein Account](./docs/dashboard/mein-account.md)
- [Support & Community](./docs/dashboard/support-tickets.md)

### 🎮 **Produkte**
Konfiguriere deine Domains, Webspaces und Server.
- [Domains & DNS](./docs/dashboard/produkte/domain-kaufen.md)
- [Webspaces](./docs/dashboard/produkte/webspace-bestellen.md)
- [KVM-Server](./docs/dashboard/produkte/kvm-power.md)

### 💻 **Root Server**
Verwende Linux/Windows Server mit umfassenden Konfigurationsanleitungen.
- [Anwendungen installieren](./docs/rootserver/anwendungen/)
- [SSH & Verbindung](./docs/rootserver/linux/ssh-verbinden.md)
- [Firewall & Sicherheit](./docs/rootserver/konfiguration/)

### 🎯 **Gameserver**
Installiere und verwalte FiveM Server.
- [FiveM Installation](./docs/gameserver/fivem/installation-linux.md)
- [Pterodactyl Panel](./docs/rootserver/anwendungen/pterodactyl-installieren.md)

---

## 🛠️ Lokal entwickeln

### Voraussetzungen
- **Node.js 18+**
- **npm** oder **yarn**

### Installation

```bash
# Repository klonen
git clone https://github.com/neroserv/Docs.git
cd Docs

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Dokumentation läuft dann auf `http://localhost:5173/`

### Build für Production

```bash
npm run build
npm run preview
```

---

## 🤝 Contributer werden

Du möchtest die Dokumentation verbessern oder neue Seiten hinzufügen?

### 📝 So funktioniert's:

1. **Repository forken** auf GitHub
2. **Einen Branch erstellen** für deine Änderungen
   ```bash
   git checkout -b docs/meine-anleitung
   ```
3. **Dokumentation schreiben** (Markdown-Format)
4. **Lokal testen** mit `npm run dev`
5. **Pull Request erstellen** auf GitHub

### ✅ Best Practices

- **Klar und prägnant:** Halte Erklärungen einfach
- **Code-Beispiele:** Ergänze mit praktischen Snippets
- **Auf Deutsch:** Verwende deutsche Sprache
- **Struktur:** Nutze Überschriften und Listen
- **Aktualität:** Überprüfe Links und Befehle

### 📚 Struktur einer guten Anleitung

```markdown
# Titel

Kurze Einführung (1-2 Sätze)

## Voraussetzungen

- Anforderung 1
- Anforderung 2

## Schritt-für-Schritt

### Schritt 1: ...
\`\`\`bash
befehle hier
\`\`\`

### Schritt 2: ...

## Troubleshooting

Häufige Probleme und Lösungen

## Weitere Ressourcen

Links zu verwandten Themen
```

Mehr Infos: [Contributer werden](./docs/allgemein/contributer-werden.md)

---

## 📞 Support & Community

### Kontakt

- 🌐 **Webseite:** [forgehost.de](https://forgehost.de)
- 📧 **Email:** info@forgehost.de
- 💬 **Discord:** [ForgeHost Community](https://discord.gg/HU5EP9mdtM)
- 📊 **Dashboard:** [dash.forgehost.de](https://dash.forgehost.de)

### Links

- 🐙 **GitHub:** [neroserv](https://github.com/neroserv)
- ⚖️ **Impressum:** [forgehost.de/imprint](https://forgehost.de/imprint)

---

## 📄 Lizenz

Diese Dokumentation ist Open Source. Beiträge sind willkommen!

---

**Viel Erfolg mit deinen ForgeHost Produkten! 🚀**
