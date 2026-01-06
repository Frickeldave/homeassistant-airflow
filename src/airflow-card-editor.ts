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
            return html`<div style="color: red; padding: 16px;">Editor Loading... (Hass: ${!!this.hass}, Config: ${!!this._config})</div>`;
        }

        return html`
            <div class="card-config">
                <div style="background: #fff3e0; padding: 12px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #ffb74d; color: #e65100; font-size: 13px;">
                    <strong>Editor Safe Mode (v2.2)</strong><br>
                    Since entity pickers failed to load, we are using stable text fields. 
                    Please enter your entity IDs manually (e.g., <em>sensor.my_temp</em>).
                </div>

                <div class="option">
                    <ha-textfield
                        label="Display Name"
                        .value=${this._config.name || ''}
                        .configValue=${'name'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>

                <h3>Temperatures (Sensors)</h3>
                <div class="grid">
                    ${this.renderTextField('entity_temp_supply', 'Supply Temp (Zuluft)')}
                    ${this.renderTextField('entity_temp_extract', 'Extract Temp (Abluft)')}
                    ${this.renderTextField('entity_temp_exhaust', 'Exhaust Temp (Fortluft)')}
                    ${this.renderTextField('entity_temp_outdoor', 'Outdoor Temp (Außenluft)')}
                </div>

                <h3>Fans & Efficiency</h3>
                <div class="grid">
                    ${this.renderTextField('entity_fan_supply', 'Supply Fan (RPM)')}
                    ${this.renderTextField('entity_fan_extract', 'Extract Fan (RPM)')}
                    ${this.renderTextField('entity_level', 'Fan Level Entity')}
                    ${this.renderTextField('entity_efficiency', 'Efficiency Entity')}
                </div>

                <div class="option">
                   ${this.renderTextField('entity_bypass', 'Bypass Entity (Optional)')}
                </div>

                <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 11px;">
                    <strong>Debug Trace (Saved Values):</strong><br>
                    Supply: ${this._config.entity_temp_supply || 'not set'}<br>
                    Extract: ${this._config.entity_temp_extract || 'not set'}<br>
                </div>
            </div>
        `;
    }

    private renderTextField(configValue: string, label: string): TemplateResult {
        return html`
            <div class="option">
                <ha-textfield
                    label="${label}"
                    .value=${(this._config as any)[configValue] || ''}
                    .configValue=${configValue}
                    @input=${this._valueChanged}
                ></ha-textfield>
            </div>
        `;
    }

    private _valueChanged(ev: any): void {
        if (!this._config || !this.hass) return;
        const target = ev.target;
        const configValue = target.configValue;
        const value = target.value;

        if ((this._config as any)[configValue] === value) return;

        const newConfig = {
            ...this._config,
            [configValue]: value,
        };

        const event = new CustomEvent('config-changed', {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    static get styles() {
        return css`
            .card-config {
                padding: 8px;
            }
            .option {
                margin-bottom: 12px;
                display: flex;
                flex-direction: column;
            }
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }
            ha-textfield {
                width: 100%;
            }
            h3 {
                font-size: 14px;
                margin: 16px 0 8px 0;
                color: var(--secondary-text-color);
                border-bottom: 1px solid #eee;
                padding-bottom: 4px;
            }
        `;
    }
}
