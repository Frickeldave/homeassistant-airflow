# Home Assistant Airflow Card

Eine benutzerdefinierte Lovelace-Karte zur Visualisierung von Lüftungsanlagen (Airflow).

## Luftströme

Die folgenden Begriffe werden für die Luftwege verwendet:

| Begriff       | English     | Beschreibung                  | Weg                            |
| ------------- | ----------- | ----------------------------- | ------------------------------ |
| **Außenluft** | Outdoor Air | Frische Luft von draußen      | Draußen (Oben Links) -> Gerät  |
| **Zuluft**    | Supply Air  | Frische Luft in die Räume     | Gerät -> Räume (Unten Rechts)  |
| **Abluft**    | Extract Air | Verbrauchte Luft aus Räumen   | Räume (Oben Rechts) -> Gerät   |
| **Fortluft**  | Exhaust Air | Verbrauchte Luft nach draußen | Gerät -> Draußen (Unten Links) |

## Funktionen
- Visualisierung von Zuluft, Abluft, Fortluft und Außenluft.
- Animierte Lüfter (basierend auf Status oder RPM).
- Anzeige des Wirkungsgrads und der Lüfterstufe.
- Visualisierung des Sommerbypass (aktiv/inaktiv).
- Konfiguration über den visuellen Editor.

## Installation

### Manuell
1. Kopieren Sie `dist/homeassistant-airflow-card.js` in Ihren Home Assistant `www` Ordner.
2. Fügen Sie die Ressource in Ihren Lovelace Dashboard Ressourcen hinzu:
   - URL: `/local/homeassistant-airflow-card.js`
   - Typ: `Module`

### Konfiguration

Fügen Sie die Karte zu Ihrem Dashboard hinzu und konfigurieren Sie die Entitäten über den visuellen Editor.

**Erforderliche Entitäten:**
- Zuluft Temperatur (Supply)
- Abluft Temperatur (Extract)
- Fortluft Temperatur (Exhaust)
- Außenluft Temperatur (Outdoor)

**Optionale Entitäten:**
- Zuluft Ventilator (RPM oder an/aus)
- Abluft Ventilator (RPM oder an/aus)
- Wirkungsgrad Sensor (%)
- Lüfterstufe (z. B. 1-10)
- Bypass Entität (binary_sensor oder sensor)

## Entwicklung

1. Führen Sie `npm install` aus.
2. Führen Sie `npm run dev` aus, um einen lokalen Entwicklungsserver zu starten.
3. Führen Sie `npm run build` aus, um die Distributionsdatei zu erstellen.
