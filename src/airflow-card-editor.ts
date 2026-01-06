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

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        // debug info with version 1.4
        return html`
            <div class="card-config">
                <div class="debug-box">
                    <strong>Editor Debug Info:</strong><br>
                    Version: 1.4 (HA Pickers + Colors)<br>
                    Config Name: ${this._config.name || 'None'}
                </div>

                <div class="option">
                    <label>Name</label>
                    <input 
                        type="text" 
                        .value=${this._config.name || ''} 
                        @input=${(e: Event) => this._updateConfig('name', (e.target as HTMLInputElement).value)}
                        class="text-input"
                    />
                </div>

                <h3>Temperatures</h3>
                ${this.renderEntitySelect('entity_temp_supply', 'Supply Temperature (Zuluft)', 'sensor')}
                ${this.renderEntitySelect('entity_temp_extract', 'Extract Temperature (Abluft)', 'sensor')}
                ${this.renderEntitySelect('entity_temp_exhaust', 'Exhaust Temperature (Fortluft)', 'sensor')}
                ${this.renderEntitySelect('entity_temp_outdoor', 'Outdoor Temperature (Außenluft)', 'sensor')}

                <h3>Fans & Efficiency</h3>
                ${this.renderEntitySelect('entity_fan_supply', 'Supply Fan (RPM)', 'sensor')}
                ${this.renderEntitySelect('entity_fan_extract', 'Extract Fan (RPM)', 'sensor')}
                ${this.renderEntitySelect('entity_level', 'Fan Level Entity', 'sensor')}
                ${this.renderEntitySelect('entity_efficiency', 'Efficiency Entity', 'sensor')}

                <h3>Bypass</h3>
                ${this.renderEntitySelect('entity_bypass', 'Bypass Entity', 'binary_sensor,sensor')}

                <h3>Colors</h3>
                ${this.renderColorSelect('color_outdoor', 'Outdoor Color (Default: Blue)')}
                ${this.renderColorSelect('color_supply', 'Supply Color (Default: Green)')}
                ${this.renderColorSelect('color_extract', 'Extract Color (Default: Amber)')}
                ${this.renderColorSelect('color_exhaust', 'Exhaust Color (Default: Red)')}

                <h3>Other</h3>
                <div class="option">
                     <label>Manual Efficiency Calc (Checkbox)</label>
                     <input type="checkbox" 
                        .checked=${this._config.efficiency_calculation_dynamic === true}
                        @change=${(e: Event) => this._updateConfig('efficiency_calculation_dynamic', (e.target as HTMLInputElement).checked)}
                     /> 
                     <span style="font-size: 12px;">Enable dynamic calculation from temperatures</span>
                </div>
            </div>
        `;
    }

    private renderEntitySelect(configValue: string, label: string, domains: string): TemplateResult {
        if (!this._config) return html``;
        const currentVal = (this._config as any)[configValue] || '';
        const domainList = domains.split(',');

        return html`
            <div class="option">
                <ha-entity-picker
                    .hass=${this.hass}
                    .value=${currentVal}
                    .label=${label}
                    .includeDomains=${domainList}
                    @value-changed=${(e: CustomEvent) => this._updateConfig(configValue, e.detail.value)}
                    allow-custom-entity
                ></ha-entity-picker>
            </div>
        `;
    }

    private renderColorSelect(configValue: string, label: string): TemplateResult {
        const currentVal = (this._config as any)[configValue] || '';

        // Define standard colors matching the card defaults + extras
        const colors = [
            { label: 'Blue (#2196F3)', value: '#2196F3' },
            { label: 'Green (#4CAF50)', value: '#4CAF50' },
            { label: 'Amber (#FFB300)', value: '#FFB300' },
            { label: 'Red (#F44336)', value: '#F44336' },
            { label: 'Grey (#9E9E9E)', value: '#9E9E9E' },
            { label: 'Black (#000000)', value: '#000000' },
            { label: 'White (#FFFFFF)', value: '#FFFFFF' }
        ];

        // If current value is set but not in list, add it dynamically so it's not lost
        const found = colors.some(c => c.value === currentVal);
        const options = found || !currentVal ? colors : [...colors, { label: `Custom (${currentVal})`, value: currentVal }];

        return html`
            <div class="option">
                <label>${label}</label>
                <select 
                    .value=${currentVal} 
                    @change=${(e: Event) => this._updateConfig(configValue, (e.target as HTMLSelectElement).value)}
                    class="select-input"
                >
                    <option value="" disabled ?selected=${!currentVal}>Select a color...</option>
                    ${options.map(c => html`
                        <option value=${c.value} ?selected=${c.value === currentVal}>${c.label}</option>
                    `)}
                </select>
            </div>
        `;
    }

    private _updateConfig(key: string, value: any): void {
        if (!this._config) return;

        const newConfig = { ...this._config, [key]: value };

        // Optimistic update
        this._config = newConfig;

        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        }));
    }

    static get styles() {
        return css`
            .card-config {
                padding: 16px;
                font-family: var(--paper-font-body1_-_font-family);
            }
            .debug-box {
                background: #e8f5e9;
                border: 1px solid #4caf50;
                padding: 10px;
                margin-bottom: 20px; 
                border-radius: 4px; 
                font-size: 12px;
                color: #2e7d32;
            }
            .option {
                margin-bottom: 16px;
                display: flex;
                flex-direction: column;
            }
            label {
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 4px;
                color: var(--secondary-text-color);
            }
            .text-input, .select-input {
                width: 100%;
                padding: 8px;
                border: 1px solid var(--divider-color, #ccc);
                border-radius: 4px;
                background: var(--card-background-color, white);
                color: var(--primary-text-color, black);
                font-size: 14px;
            }
            h3 {
                font-size: 14px;
                margin: 20px 0 10px 0;
                border-bottom: 1px solid var(--divider-color, #eee);
                padding-bottom: 4px;
            }
            /* Colors for the Select options if needed, but browser handles typically */
        `;
    }
}
