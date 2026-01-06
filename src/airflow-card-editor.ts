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

        // debug info with version 1.3
        return html`
            <div class="card-config">
                <div class="debug-box">
                    <strong>Editor Debug Info:</strong><br>
                    Version: 1.3 (Native Select Dropdowns)<br>
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

                <h3>Other</h3>
                ${this.renderEntitySelect('entity_bypass', 'Bypass Entity', 'binary_sensor,sensor')}
                
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
        const currentVal = (this._config as any)[configValue] || '';

        // Filter entities from hass.states
        const domainList = domains.split(',');
        const entities = Object.keys(this.hass.states)
            .filter(eid => domainList.some(d => eid.startsWith(d + '.')))
            .sort();

        return html`
            <div class="option">
                <label>${label}</label>
                <select 
                    .value=${currentVal} 
                    @change=${(e: Event) => this._updateConfig(configValue, (e.target as HTMLSelectElement).value)}
                    class="select-input"
                >
                    <option value="" disabled ?selected=${currentVal === ''}>Select an entity...</option>
                    ${entities.map(eid => html`
                        <option value=${eid} ?selected=${eid === currentVal}>
                            ${this.hass.states[eid].attributes.friendly_name || eid} (${eid})
                        </option>
                    `)}
                </select>
                <div class="value-display">Selected: ${currentVal || 'None'}</div>
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
            .value-display {
                font-size: 10px;
                color: #888;
                margin-top: 2px;
            }
            h3 {
                font-size: 14px;
                margin: 20px 0 10px 0;
                border-bottom: 1px solid var(--divider-color, #eee);
                padding-bottom: 4px;
            }
        `;
    }
}
