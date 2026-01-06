# Home Assistant Airflow Card

A custom Lovelace card to visualize ventilation systems (Airflow).

## Visualization

|               Normal Operation                |                        Active Bypass                         |
| :-------------------------------------------: | :----------------------------------------------------------: |
| ![Normal Operation](docs/airflow-diagram.png) |    ![Active Bypass](docs/airflow-diagram-with-bypass.png)    |
|         *Standard heat exchange mode*         | *Bypass active: Fresh air diverts around the heat exchanger* |

## Airflow Terminology

The following standard terminology is used for the air paths:

| Term            | German    | Description                 | Path                          |
| --------------- | --------- | --------------------------- | ----------------------------- |
| **Outdoor Air** | Außenluft | Fresh air from outside      | Outside (Top Left) -> Unit    |
| **Supply Air**  | Zuluft    | Fresh air supplied to rooms | Unit -> Rooms (Bottom Right)  |
| **Extract Air** | Abluft    | Stale used air from rooms   | Rooms (Top Right) -> Unit     |
| **Exhaust Air** | Fortluft  | Stale air blown outside     | Unit -> Outside (Bottom Left) |

## Features
- **Dynamic Visualization:** Animates airflow and fans based on live data.
- **Language Support:** Built-in English and German support.
- **Dynamic Animation Speed:** Airflow and fan speeds adjust based on the current ventilation level.
- **Efficiency Calculation:** Option to calculate heat exchanger efficiency live from temperature sensors.
- **Bypass Logic:** Visually diverts the fresh air stream when the bypass is active and unifies the color.
- **Customizable Colors:** Fully adjustable colors for all four airflow paths.
- **UI Editor:** Easy configuration via the Home Assistant card editor.

## Configuration

The card can be fully configured via the Visual Editor.

### Required Entities
- **Supply Temp:** Temperature of the air being supplied to the rooms.
- **Extract Temp:** Temperature of the stale air coming from the rooms.
- **Exhaust Temp:** Temperature of the air being blown outside.
- **Outdoor Temp:** Temperature of the fresh air from outside.

### Optional Entities & Settings
- **Supply/Extract Fan:** RPM sensors for the motors. Values > 0 trigger animation.
- **Efficiency Sensor:** Existing sensor for heat exchanger efficiency (%).
- **Dynamic Efficiency Calculation:** If enabled, the card calculates efficiency using: `(Supply - Outdoor) / (Extract - Outdoor) * 100`.
- **Fan Level Sensor:** Sensor for the current operational stage (e.g., 1, 2, 3).
- **Min/Max Level:** Define the range of your ventilation stages to scale the animation speed.
- **Bypass Entity:** Binary sensor or sensor that indicates if the bypass is active.
- **Language:** Choice between English and German.
- **Colors:** Custom hex-codes for Outdoor, Supply, Extract, and Exhaust paths.

## Installation

### Manual
1. Copy `dist/homeassistant-airflow-card.js` to your Home Assistant `www` folder.
2. Add the resource in your Lovelace Dashboard resources:
   - URL: `/local/homeassistant-airflow-card.js`
   - Type: `Module`

## Development

1. Run `npm install`
2. Run `npm run dev` to start a local development server (`index.html`).
3. Run `npm run build` to build the distribution file.
