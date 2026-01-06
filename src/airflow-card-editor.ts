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

        return html`
            <div class="card-config">
                <div class="option">
                    <ha-textfield
                        label="Name (Optional)"
                        .value=${this._config.name ?? ''}
                        .configValue=${'name'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
                <div class="option">
                    <ha-select
                        label="Language"
                        .value=${this._config.language ?? 'en'}
                        .configValue=${'language'}
                        @selected=${this._valueChanged}
                        @closed=${(ev: any) => ev.stopPropagation()}
                    >
                        <mwc-list-item value="en">English</mwc-list-item>
                        <mwc-list-item value="de">Deutsch</mwc-list-item>
                    </ha-select>
                </div>
                <div class="option">
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_supply || ''}
                        .configValue=${'entity_temp_supply'}
                        label="Supply Temperature (Zuluft)"
                        domain-filter="sensor"
                        @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_extract || ''}
                        .configValue=${'entity_temp_extract'}
                        label="Extract Temperature (Abluft)"
                        domain-filter="sensor"
                        @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                        .hass=${this.hass}
                        .value=${this._config.entity_temp_exhaust || ''}
                        .configValue=${'entity_temp_exhaust'}
                        label="Exhaust Temperature (Fortluft)"
                        domain-filter="sensor"
                        @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                         .hass=${this.hass}
                         .value=${this._config.entity_temp_outdoor || ''}
                         .configValue=${'entity_temp_outdoor'}
                         label="Outdoor Temperature (Außenluft)"
                         domain-filter="sensor"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <!-- Fan Sensors -->
                 <div class="option">
                    <ha-entity-picker
                         .hass=${this.hass}
                         .value=${this._config.entity_fan_supply || ''}
                         .configValue=${'entity_fan_supply'}
                         label="Supply Fan RPM (Optional)"
                         domain-filter="sensor"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-entity-picker
                         .hass=${this.hass}
                         .value=${this._config.entity_fan_extract || ''}
                         .configValue=${'entity_fan_extract'}
                         label="Extract Fan RPM (Optional)"
                         domain-filter="sensor"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                 <div class="option">
                    <ha-entity-picker
                         .hass=${this.hass}
                         .value=${this._config.entity_level || ''}
                         .configValue=${'entity_level'}
                         label="Fan Level Sensor (Optional)"
                         domain-filter="sensor"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="side-by-side">
                    <ha-textfield
                        label="Min Level"
                        type="number"
                        .value=${this._config.level_min ?? 0}
                        .configValue=${'level_min'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <ha-textfield
                        label="Max Level"
                        type="number"
                        .value=${this._config.level_max ?? 4}
                        .configValue=${'level_max'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
                  <div class="option">
                    <ha-entity-picker
                         .hass=${this.hass}
                         .value=${this._config.entity_efficiency || ''}
                         .configValue=${'entity_efficiency'}
                         label="Efficiency Sensor (Optional)"
                         domain-filter="sensor"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>
                <div class="option">
                    <ha-formfield label="Calculated Efficiency (instead of sensor)">
                        <ha-switch
                            .checked=${this._config.efficiency_calculation_dynamic}
                            .configValue=${'efficiency_calculation_dynamic'}
                            @change=${this._valueChanged}
                        ></ha-switch>
                    </ha-formfield>
                </div>
                 <div class="option">
                    <ha-entity-picker
                         .hass=${this.hass}
                         .value=${this._config.entity_bypass || ''}
                         .configValue=${'entity_bypass'}
                         label="Bypass Entity (Optional)"
                         @value-changed=${this._valueChanged}
                    ></ha-entity-picker>
                </div>

                <!-- Colors -->
                <h3>Colors</h3>
                <div class="side-by-side">
                    <ha-textfield
                        label="Outdoor Color"
                        .value=${this._config.color_outdoor ?? '#2196F3'}
                        .configValue=${'color_outdoor'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <ha-textfield
                        label="Supply Color"
                        .value=${this._config.color_supply ?? '#4CAF50'}
                        .configValue=${'color_supply'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
                <div class="side-by-side">
                    <ha-textfield
                        label="Extract Color"
                        .value=${this._config.color_extract ?? '#FFB300'}
                        .configValue=${'color_extract'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                    <ha-textfield
                        label="Exhaust Color"
                        .value=${this._config.color_exhaust ?? '#F44336'}
                        .configValue=${'color_exhaust'}
                        @input=${this._valueChanged}
                    ></ha-textfield>
                </div>
            </div>
        `;
    }

    private _valueChanged(ev: CustomEvent): void {
        if (!this._config || !this.hass) {
            return;
        }
        const target = ev.target as any;
        const configValue = target.configValue;
        let value = ev.detail?.value !== undefined ? ev.detail.value : (target.checked !== undefined ? target.checked : target.value);

        if (configValue === 'level_min' || configValue === 'level_max') {
            value = value !== '' ? Number(value) : undefined;
        }

        if (this._config[configValue as keyof AirflowCardConfig] === value) {
            return;
        }

        // Fire event to update config
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
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .option {
                display: flex;
                flex-direction: column;
            }
            ha-select {
                width: 100%;
            }
            .side-by-side {
                display: flex;
                flex-direction: row;
                gap: 8px;
            }
            .side-by-side > * {
                flex: 1;
            }
            ha-formfield {
                display: flex;
                height: 56px;
                align-items: center;
                --mdc-typography-body2-font-size: 14px;
            }
            ha-switch {
                padding: 16px;
            }
            h3 {
                margin: 16px 0 8px 0;
                font-size: 16px;
                font-weight: 500;
                color: var(--secondary-text-color);
            }
        `;
    }
}
