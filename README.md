# Home Assistant Airflow Card

A custom Lovelace card to visualize ventilation systems (Airflow).

## Airflow Terminology

The following standard terminology is used for the air paths:

| Term            | German    | Description                 | Path                          |
| --------------- | --------- | --------------------------- | ----------------------------- |
| **Outdoor Air** | Außenluft | Fresh air from outside      | Outside (Top Left) -> Unit    |
| **Supply Air**  | Zuluft    | Fresh air supplied to rooms | Unit -> Rooms (Bottom Right)  |
| **Extract Air** | Abluft    | Stale used air from rooms   | Rooms (Top Right) -> Unit     |
| **Exhaust Air** | Fortluft  | Stale air blown outside     | Unit -> Outside (Bottom Left) |

## Features
- Visualization of Supply, Extract, Exhaust, and Outdoor airflows.
- Animated fans based on state or RPM.
- Heat exchanger efficiency display.
- Bypass activation visualization.
- Configuration via UI editor.

## Installation

### Manual
1. Copy `dist/homeassistant-airflow-card.js` to your Home Assistant `www` folder.
2. Add the resource in your Lovelace Dashboard resources:
   - URL: `/local/homeassistant-airflow-card.js`
   - Type: `Module`

### Configuration

Add the card to your dashboard and configure the entities via the Visual Editor.

**Required Entities:**
- Supply Temperature (Zuluft)
- Extract Temperature (Abluft)
- Exhaust Temperature (Fortluft)
- Outdoor Temperature (Außenluft)

**Optional Entities:**
- Supply Fan (RPM or on/off)
- Extract Fan (RPM or on/off)
- Efficiency Sensor (%)
- Bypass Entity (binary_sensor or sensor)

## Development

1. Run `npm install`
2. Run `npm run dev` to start a local development server.
3. Run `npm run build` to build the distribution file.
