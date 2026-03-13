# Home Assistant Airflow Card

Eine benutzerdefinierte Lovelace-Karte zur Visualisierung von Lüftungsanlagen (Airflow).

## Visualisierung
 
| ![Normalbetrieb](docs/normal.webp) |    ![Aktiver Bypass](docs/bypass.webp)    | ![Dark Mode](docs/dark.webp) |
| :----------------------------------------: | :-----------------------------------------------------------: | :------------------------------------: |
|       *Partikel-Animation im Wärmetauscher*        | *Bypass aktiv: Außenluft wird am Wärmetauscher vorbeigeführt* | *Unterstützung für Dark Mode / Dark Themes* |

## Terminologie

Die folgenden Standardbegriffe werden für die Luftwege verwendet:

| Begriff       | Englisch    | Beschreibung                    | Pfad                          |
| ------------- | ----------- | ------------------------------- | ----------------------------- |
| **Außenluft** | Outdoor Air | Frische Luft von draußen        | Außen (Oben Links) -> Gerät   |
| **Zuluft**    | Supply Air  | Frische Luft für die Räume      | Gerät -> Räume (Unten Rechts) |
| **Abluft**    | Extract Air | Verbrauchte Luft aus den Räumen | Räume (Oben Rechts) -> Gerät  |
| **Fortluft**  | Exhaust Air | Verbrauchte Luft nach draußen   | Gerät -> Außen (Unten Links)  |

## Funktionen
- **Partikel-Animation:** Dynamischer Partikel-Schwarm im Wärmetauscher, der die Luftströme lebendig visualisiert.
- **Farbwechsel:** Sanfter Farbübergang der Partikel während des Austauschs (z.B. von Kaltblau zu Frischgrün).
- **Dynamische Visualisierung:** Animiert Luftströme und Lüfter basierend auf Live-Daten mit robuster SVG-Technik.
- **Sprachunterstützung:** Integrierte Unterstützung für Deutsch und Englisch.
- **Dynamische Geschwindigkeit:** Luftstrom- und Lüftergeschwindigkeit passen sich der aktuellen Lüfterstufe an. Funktioniert auch dann automatisch, wenn keine RPM-Sensoren vorhanden sind.
- **Effizienzberechnung:** Option zur Live-Berechnung des Wirkungsgrads aus den Temperatursensoren.
- **Bypass-Logik:** Visuelle Umleitung des Außenluftstroms bei aktivem Bypass inklusive Farbanpassung.
- **Theme & Dark Mode Unterstützung:** Passt sich automatisch an Home Assistant Designs an. Unterstützt explizite Modi für "Auto", "Dunkel" (Dark) und "Hell" (Light).
- **Anpassbare Farben:** Vollständig konfigurierbare Farben für alle vier Luftwege über ein Auswahlmenü.
- **UI-Editor:** Einfache Konfiguration über den Home Assistant Karten-Editor.

## Konfiguration

Die Karte kann vollständig über den visuellen Editor konfiguriert werden.

### Erforderliche Entitäten
- **Zuluft Temp:** Temperatur der Luft, die in die Räume geleitet wird.
- **Abluft Temp:** Temperatur der verbrauchten Luft aus den Räumen.
- **Fortluft Temp:** Temperatur der Luft, die nach draußen geblasen wird.
- **Außenluft Temp:** Temperatur der frischen Luft von draußen.

### Optionale Entitäten & Einstellungen
- **Zu-/Abluftventilator:** Sensoren für die Motoren (z. B. RPM oder Zustand). Wenn 0 oder aus, bleibt das Icon statisch, außer eine **Lüfterstufe** > 0 wird erkannt.
- **Effizienz Sensor:** Bestehender Sensor für den Wirkungsgrad des Wärmetauschers (%).
- **Dynamische Effizienzberechnung:** Falls aktiviert, berechnet die Karte den Wert selbst: `(Zuluft - Außenluft) / (Abluft - Außenluft) * 100`.
- **Lüfterstufe Sensor:** Sensor für die aktuelle Betriebsstufe (z. B. 1, 2, 3). Dieser Sensor steuert die Animation nun auch dann, wenn keine RPM-Sensoren konfiguriert sind.
- **Min/Max Stufe:** Bereich deiner Lüfterstufen zur Skalierung der Animationsgeschwindigkeit.
- **Bypass Entität:** Binärer Sensor oder Sensor, der anzeigt, ob der Bypass aktiv ist.
- **Sprache:** Auswahl zwischen Deutsch und Englisch.
- **Hintergrund-Farbmodus:** Auswahl zwischen "Automatisch (Theme)", "Festes Dunkel" (Dark) und "Festes Hell" (Light).
- **Farben:** Eigene Hex-Codes für Außenluft, Zuluft, Abluft und Fortluft.

### Theme-Modus
Die Karte unterstützt drei verschiedene Darstellungsmodi:
- **Automatisch (Standard):** Verwendet die CSS-Variablen deines aktuellen Home Assistant Themes.
- **Dunkel (Dark):** Erzwingt einen dunklen Hintergrund und helle Texte.
- **Hell (Light):** Erzwingt einen weißen Hintergrund und dunkle Texte.

## Installation

### Manuell
1. Kopiere `dist/homeassistant-airflow-card.js` in deinen Home Assistant `www` Ordner.
2. Füge die Ressource in deinem Lovelace Dashboard hinzu:
   - URL: `/local/homeassistant-airflow-card.js`
   - Typ: `Module`

## Entwicklung

1. Führe `npm install` aus.
2. Führe `npm run dev` aus, um den lokalen Entwicklungsserver zu starten (`index.html`).
3. Führe `npm run build` aus, um die Dist-Datei zu erstellen.
