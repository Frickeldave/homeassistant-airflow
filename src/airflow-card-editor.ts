import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AirflowCardConfig, HomeAssistant } from './types.js';

@customElement('airflow-card-editor')
export class AirflowCardEditor extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private _config?: AirflowCardConfig;

    public setConfig(config: AirflowCardConfig): void {
        this._config = config;
    }

    private _schema = [
        { name: 'name', selector: { text: {} } },
        { name: 'language', selector: { select: { options: [{ label: 'English', value: 'en' }, { label: 'Deutsch', value: 'de' }] } } },
        {
            name: '',
            type: 'grid',
            schema: [
                { name: 'entity_temp_supply', selector: { entity: { domain: 'sensor' } } },
                { name: 'entity_temp_extract', selector: { entity: { domain: 'sensor' } } },
                { name: 'entity_temp_exhaust', selector: { entity: { domain: 'sensor' } } },
                { name: 'entity_temp_outdoor', selector: { entity: { domain: 'sensor' } } },
            ]
        },
        {
            name: '',
            type: 'grid',
            schema: [
                { name: 'entity_fan_supply', selector: { entity: { domain: 'sensor' } } },
                { name: 'entity_fan_extract', selector: { entity: { domain: 'sensor' } } },
            ]
        },
        {
            name: '',
            type: 'grid',
            schema: [
                { name: 'entity_level', selector: { entity: { domain: 'sensor' } } },
                { name: 'level_min', selector: { number: { min: 0, max: 100, mode: 'box' } } },
                { name: 'level_max', selector: { number: { min: 0, max: 100, mode: 'box' } } },
            ]
        },
        {
            name: '',
            type: 'grid',
            schema: [
                { name: 'entity_efficiency', selector: { entity: { domain: 'sensor' } } },
                { name: 'efficiency_calculation_dynamic', selector: { boolean: {} } },
            ]
        },
        { name: 'entity_bypass', selector: { entity: {} } },
        {
            name: 'colors',
            type: 'grid',
            schema: [
                { name: 'color_outdoor', selector: { text: {} } },
                { name: 'color_supply', selector: { text: {} } },
                { name: 'color_extract', selector: { text: {} } },
                { name: 'color_exhaust', selector: { text: {} } },
            ]
        },
    ];

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${this._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }

    private _computeLabel = (schema: any) => {
        const labels: { [key: string]: string } = {
            name: 'Name',
            language: 'Language',
            entity_temp_supply: 'Supply Temp (Zuluft)',
            entity_temp_extract: 'Extract Temp (Abluft)',
            entity_temp_exhaust: 'Exhaust Temp (Fortluft)',
            entity_temp_outdoor: 'Outdoor Temp (Außenluft)',
            entity_fan_supply: 'Supply Fan RPM',
            entity_fan_extract: 'Extract Fan RPM',
            entity_level: 'Fan Level Sensor',
            level_min: 'Min Level',
            level_max: 'Max Level',
            entity_efficiency: 'Efficiency Sensor',
            efficiency_calculation_dynamic: 'Dynamic Efficiency Calculation',
            entity_bypass: 'Bypass Entity',
            color_outdoor: 'Outdoor Color',
            color_supply: 'Supply Color',
            color_extract: 'Extract Color',
            color_exhaust: 'Exhaust Color',
        };
        return labels[schema.name] || schema.name;
    };

    private _valueChanged(ev: CustomEvent): void {
        const config = ev.detail.value;
        const event = new CustomEvent('config-changed', {
            detail: { config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    static get styles() {
        return css`
            ha-form {
                display: block;
                padding: 8px 0;
            }
        `;
    }
}
