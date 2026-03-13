
export interface AirflowCardConfig {
    type: string;
    name?: string;
    language?: 'auto' | 'en' | 'de';

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
    efficiency_calculation_dynamic?: boolean; // Dynamische Berechnung
    entity_bypass?: string; // Sommerbypass (binary_sensor or sensor)

    // Colors
    color_mode?: 'static' | 'dynamic_temp';
    color_outdoor?: string;
    color_supply?: string;
    color_extract?: string;
    color_exhaust?: string;
    
    // Dynamic Temp Colors
    base_color_supply?: string;
    base_color_exhaust?: string;
    temp_min?: number;
    temp_max?: number;
    temp_neutral?: number;
    color_hot?: string;
    color_cold?: string;
    
    card_background_mode?: 'auto' | 'dark' | 'light';
}

export interface HomeAssistant {
    states: { [key: string]: HassEntity };
    language: string;
}

export interface HassEntity {
    entity_id: string;
    state: string;
    attributes: { [key: string]: any };
}
