# Projekt: Home Assistant Airflow Card

Diese Datei dient als Leitfaden für KI-Agenten, die an diesem Projekt arbeiten.

## WICHTIG: Kommunikationssprache
**Die gesamte Kommunikation mit dem Benutzer muss ausnahmslos auf DEUTSCH erfolgen.** Alle Erklärungen, Kommentare in Dokumenten (sofern nicht anders vorgegeben) und Antworten sollen in deutscher Sprache verfasst sein.

## Projektübersicht
Die `homeassistant-airflow-card` ist eine benutzerdefinierte Lovelace-Karte für Home Assistant. Sie dient der Visualisierung von Lüftungssystemen (Airflow), einschließlich der Darstellung von Wärmetauschern, Bypass-Logik und verschiedenen Luftströmen (Außenluft, Zuluft, Abluft, Fortluft).

## Technologie-Stack
- **Sprache:** TypeScript
- **Frontend-Framework:** Lit (Web Components)
- **Build-Tool:** Vite
- **Integration:** Home Assistant (custom-card-helpers)
- **Verwaltung:** HACS (Home Assistant Community Store) kompatibel

## Projektstruktur
- `src/airflow-card.ts`: Die Hauptkomponente der Karte. Beinhaltet die Logik für das Rendering und die Animationen.
- `src/airflow-card-editor.ts`: Der visuelle Konfigurations-Editor für die Home Assistant UI.
- `src/translations.ts`: Enthält die Übersetzungs-Strings (aktuell Englisch und Deutsch).
- `src/types.ts`: TypeScript-Schnittstellen und Typdefinitionen.
- `dist/`: Enthält die kompilierten JavaScript-Dateien für die Verwendung in Home Assistant.

## Entwicklungs-Workflow
1. **Abhängigkeiten installieren:** `npm install`
2. **Entwicklungs-Server starten:** `npm run dev` (öffnet `index.html` zur lokalen Vorschau)
3. **Build erstellen:** `npm run build` (erzeugt die `dist/homeassistant-airflow-card.js`)

## Richtlinien
- Verwende Lit-Dekoratoren (`@property`, `@state`, `@customElement`) für reaktive Eigenschaften und Komponenten-Definitionen.
- Animationen basieren auf CSS und SVG-Pfaden innerhalb der Lit-Templates.
- Die Karte sollte responsiv sein und sich an verschiedene Größen in der Home Assistant UI anpassen.
- Neue Features sollten sowohl im Code als auch im Editor (`airflow-card-editor.ts`) berücksichtigt werden.
- **Sprache:** Code-Kommentare können in Englisch verfasst werden (Standard für Code), aber die Benutzerführung und Dokumentation im Projekt (wie README) sollte Deutsch unterstützen oder primär Deutsch sein. Die Kommunikation mit dem Entwickler ist immer Deutsch.
