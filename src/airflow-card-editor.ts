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

        const colorOptions = [
            { label: 'Blue (#2196F3)', value: '#2196F3' },
            { label: 'Green (#4CAF50)', value: '#4CAF50' },
            { label: 'Amber (#FFB300)', value: '#FFB300' },
            { label: 'Red (#F44336)', value: '#F44336' },
            { label: 'Grey (#9E9E9E)', value: '#9E9E9E' },
            { label: 'Black (#000000)', value: '#000000' },
            { label: 'White (#FFFFFF)', value: '#FFFFFF' }
        ];

        // Ensure current custom colors are available in the dropdown
        this._ensureColorOption('color_outdoor', colorOptions);
        this._ensureColorOption('color_supply', colorOptions);
        this._ensureColorOption('color_extract', colorOptions);
        this._ensureColorOption('color_exhaust', colorOptions);

        return html`
            <div class="card-config">
                <div class="debug-box">
                    <strong>Editor Config:</strong><br>
                    Version: 1.5 (Level Min/Max)<br>
                </div>

                ${this.renderSelector('name', 'Name', { text: {} })}

                <h3>Temperatures</h3>
                ${this.renderSelector('entity_temp_supply', 'Supply Temperature (Zuluft)', { entity: { domain: 'sensor' } })}
                ${this.renderSelector('entity_temp_extract', 'Extract Temperature (Abluft)', { entity: { domain: 'sensor' } })}
                ${this.renderSelector('entity_temp_exhaust', 'Exhaust Temperature (Fortluft)', { entity: { domain: 'sensor' } })}
                ${this.renderSelector('entity_temp_outdoor', 'Outdoor Temperature (Außenluft)', { entity: { domain: 'sensor' } })}

                <h3>Fans & Efficiency</h3>
                ${this.renderSelector('entity_fan_supply', 'Supply Fan (RPM)', { entity: { domain: 'sensor' } })}
                ${this.renderSelector('entity_fan_extract', 'Extract Fan (RPM)', { entity: { domain: 'sensor' } })}
                ${this.renderSelector('entity_level', 'Fan Level Entity', { entity: { domain: 'sensor' } })}
                ${this.renderSelector('level_min', 'Min Level (Default: 0)', { number: { mode: "box", min: 0, max: 100 } })}
                ${this.renderSelector('level_max', 'Max Level (Default: 4)', { number: { mode: "box", min: 0, max: 100 } })}
                ${this.renderSelector('entity_efficiency', 'Efficiency Entity', { entity: { domain: 'sensor' } })}

                <h3>Bypass</h3>
                ${this.renderSelector('entity_bypass', 'Bypass Entity', { entity: { domain: ['binary_sensor', 'sensor'] } })}

                <h3>Colors</h3>
                ${this.renderSelector('color_outdoor', 'Outdoor Color', { select: { mode: 'dropdown', options: colorOptions, custom_value: true } })}
                ${this.renderSelector('color_supply', 'Supply Color', { select: { mode: 'dropdown', options: colorOptions, custom_value: true } })}
                ${this.renderSelector('color_extract', 'Extract Color', { select: { mode: 'dropdown', options: colorOptions, custom_value: true } })}
                ${this.renderSelector('color_exhaust', 'Exhaust Color', { select: { mode: 'dropdown', options: colorOptions, custom_value: true } })}

                <h3>Other</h3>
                ${this.renderSelector('efficiency_calculation_dynamic', 'Enable dynamic calculation from temperatures', { boolean: {} })}
            </div>
        `;
    }

    private _ensureColorOption(key: string, options: any[]) {
        const val = (this._config as any)[key];
        if (val && !options.some(opt => opt.value === val)) {
            options.push({ label: val, value: val });
        }
    }

    private renderSelector(key: string, label: string, selector: any): TemplateResult {
        return html`
            <div class="option">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${selector}
                    .value=${(this._config as any)[key]}
                    .label=${label}
                    @value-changed=${(e: CustomEvent) => this._updateConfig(key, e.detail.value)}
                ></ha-selector>
            </div>
        `;
    }

    private _updateConfig(key: string, value: any): void {
        if (!this._config) return;

        const newConfig = { ...this._config, [key]: value };
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
                /* font-family property is handled by HA environment mostly, but good to keep if needed */
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
