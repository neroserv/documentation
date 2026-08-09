# Contributer werden

Willkommen! Wir freuen uns über jeden, der unsere Dokumentation verbessern möchte. Diese Anleitung zeigt dir, wie du beitragen kannst.

## Wie du beitragen kannst

### 1. **Fehler melden**

Hast du einen Fehler in der Dokumentation gefunden? 
- Öffne ein [Issue auf GitHub](https://github.com/neroserv)
- Beschreibe das Problem so genau wie möglich

### 2. **Dokumentation verbessern**

Du kannst direkt bei der Dokumentation mithelfen:

1. **Fork das Repository** auf GitHub
2. **Erstelle einen Branch** für deine Änderungen
   ```bash
   git checkout -b feature/verbesserte-anleitung
   ```
3. **Bearbeite die Markdown-Dateien** im `/docs` Ordner
4. **Teste lokal** mit `npm run dev`
5. **Commit & Push** deine Änderungen
   ```bash
   git commit -m "docs: verbesserte Anleitung für XYZ"
   git push origin feature/verbesserte-anleitung
   ```
6. **Öffne einen Pull Request** auf GitHub

### 3. **Neue Seiten hinzufügen**

Du möchtest eine völlig neue Anleitung schreiben?

- Erstelle eine neue `.md` Datei im entsprechenden Verzeichnis
- Schreibe die Dokumentation klar und verständlich
- Vergiss nicht, die Seite in `.vitepress/config.mts` zur Sidebar hinzuzufügen

## Richtlinien

### 📝 Schreib-Richtlinien

- **Klar und prägnant:** Nutzer sind in Eile – halte es einfach
- **Praktische Beispiele:** Code-Snippets und konkrete Use-Cases helfen
- **Deutsche Sprache:** Verwende korrektes Deutsch, auch in Code-Kommentaren
- **Struktur:** Nutze Überschriften, Listen und Code-Blöcke
- **Aktualität:** Überprüfe, dass Befehle und Links noch funktionieren

### 🏗️ Struktur einer guten Anleitung

```markdown
# Titel

Kurze Einführung (1-2 Sätze)

## Voraussetzungen

- Anforderung 1
- Anforderung 2

## Installation / Konfiguration

Schritt-für-Schritt Anleitung mit Code-Blöcken

## Troubleshooting

Häufige Probleme und Lösungen

## Weitere Ressourcen

Links zu verwandten Themen
```

## Community

Fragen? Nicht sicher, ob dein Beitrag passt?

- 💬 **Discord:** [ForgeHost Discord](https://discord.gg/HU5EP9mdtM)
- 📧 **Email:** info@forgehost.de
- 🐙 **GitHub:** [neroserv](https://github.com/neroserv)

---

## 🙏 Danke für deine Hilfe!

Jeder Beitrag macht unsere Dokumentation besser und hilft der ganzen Community. Vielen Dank! 💜
