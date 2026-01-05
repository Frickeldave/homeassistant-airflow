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
            entity_temp_exhaust: 'sensor.exhaust_temp',
            entity_level: 'sensor.fan_level',
            level_min: 0,
            level_max: 4,
            entity_efficiency: 'sensor.efficiency'
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

        // Calculate dynamic speeds
        const levelEntity = this.config.entity_level;
        const levelState = levelEntity ? parseFloat(this.hass.states[levelEntity]?.state ?? '0') : 1;
        const min = this.config.level_min ?? 0;
        const max = this.config.level_max ?? 4;

        // Normalize level (0 to 1)
        const range = max - min;
        const normalizedLevel = range > 0 ? Math.max(0, Math.min(1, (levelState - min) / range)) : 0.5;

        // Map normalized level to durations (lower is faster)
        // Fan: 3s (slow) to 0.4s (fast)
        // Flow: 2s (slow) to 0.2s (fast)
        const fanDuration = levelState > 0 ? (3 - (normalizedLevel * 2.6)).toFixed(2) : 0;
        const flowDuration = levelState > 0 ? (2 - (normalizedLevel * 1.8)).toFixed(2) : 0;

        return svg`
       <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${fanDuration}s; --flow-speed: ${flowDuration}s;">
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

            <linearGradient id="gradOutdoorSupply" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${colorOutdoor}" />
                <stop offset="100%" stop-color="${colorFresh}" />
            </linearGradient>

            <linearGradient id="gradExtractExhaust" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${colorStale}" />
                <stop offset="100%" stop-color="${colorExhaust}" />
            </linearGradient>
            
            <!-- Fan Animation -->
            <style>
                .fan-spin { 
                    animation: spin var(--fan-speed, 2s) linear infinite;
                    animation-play-state: ${fanDuration === 0 ? 'paused' : 'running'};
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                
                .flow-line {
                    stroke-dasharray: 10, 15;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${flowDuration === 0 ? 'none' : 'block'};
                }
                .flow-line-inner {
                    stroke-dasharray: 4, 8;
                    animation: flow var(--flow-speed, 0.8s) linear infinite;
                    display: ${flowDuration === 0 ? 'none' : 'block'};
                }
                @keyframes flow {
                    to { stroke-dashoffset: -25; }
                }
            </style>
         </defs>

         <!-- Main Unit Box (Now large enough to contain everything) -->
         <rect x="${cx - 250}" y="${cy - 180}" width="500" height="360" rx="15" fill="white" stroke="#333" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <path d="M ${cx} ${cy - 80} L ${cx + 80} ${cy} L ${cx} ${cy + 80} L ${cx - 80} ${cy} Z" fill="#fdfdfd" stroke="#ccc" stroke-width="1" />
         
         <!-- Background Ducts (Static) -->
         <!-- Path 1: Outdoor -> Supply -->
         <path d="M ${cx - 250} ${cy - 60} L ${cx - 60} ${cy - 60} L ${cx + 60} ${cy + 60} L ${cx + 250} ${cy + 60}" fill="none" stroke="#f0f0f0" stroke-width="12" stroke-linecap="round"/>
         <!-- Path 2: Extract -> Exhaust -->
         <path d="M ${cx + 250} ${cy - 60} L ${cx + 60} ${cy - 60} L ${cx - 60} ${cy + 60} L ${cx - 250} ${cy + 60}" fill="none" stroke="#f0f0f0" stroke-width="12" stroke-linecap="round"/>

         <!-- Animated Airflow Lines -->
         <!-- Path 1: Outdoor (Left Top) -> Supply (Right Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${cx - 250} ${cy - 60} L ${cx - 60} ${cy - 60} L ${cx - 40} ${cy - 40}" fill="none" stroke="${colorOutdoor}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${cx - 40} ${cy - 40} L ${cx + 40} ${cy + 40}" fill="none" stroke="url(#gradOutdoorSupply)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${cx + 40} ${cy + 40} L ${cx + 60} ${cy + 60} L ${cx + 250} ${cy + 60}" fill="none" stroke="${colorFresh}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${cx + 250} ${cy - 60} L ${cx + 60} ${cy - 60} L ${cx + 40} ${cy - 40}" fill="none" stroke="${colorStale}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing (Inside Heat Exchanger) - Thinner at 45 deg with Gradient -->
         <path class="flow-line-inner" d="M ${cx + 40} ${cy - 40} L ${cx - 40} ${cy + 40}" fill="none" stroke="url(#gradExtractExhaust)" stroke-width="4" stroke-linecap="round" opacity="0.8" />
         <!-- Exit -->
         <path class="flow-line" d="M ${cx - 40} ${cy + 40} L ${cx - 60} ${cy + 60} L ${cx - 250} ${cy + 60}" fill="none" stroke="${colorExhaust}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(cx - 230, cy - 160, "Outdoor", this.config.entity_temp_outdoor, colorOutdoor)}
         ${this.renderEfficiency(cx - 45, cy - 160)}
         ${this.renderPortBox(cx + 140, cy - 160, "Extract", this.config.entity_temp_extract, colorStale)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(cx - 230, cy + 105, "Exhaust", this.config.entity_temp_exhaust, colorExhaust)}
         ${this.renderLevel(cx - 45, cy + 105)}
         ${this.renderPortBox(cx + 140, cy + 105, "Supply", this.config.entity_temp_supply, colorFresh)}

         <!-- Fans -->
         ${this.renderFan(cx + 150, cy + 60, this.config.entity_fan_supply, colorFresh)}
         ${this.renderFan(cx - 150, cy + 60, this.config.entity_fan_extract, colorExhaust)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(cx, cy)}



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

    private renderEfficiency(x: number, y: number): SVGTemplateResult {
        if (!this.config.entity_efficiency) return svg``;
        const state = this.hass.states[this.config.entity_efficiency]?.state ?? '-';
        const width = 90;
        const height = 55;
        return svg`
            <g transform="translate(${x}, ${y})">
                <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${width / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">Effizienz</text>
                <text x="${width / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${state}%</text>
            </g>
        `;
    }

    private renderLevel(x: number, y: number): SVGTemplateResult {
        if (!this.config.entity_level) return svg``;
        const state = this.hass.states[this.config.entity_level]?.state ?? '-';
        const width = 90;
        const height = 55;
        return svg`
            <g transform="translate(${x}, ${y})">
                <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="white" stroke="black" stroke-width="1" />
                <text x="${width / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#444">Stufe</text>
                <text x="${width / 2}" y="42" font-size="14" text-anchor="middle" fill="#333">${state}</text>
            </g>
        `;
    }

    private renderFan(x: number, y: number, entityId: string | undefined, color: string): SVGTemplateResult {
        const stateObj = entityId ? this.hass.states[entityId] : undefined;
        const fanState = stateObj?.state ?? '0';
        const unit = stateObj?.attributes.unit_of_measurement ?? '';

        // Check if numeric > 0 or "on"
        const numericState = parseFloat(fanState);
        const isSpinning = fanState === 'on' || (numericState > 0);
        const showSpeed = !isNaN(numericState) && numericState > 0;

        // Render a 3-blade fan with a central hub and speed display
        return svg`
            <g transform="translate(${x}, ${y})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${showSpeed ? svg`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${color}" font-weight="bold">${fanState} RPM</text>
                ` : ''}
                
                <g class="${isSpinning ? 'fan-spin' : ''}" style="transform-origin: 0 0;">
                    <circle cx="0" cy="0" r="20" fill="white" stroke="${color}" stroke-width="2"/>
                    <g fill="${color}" opacity="0.9">
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(120)" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(240)" />
                    </g>
                    <circle cx="0" cy="0" r="4" fill="white" stroke="${color}" stroke-width="1"/>
                </g>
            </g>
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

    `;
    }
}
