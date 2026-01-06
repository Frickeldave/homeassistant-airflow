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
                <div style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border-radius: 8px; color: #333;">
                    <strong>Editor Debug Info:</strong><br>
                    Version: 1.2 (Manual Components)<br>
                    Config Name: ${this._config.name || 'None'}
                </div>

                <div class="option">
                    <ha-textfield
                        label="Name"
                        .value=${this._config.name || ''}
                        .configValue=${'name'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>

                <div class="option">
                    <p>Supply Temperature (Zuluft)</p>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_supply || ''}
                        .configValue=${'entity_temp_supply'}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="option">
                    <p>Extract Temperature (Abluft)</p>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_extract || ''}
                        .configValue=${'entity_temp_extract'}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="option">
                    <p>Exhaust Temperature (Fortluft)</p>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_exhaust || ''}
                        .configValue=${'entity_temp_exhaust'}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="option">
                    <p>Outdoor Temperature (Außenluft)</p>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_outdoor || ''}
                        .configValue=${'entity_temp_outdoor'}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>

                <div class="option">
                    <p>Bypass Entity (Optional)</p>
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_bypass || ''}
                        .configValue=${'entity_bypass'}
                        @value-changed=${this._valueChanged}
                        allow-custom-entity
                    ></ha-entity-picker>
                </div>
            </div>
        `;
    }

    private _valueChanged(ev: any): void {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target;
        const configValue = target.configValue;
        const value = ev.detail?.value !== undefined ? ev.detail.value : target.value;

        if (this._config[configValue as keyof AirflowCardConfig] === value) {
            return;
        }

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
                padding: 16px;
            }
            .option {
                margin-bottom: 16px;
                display: flex;
                flex-direction: column;
            }
            .option p {
                margin: 0 0 4px 0;
                font-size: 14px;
                color: var(--secondary-text-color);
            }
            ha-textfield, ha-entity-picker {
                width: 100%;
            }
        `;
    }
}
