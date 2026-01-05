
export interface AirflowCardConfig {
    type: string;
    name?: string;

    // Entities
    entity_temp_supply: string; // Zuluft Temperatur
    entity_temp_extract: string; // Abluft Temperatur
    entity_temp_exhaust: string; // Fortluft Temperatur
    entity_temp_outdoor: string; // Außenluft Temperatur

    entity_fan_supply?: string; // Umdrehungszahl Motor Zuluft
    entity_fan_extract?: string; // Umdrehungszahl Motor Abluft

    entity_level?: string; // Stufe
    level_min?: number; // Minimale Stufe
    level_max?: number; // Maximale Stufe
    entity_efficiency?: string; // Wirkungsgrad
    entity_bypass?: string; // Sommerbypass (binary_sensor or sensor)
}

export interface HomeAssistant {
    states: { [key: string]: HassEntity };
}

export interface HassEntity {
    entity_id: string;
    state: string;
    attributes: { [key: string]: any };
}
