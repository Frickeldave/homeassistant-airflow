import { LitElement, html, css, PropertyValues, SVGTemplateResult, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AirflowCardConfig, HomeAssistant } from './types.js';
import './airflow-card-editor.js'; // Register editor

@customElement('airflow-card')
export class AirflowCard extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private config!: AirflowCardConfig;

    public setConfig(config: AirflowCardConfig): void {
        if (!config.entity_temp_supply || !config.entity_temp_extract) {
            // In strict mode we might throw, but for now we just accept what we have
            // throw new Error("Invalid configuration");
        }
        this.config = config;
    }

    public static getConfigElement() {
        return document.createElement('airflow-card-editor');
    }

    static getStubConfig() {
        return {
            entity_temp_supply: 'sensor.supply_temp',
            entity_temp_extract: 'sensor.extract_temp',
            entity_temp_outdoor: 'sensor.outdoor_temp',
            entity_temp_exhaust: 'sensor.exhaust_temp'
        }
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        // Only update if config or specific entities change
        // For simplicity, we update on any change for now, can optimize later
        return true;
    }

    protected render() {
        if (!this.config || !this.hass) {
            return html``;
        }

        return html`
      <ha-card .header=${this.config.name}>
        <div class="card-content">
          <div class="drawing-container">
            ${this.renderDrawing()}
          </div>
          ${this.renderInfo()}
        </div>
      </ha-card>
    `;
    }

    private renderDrawing(): SVGTemplateResult {
        const width = 600;
        const height = 450;

        // Coordinates
        const cx = width / 2;
        const cy = height / 2;
        // const boxSize = 100; // This variable is no longer used, but keeping it for now if it's not explicitly removed.

        // Colors
        const colorFresh = '#4CAF50'; // Green - Supply/Zuluft
        const colorStale = '#FFC107'; // Amber - Extract/Abluft
        const colorExhaust = '#F44336'; // Red - Exhaust/Fortluft
        const colorOutdoor = '#2196F3'; // Blue - Outdoor/Außenluft

        return svg`
       <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feFlood flood-color="rgba(0,0,0,0.2)"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Fan Animation -->
            <style>
                .fan-spin { animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            </style>
         </defs>

         <!-- Main Unit Box -->
         <rect x="${cx - 180}" y="${cy - 120}" width="360" height="240" rx="12" fill="white" stroke="#333" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <path d="M ${cx} ${cy - 80} L ${cx + 80} ${cy} L ${cx} ${cy + 80} L ${cx - 80} ${cy} Z" fill="#eee" stroke="#999" stroke-width="2" />
         
         <!-- Ducts & Arrows -->
         <!-- Outdoor (Left Top) -> Heat Exchanger -->
         <path d="M ${cx - 200} ${cy - 60} L ${cx - 60} ${cy - 60} L ${cx - 50} ${cy - 40}" fill="none" stroke="${colorOutdoor}" stroke-width="10" />
         
         <!-- Supply (Right Bottom) <- Heat Exchanger -->
         <path d="M ${cx + 50} ${cy + 40} L ${cx + 60} ${cy + 60} L ${cx + 200} ${cy + 60}" fill="none" stroke="${colorFresh}" stroke-width="10" />

         <!-- Extract (Right Top) -> Heat Exchanger -->
         <path d="M ${cx + 200} ${cy - 60} L ${cx + 60} ${cy - 60} L ${cx + 50} ${cy - 40}" fill="none" stroke="${colorStale}" stroke-width="10" />

         <!-- Exhaust (Left Bottom) <- Heat Exchanger -->
         <path d="M ${cx - 50} ${cy + 40} L ${cx - 60} ${cy + 60} L ${cx - 200} ${cy + 60}" fill="none" stroke="${colorExhaust}" stroke-width="10" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned above the ducts (y < cy-60) -->
         ${this.renderPortBox(cx - 180, cy - 130, "Outdoor", this.config.entity_temp_outdoor, colorOutdoor)}
         ${this.renderPortBox(cx + 90, cy - 130, "Extract", this.config.entity_temp_extract, colorStale)}
         
         <!-- Bottom Boxes: Positioned below the ducts (y > cy+60) -->
         ${this.renderPortBox(cx + 90, cy + 75, "Supply", this.config.entity_temp_supply, colorFresh)}
         ${this.renderPortBox(cx - 180, cy + 75, "Exhaust", this.config.entity_temp_exhaust, colorExhaust)}

         <!-- Fans -->
         ${this.renderFan(cx + 120, cy + 60, this.config.entity_fan_supply, colorFresh)}
         ${this.renderFan(cx - 120, cy + 60, this.config.entity_fan_extract, colorExhaust)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(cx, cy)}

         <!-- Efficiency Text (Center) -->
         <rect x="${cx - 25}" y="${cy - 15}" width="50" height="30" fill="white" opacity="0.8" rx="5" />
         ${this.renderEfficiency(cx, cy)}

       </svg>
     `;
    }

    private renderPortBox(x: number, y: number, label: string, entityId: string | undefined, color: string): SVGTemplateResult {
        const state = entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '-';
        const unit = entityId ? (this.hass.states[entityId]?.attributes.unit_of_measurement ?? '°C') : '';
        const width = 90;
        const height = 55;

        return svg`
            <g transform="translate(${x}, ${y})">
                <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${width / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${color}">${label}</text>
                <text x="${width / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${state}${unit}</text>
            </g>
        `;
    }

    private renderBypass(cx: number, cy: number): SVGTemplateResult {
        if (!this.config.entity_bypass) return svg``;

        const state = this.hass.states[this.config.entity_bypass]?.state;
        const isOpen = state === 'on' || state === 'open' || state === 'active';

        if (!isOpen) return svg``;

        // Bypass: Outdoor (Top Left) -> Supply (Bottom Right)
        // Draw a cubic bezier S-curve across the center
        return svg`
            <path d="M ${cx - 60} ${cy - 40} C ${cx - 10} ${cy - 40}, ${cx + 10} ${cy + 40}, ${cx + 60} ${cy + 40}" fill="none" stroke="#2196F3" stroke-width="4" stroke-dasharray="5,5" />
            <text x="${cx}" y="${cy}" font-size="10" text-anchor="middle" fill="#2196F3" dy="-5">BYPASS</text>
        `;
    }

    private renderEfficiency(cx: number, cy: number): SVGTemplateResult {
        if (!this.config.entity_efficiency) return svg``;
        const state = this.hass.states[this.config.entity_efficiency]?.state ?? '-';
        return svg`
            <text x="${cx}" y="${cy}" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#444">${state}%</text>
            <text x="${cx}" y="${cy + 15}" font-size="8" text-anchor="middle" fill="#666">Efficiency</text>
        `;
    }

    private renderFan(x: number, y: number, entityId: string | undefined, color: string): SVGTemplateResult {
        const fanState = entityId ? this.hass.states[entityId]?.state : '0';
        // Check if numeric > 0 or "on"
        const isSpinning = fanState === 'on' || (parseFloat(fanState) > 0);

        // Dynamic speed based on RPM could be added here, for now just spin
        // We separate translation (SVG attribute) and rotation (CSS) to avoid conflicts
        // Inner group spins around its center (0,0)
        return svg`
            <g transform="translate(${x}, ${y})">
                <g class="${isSpinning ? 'fan-spin' : ''}" style="transform-origin: 0 0;">
                    <circle cx="0" cy="0" r="20" fill="white" stroke="${color}" stroke-width="2"/>
                    <path d="M 0 -18 L 10 -10 L 18 0 L 10 10 L 0 18 L -10 10 L -18 0 L -10 -10 Z" fill="${color}" opacity="0.7"/>
                </g>
            </g>
        `;
    }

    private renderTemp(x: number, y: number, entityId: string | undefined): SVGTemplateResult {
        const state = entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '-';
        const unit = entityId ? (this.hass.states[entityId]?.attributes.unit_of_measurement ?? '°C') : '';
        return svg`
            <text x="${x}" y="${y}" font-size="14" text-anchor="middle" fill="#333">${state}${unit}</text>
        `;
    }

    private renderInfo() {
        // Helper to safely get state
        const getState = (entityId: string | undefined) => {
            return entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '-';
        };

        return html`
          <div class="stats">
              <div>Supply: ${getState(this.config.entity_temp_supply)}°C</div>
              <div>Extract: ${getState(this.config.entity_temp_extract)}°C</div>
              <div>Outdoor: ${getState(this.config.entity_temp_outdoor)}°C</div>
              <div>Exhaust: ${getState(this.config.entity_temp_exhaust)}°C</div>
          </div>
      `;
    }

    static get styles() {
        return css`
      .card-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
      }
      .drawing-container {
        width: 100%;
        max-width: 500px;
        margin-bottom: 16px;
      }
      .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 100%;
          font-size: 0.9em;
      }
    `;
    }
}
