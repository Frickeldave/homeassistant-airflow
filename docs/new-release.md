# 🚀 Neuen Release erstellen

Diese Anleitung beschreibt den Prozess zum Erstellen eines neuen Releases für das **homeassistant-airflow** Projekt.

## 📝 Schritte zum Erstellen eines Releases

1.  **Zu GitHub Releases navigieren**
    Gehe zur [Releases-Seite](https://github.com/Frickeldave/homeassistant-airflow/releases) und klicke oben rechts auf den Button **"Draft a new release"**.

2.  **Neuen Tag anlegen**
    -   Klicke auf "Choose a tag" und gib die neue Versionsnummer ein.
    -   **Namenskonvention:**
        -   Standard-Releases: `1.0.0`, `1.0.1`, `1.1.0`, etc.
        -   Pre-releases (Vorabversionen): `1.0.1.beta`, `1.0.2.beta`, etc.

3.  **Pre-releases konfigurieren**
    Wenn du eine Beta- oder Alpha-Version erstellst, stelle sicher, dass du das Häkchen bei **"Set as a pre-release"** am Ende der Seite setzt.

## 🔍 Änderungen ermitteln

Um alle Änderungen seit dem letzten Release (oder zwischen Branches) aufzulisten, verwende die folgenden Git-Befehle in deinem Terminal:

```bash
# Zu deinem Feature- oder Release-Branch wechseln
git checkout <branch-name>

# Alle Commits auflisten, die in deinem Branch, aber nicht in 'main' sind
git log --oneline main..<branch-name>
```

*Beispiel:*
```bash
git checkout feature/color-dynamics
git log --oneline main..feature/color-dynamics
```

## 📋 Vorlage für die Release-Beschreibung

Die Beschreibung sollte immer sowohl auf **Englisch** als auch auf **Deutsch** verfasst werden. Nutze die folgende Struktur:

### Englische Vorlage (English Template)
```markdown
🚀 New Features
- [Feature 1]
- [Feature 2]

🔧 Improvements
- [Improvement 1]
- [Improvement 2]

🐛 Bug Fixes
- [Bug Fix 1]
- [Bug Fix 2]
```

### Deutsche Vorlage
```markdown
🚀 Neue Features
- [Feature 1]
- [Feature 2]

🔧 Verbesserungen
- [Verbesserung 1]
- [Verbesserung 2]

🐛 Bug Fixes
- [Bug Fix 1]
- [Bug Fix 2]
```


