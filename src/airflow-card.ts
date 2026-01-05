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
        const width = 500;
        const height = 300;

        // Coordinates
        const cx = width / 2;
        const cy = height / 2;
        const boxSize = 100;

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
                .fan-spin { transform-origin: center; animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            </style>
         </defs>

         <!-- Main Unit Box -->
         <rect x="${cx - 150}" y="${cy - 100}" width="300" height="200" rx="10" fill="white" stroke="#333" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <path d="M ${cx} ${cy-70} L ${cx+70} ${cy} L ${cx} ${cy+70} L ${cx-70} ${cy} Z" fill="#eee" stroke="#999" stroke-width="2" />
         
         <!-- Ducts & Arrows -->
         <!-- Outdoor (Left Bottom) -> Heat Exchanger -->
         <path d="M ${cx-150} ${cy+50} L ${cx-70} ${cy+50} L ${cx-50} ${cy+30}" fill="none" stroke="${colorOutdoor}" stroke-width="8" />
         <text x="${cx-130}" y="${cy+80}" fill="${colorOutdoor}" font-size="12">Outdoor</text>
         
         <!-- Supply (Right Bottom) <- Heat Exchanger -->
         <path d="M ${cx+50} ${cy+30} L ${cx+70} ${cy+50} L ${cx+150} ${cy+50}" fill="none" stroke="${colorFresh}" stroke-width="8" />
         <text x="${cx+100}" y="${cy+80}" fill="${colorFresh}" font-size="12">Supply</text>

         <!-- Extract (Right Top) -> Heat Exchanger -->
         <path d="M ${cx+150} ${cy-50} L ${cx+70} ${cy-50} L ${cx+50} ${cy-30}" fill="none" stroke="${colorStale}" stroke-width="8" />
         <text x="${cx+100}" y="${cy-80}" fill="${colorStale}" font-size="12">Extract</text>

         <!-- Exhaust (Left Top) <- Heat Exchanger -->
         <path d="M ${cx-50} ${cy-30} L ${cx-70} ${cy-50} L ${cx-150} ${cy-50}" fill="none" stroke="${colorExhaust}" stroke-width="8" />
         <text x="${cx-130}" y="${cy-80}" fill="${colorExhaust}" font-size="12">Exhaust</text>

         <!-- Fans -->
         ${this.renderFan(cx + 100, cy + 50, this.config.entity_fan_supply, colorFresh)}
         ${this.renderFan(cx - 100, cy - 50, this.config.entity_fan_extract, colorExhaust)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(cx, cy)}

         <!-- Efficiency Text (Center) -->
         ${this.renderEfficiency(cx, cy)}

         <!-- Overlay Text (Temperatures) -->
         ${this.renderTemp(cx-110, cy+40, this.config.entity_temp_outdoor)}
         ${this.renderTemp(cx+110, cy+40, this.config.entity_temp_supply)}
         ${this.renderTemp(cx+110, cy-60, this.config.entity_temp_extract)}
         ${this.renderTemp(cx-110, cy-60, this.config.entity_temp_exhaust)}

       </svg>
     `;
    }

    private renderBypass(cx: number, cy: number): SVGTemplateResult {
        if (!this.config.entity_bypass) return svg``;

        const state = this.hass.states[this.config.entity_bypass]?.state;
        const isOpen = state === 'on' || state === 'open' || state === 'active';

        if (!isOpen) return svg``;

        // Draw a path bypassing the heat exchanger (conceptual)
        // From outdoor (left bottom) to Supply (right bottom) directly? 
        // Or usually it bypasses the heat recovery for the supply air.
        // Let's draw a curved arrow over the diamond
        return svg`
            <path d="M ${cx-60} ${cy+40} Q ${cx} ${cy+90} ${cx+60} ${cy+40}" fill="none" stroke="#2196F3" stroke-width="4" stroke-dasharray="5,5" />
            <text x="${cx}" y="${cy+80}" font-size="10" text-anchor="middle" fill="#2196F3">BYPASS</text>
        `;
    }

    private renderEfficiency(cx: number, cy: number): SVGTemplateResult {
        if (!this.config.entity_efficiency) return svg``;
        const state = this.hass.states[this.config.entity_efficiency]?.state ?? '-';
        return svg`
            <text x="${cx}" y="${cy}" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#444">${state}%</text>
            <text x="${cx}" y="${cy+15}" font-size="8" text-anchor="middle" fill="#666">Efficiency</text>
        `;
    }

    private renderFan(x: number, y: number, entityId: string | undefined, color: string): SVGTemplateResult {
        const fanState = entityId ? this.hass.states[entityId]?.state : '0';
        // Check if numeric > 0 or "on"
        const isSpinning = fanState === 'on' || (parseFloat(fanState) > 0);

        // Dynamic speed based on RPM could be added here, for now just spin
        return svg`
            <g transform="translate(${x}, ${y})" class="${isSpinning ? 'fan-spin' : ''}">
                <circle cx="0" cy="0" r="20" fill="white" stroke="${color}" stroke-width="2"/>
                <path d="M 0 -18 L 10 -10 L 18 0 L 10 10 L 0 18 L -10 10 L -18 0 L -10 -10 Z" fill="${color}" opacity="0.7"/>
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
