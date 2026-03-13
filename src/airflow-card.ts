import { LitElement, html, css, PropertyValues, SVGTemplateResult, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AirflowCardConfig, HomeAssistant } from './types.js';
import { translations } from './translations.js';
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
            entity_efficiency: 'sensor.efficiency',
            color_outdoor: '#2196F3',
            color_supply: '#4CAF50',
            color_extract: '#FFB300',
            color_exhaust: '#F44336'
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

        // Colors (Base)
        let colorSupply = this.config.color_supply || '#4CAF50'; // Green - Supply/Zuluft
        let colorExtract = this.config.color_extract || '#FFB300'; // Amber - Extract/Abluft
        let colorExhaust = this.config.color_exhaust || '#F44336'; // Red - Exhaust/Fortluft
        let colorOutdoor = this.config.color_outdoor || '#2196F3'; // Blue - Outdoor/Außenluft

        // Dynamic Temperature Colors
        if (this.config.color_mode === 'dynamic_temp') {
            const tempSupply = parseFloat(this.hass.states[this.config.entity_temp_supply]?.state || '15');
            const tempExtract = parseFloat(this.hass.states[this.config.entity_temp_extract]?.state || '15');
            const tempExhaust = parseFloat(this.hass.states[this.config.entity_temp_exhaust]?.state || '15');
            const tempOutdoor = parseFloat(this.hass.states[this.config.entity_temp_outdoor]?.state || '15');

            const baseSupply = this.config.base_color_supply || '#4CAF50';
            const baseExhaust = this.config.base_color_exhaust || '#FFB300';

            colorSupply = this._modulateColorByTemp(baseSupply, tempSupply);
            colorOutdoor = this._modulateColorByTemp(baseSupply, tempOutdoor);
            
            colorExtract = this._modulateColorByTemp(baseExhaust, tempExtract);
            colorExhaust = this._modulateColorByTemp(baseExhaust, tempExhaust);
        }

        // Bypass State
        const bypassEntity = this.config.entity_bypass;
        const bypassState = bypassEntity ? this.hass.states[bypassEntity]?.state : 'off';
        const isBypassOpen = bypassState === 'on' || bypassState === 'open' || bypassState === 'active';

        // Bypass colors are simply the unexchanged outdoor/extract colors
        // With dynamic temperature, they will already naturally reflect the bypass temp.
        const blendedFresh = isBypassOpen && this.config.color_mode !== 'dynamic_temp' ? this._blendColors(colorOutdoor, colorSupply, 0.4) : colorSupply;
        const blendedExhaust = isBypassOpen && this.config.color_mode !== 'dynamic_temp' ? this._blendColors(colorExtract, colorExhaust, 0.4) : colorExhaust;

        // Calculate dynamic speeds
        const levelEntity = this.config.entity_level;
        const levelStateRaw = levelEntity ? parseFloat(this.hass.states[levelEntity]?.state ?? '1') : 1;
        const levelState = isNaN(levelStateRaw) ? 1 : levelStateRaw;
        const min = this.config.level_min ?? 0;
        const max = this.config.level_max ?? 4;

        // Normalize level (0 to 1)
        const range = max - min;
        const normalizedLevel = range > 0 ? Math.max(0, Math.min(1, (levelState - min) / range)) : 0.5;

        // Map normalized level to durations (lower is faster)
        // Fan: 3s (slow) to 0.4s (fast)
        // Flow: 2s (slow) to 0.2s (fast)
        const fanDuration = levelState > 0 ? (3 - (normalizedLevel * 2.6)).toFixed(2) : "0";
        const flowDuration = levelState > 0 ? (2 - (normalizedLevel * 1.8)).toFixed(2) : "0";

        let lang = this.config.language;
        if (!lang || lang === 'auto') {
            lang = (this.hass.language as any) === 'de' ? 'de' : 'en';
        }
        const t = (translations as any)[lang] || translations.en;
        
        const mode = this.config.card_background_mode || 'auto';
        const isLight = mode === 'light';
        const isDark = mode === 'dark';
        const isAuto = mode === 'auto';

        // Define colors based on mode with robust fallbacks
        const cardBg = isAuto 
            ? 'var(--ha-card-background, var(--card-background-color, var(--paper-card-background-color, white)))' 
            : (isLight ? 'white' : '#1c1c1c');
        const primaryText = isAuto 
            ? 'var(--primary-text-color, var(--primary-text-color, #333))' 
            : (isLight ? '#333' : '#e1e1e1');
        const secondaryText = isAuto 
            ? 'var(--secondary-text-color, var(--secondary-text-color, #444))' 
            : (isLight ? '#444' : '#b0b0b0');
        const divider = isAuto 
            ? 'var(--divider-color, var(--divider-color, #ccc))' 
            : (isLight ? '#ccc' : '#444');
        const unitStroke = isAuto 
            ? 'var(--divider-color, var(--primary-text-color, #333))' 
            : (isLight ? '#333' : '#444');
        const primaryBg = isAuto 
            ? 'var(--primary-background-color, var(--primary-background-color, #fdfdfd))' 
            : (isLight ? '#fdfdfd' : '#2c2c2c');
        const secondaryBg = isAuto 
            ? 'var(--secondary-background-color, var(--secondary-background-color, #f0f0f0))' 
            : (isLight ? '#f0f0f0' : '#333');

        return svg`
       <svg viewBox="40 35 520 380" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" 
            style="--fan-speed: ${fanDuration}s; --flow-speed: ${flowDuration}s; --flow-display: ${flowDuration === "0" ? 'none' : 'block'};">
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
                <stop offset="100%" stop-color="${colorSupply}" />
            </linearGradient>

            <linearGradient id="gradExtractExhaust" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${colorExtract}" />
                <stop offset="100%" stop-color="${colorExhaust}" />
            </linearGradient>
         </defs>

         <!-- Main Unit Box (Now large enough to contain everything) -->
         <rect x="${cx - 250}" y="${cy - 180}" width="500" height="360" rx="15" fill="${cardBg}" stroke="${unitStroke}" stroke-width="2" filter="url(#dropShadow)" />
         
         <!-- Heat Exchanger (Diamond shape in middle) -->
         <rect x="${cx - 56.5}" y="${cy - 56.5}" width="113" height="113" transform="rotate(45 ${cx} ${cy})" fill="${primaryBg}" stroke="${divider}" stroke-width="1" />
         
         <!-- Background Ducts (Static) -->
         <!-- Path 1: Outdoor -> Supply -->
         <path d="M ${cx - 250} ${cy - 60} L ${cx - 60} ${cy - 60} L ${cx + 60} ${cy + 60} L ${cx + 250} ${cy + 60}" fill="none" stroke="${secondaryBg}" stroke-width="12" stroke-linecap="round"/>
         <!-- Bypass Duct Background (if active) -->
         ${isBypassOpen ? svg`<path d="M ${cx - 60} ${cy - 60} L ${cx - 40} ${cy - 40} L ${cx - 80} ${cy} L ${cx} ${cy + 80} L ${cx + 40} ${cy + 40} L ${cx + 60} ${cy + 60}" fill="none" stroke="${secondaryBg}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>` : ''}
         <!-- Path 2: Extract -> Exhaust -->
         <path d="M ${cx + 250} ${cy - 60} L ${cx + 60} ${cy - 60} L ${cx - 60} ${cy + 60} L ${cx - 250} ${cy + 60}" fill="none" stroke="${secondaryBg}" stroke-width="12" stroke-linecap="round"/>

         <!-- Animated Airflow Lines -->
         <!-- Path 1: Outdoor (Left Top) -> Supply (Right Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${cx - 250} ${cy - 60} L ${cx - 60} ${cy - 60} L ${cx - 40} ${cy - 40}" fill="none" stroke="${colorOutdoor}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing Stream 1 (Outdoor -> Supply) -->
         ${this.renderParticleStream(cx - 40, cy - 40, cx + 40, cy + 40, colorOutdoor, blendedFresh, flowDuration, isBypassOpen, cx, cy)}
         <!-- Exit -->
         <path class="flow-line" d="M ${cx + 40} ${cy + 40} L ${cx + 60} ${cy + 60} L ${cx + 250} ${cy + 60}" fill="none" stroke="${blendedFresh}" stroke-width="8" stroke-linecap="round" />

         <!-- Path 2: Extract (Right Top) -> Exhaust (Left Bottom) -->
         <!-- Entry -->
         <path class="flow-line" d="M ${cx + 250} ${cy - 60} L ${cx + 60} ${cy - 60} L ${cx + 40} ${cy - 40}" fill="none" stroke="${colorExtract}" stroke-width="8" stroke-linecap="round" />
         <!-- Crossing Stream 2 (Extract -> Exhaust) -->
         ${this.renderParticleStream(cx + 40, cy - 40, cx - 40, cy + 40, colorExtract, blendedExhaust, flowDuration, false, cx, cy)}
         <!-- Exit -->
         <path class="flow-line" d="M ${cx - 40} ${cy + 40} L ${cx - 60} ${cy + 60} L ${cx - 250} ${cy + 60}" fill="none" stroke="${blendedExhaust}" stroke-width="8" stroke-linecap="round" />

         <!-- Port Boxes (Label + Temperature) -->
         <!-- Top Boxes: Positioned inside the frame, above duct lines -->
         ${this.renderPortBox(cx - 230, cy - 160, t.outdoor, this.config.entity_temp_outdoor, colorOutdoor, cardBg, divider, primaryText)}
         ${this.renderEfficiency(cx - 45, cy - 160, t.efficiency, cardBg, divider, secondaryText, primaryText)}
         ${this.renderPortBox(cx + 140, cy - 160, t.extract, this.config.entity_temp_extract, colorExtract, cardBg, divider, primaryText)}
         
         <!-- Bottom Boxes: Positioned inside the frame, below duct lines -->
         ${this.renderPortBox(cx - 230, cy + 105, t.exhaust, this.config.entity_temp_exhaust, blendedExhaust, cardBg, divider, primaryText)}
         ${this.renderPortBox(cx - 45, cy + 105, t.level, this.config.entity_level, isLight ? "#444" : primaryText, cardBg, divider, primaryText)}
         ${this.renderPortBox(cx + 140, cy + 105, t.supply, this.config.entity_temp_supply, blendedFresh, cardBg, divider, primaryText)}

         <!-- Fans -->
         ${this.renderFan(cx + 150, cy + 60, this.config.entity_fan_supply, blendedFresh, fanDuration, cardBg)}
         ${this.renderFan(cx - 150, cy + 60, this.config.entity_fan_extract, blendedExhaust, fanDuration, cardBg)}
         
         <!-- Bypass (If Active) -->
         ${this.renderBypass(cx, cy)}

       </svg>
     `;
    }

    private renderPortBox(x: number, y: number, label: string, entityId: string | undefined, color: string, cardBg: string, divider: string, textColor: string): SVGTemplateResult {
        const state = entityId ? (this.hass.states[entityId]?.state ?? 'N/A') : '-';
        const unit = entityId ? (this.hass.states[entityId]?.attributes.unit_of_measurement ?? '') : '';
        const width = 90;
        const height = 55;

        return svg`
            <g transform="translate(${x}, ${y})">
                <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="${cardBg}" stroke="${divider}" stroke-width="1" />
                <text x="${width / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${color}">${label}</text>
                <text x="${width / 2}" y="42" font-size="14" text-anchor="middle" fill="${textColor}">${state}${unit}</text>
            </g>
        `;
    }

    private _blendColors(color1: string, color2: string, percentage: number): string {
        // Fallback robust hex parser
        const parseColor = (col: string) => {
            if (col.startsWith('#')) {
                let hex = col.slice(1);
                if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
                if (hex.length === 6) {
                    return {
                        r: parseInt(hex.substring(0, 2), 16) || 0,
                        g: parseInt(hex.substring(2, 4), 16) || 0,
                        b: parseInt(hex.substring(4, 6), 16) || 0
                    };
                }
            }
            return null;
        };

        const c1 = parseColor(color1);
        const c2 = parseColor(color2);

        if (c1 && c2) {
            const r = Math.round(c1.r + (c2.r - c1.r) * percentage);
            const g = Math.round(c1.g + (c2.g - c1.g) * percentage);
            const b = Math.round(c1.b + (c2.b - c1.b) * percentage);
            return `rgb(${r}, ${g}, ${b})`;
        }
        
        // Fallback for CSS variables and named colors
        return `color-mix(in srgb, ${color2} ${percentage * 100}%, ${color1})`;
    }

    private _modulateColorByTemp(baseColor: string, temp: number): string {
        const neutralTemp = this.config.temp_neutral ?? 10;
        const maxHotTemp = this.config.temp_max ?? 32.5;
        const minColdTemp = this.config.temp_min ?? -2.5;

        // Colors to mix towards
        const colorHot = this.config.color_hot || '#FF0000'; // Red
        const colorCold = this.config.color_cold || '#00BFFF'; // Deep Sky Blue

        let targetColor = baseColor;
        let diff = 0;
        let maxDiff = 1;

        if (temp > neutralTemp) {
            targetColor = colorHot;
            diff = temp - neutralTemp;
            maxDiff = maxHotTemp - neutralTemp;
        } else if (temp < neutralTemp) {
            targetColor = colorCold;
            diff = neutralTemp - temp;
            maxDiff = neutralTemp - minColdTemp;
        }

        // Calculate mixing ratio (0 = pure baseColor, 1 = pure targetColor)
        // Clamp between 0 and 1
        let ratio = diff / maxDiff;
        ratio = Math.max(0, Math.min(1, ratio));

        // Use _blendColors where percentage is the amount of color2 (baseColor)
        // We want (1 - ratio) of baseColor and (ratio) of targetColor
        return this._blendColors(targetColor, baseColor, 1 - ratio);
    }

    private renderBypass(cx: number, cy: number): SVGTemplateResult {
        // The bypass visual elements are integrated into renderDrawing directly to manage z-index
        // This function is kept for structural backward compatibility if needed, but returns empty.
        return svg``;
    }

    private renderEfficiency(x: number, y: number, label: string, cardBg: string, divider: string, secTextColor: string, textColor: string): SVGTemplateResult {
        let efficiency: string = '-';

        if (this.config.efficiency_calculation_dynamic) {
            const tSupply = this._getNumericState(this.config.entity_temp_supply);
            const tExtract = this._getNumericState(this.config.entity_temp_extract);
            const tOutdoor = this._getNumericState(this.config.entity_temp_outdoor);

            if (tSupply !== undefined && tExtract !== undefined && tOutdoor !== undefined) {
                const denom = tExtract - tOutdoor;
                if (Math.abs(denom) > 0.1) {
                    const value = ((tSupply - tOutdoor) / denom) * 100;
                    efficiency = Math.max(0, Math.min(100, Math.round(value))).toString();
                }
            }
        } else if (this.config.entity_efficiency) {
            efficiency = this.hass.states[this.config.entity_efficiency]?.state ?? '-';
        } else {
            return svg``;
        }

        const width = 90;
        const height = 55;
        return svg`
            <g transform="translate(${x}, ${y})">
                <rect x="0" y="0" width="${width}" height="${height}" rx="10" fill="${cardBg}" stroke="${divider}" stroke-width="1" />
                <text x="${width / 2}" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="${secTextColor}">${label}</text>
                <text x="${width / 2}" y="42" font-size="14" text-anchor="middle" fill="${textColor}">${efficiency}%</text>
            </g>
        `;
    }

    private renderParticleStream(
        startX: number, startY: number,
        endX: number, endY: number,
        colorStart: string, colorEnd: string,
        durationStr: string,
        isBypass: boolean, cx: number, cy: number
    ): any {
        if (durationStr === "0") return html``;
        const durSeconds = parseFloat(durationStr);
        if (isNaN(durSeconds) || durSeconds <= 0) return html``;

        const particles: any[] = [];
        const numPaths = 7;
        
        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.sqrt(dx*dx + dy*dy);
        const nx = -dy / length;
        const ny = dx / length;

        for (let p = 0; p < numPaths; p++) {
            const offset = (p - (numPaths - 1) / 2) * 4.5; 
            
            let pathData = "";
            let animDur = durSeconds;
            let currentParticlesPerPath = 4;
            
            if (isBypass) {
                const spread = 2.0; // Narrower spread for bypass
                const D = (p - (numPaths - 1) / 2) * spread;
                const M = 1.4142; // sqrt(2) for corner offsets to keep segments parallel
                
                // Entrance and exit points are staggered along the incoming/outgoing pipes
                // to provide perpendicular width to the 90 degree turn
                const p1x = cx - 40 - 0.7071 * D; 
                const p1y = cy - 40 - 0.7071 * D;
                
                // Left corner. Outward is negative X (-1, 0)
                const p2x = cx - 80 - D * M; 
                const p2y = cy; 
                
                // Bottom corner. Outward is positive Y (0, 1)
                const p3x = cx; 
                const p3y = cy + 80 + D * M;
                
                // Exit point
                const p4x = cx + 40 + 0.7071 * D; 
                const p4y = cy + 40 + 0.7071 * D;
                pathData = `M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y}`;
                // Bypass is twice the length of the straight path, so duration and particles double
                animDur = durSeconds * 2.0;
                currentParticlesPerPath = 8;
            } else {
                pathData = `M ${startX + nx * offset} ${startY + ny * offset} L ${endX + nx * offset} ${endY + ny * offset}`;
            }

            const interval = animDur / currentParticlesPerPath;
            const staggerOffset = Math.abs(p - (numPaths - 1) / 2) * (interval / numPaths) + (p % 2) * 0.1;

            for (let i = 0; i < currentParticlesPerPath; i++) {
                const delay = -(interval * i + staggerOffset).toFixed(2);
                particles.push(svg`
                    <circle cx="0" cy="0" r="2.5" fill="${colorStart}" opacity="0.8">
                        <animateMotion 
                            path="${pathData}" 
                            calcMode="paced"
                            dur="${animDur.toFixed(2)}s" 
                            begin="${delay}s" 
                            repeatCount="indefinite" />
                        ${colorStart !== colorEnd ? svg`
                        <animate 
                            attributeName="fill" 
                            values="${colorStart};${colorEnd}" 
                            dur="${animDur.toFixed(2)}s" 
                            begin="${delay}s" 
                            repeatCount="indefinite" />
                        ` : ''}
                    </circle>
                `);
            }
        }
        return particles;
    }

    private _getNumericState(entityId: string | undefined): number | undefined {
        if (!entityId) return undefined;
        const state = this.hass.states[entityId]?.state;
        if (state === undefined) return undefined;
        const value = parseFloat(state);
        return isNaN(value) ? undefined : value;
    }



    private renderFan(x: number, y: number, entityId: string | undefined, color: string, duration: string, cardBg: string): SVGTemplateResult {
        const stateObj = entityId ? this.hass.states[entityId] : undefined;
        const fanState = stateObj?.state ?? '0';
        const unit = stateObj?.attributes.unit_of_measurement ?? '';

        // Check if numeric > 0 or "on" or if duration > 0 (meaning level > 0)
        const numericState = parseFloat(fanState);
        const isSpinning = fanState === 'on' || (!isNaN(numericState) && numericState > 0) || (duration !== "0");
        const showSpeed = !isNaN(numericState) && numericState > 0;

        // Render a 3-blade fan with a central hub and speed display
        return svg`
            <g transform="translate(${x}, ${y})">
                <!-- Speed Display above fan (Hidden if 0) -->
                ${showSpeed ? svg`
                    <text x="0" y="-25" font-size="10" text-anchor="middle" fill="${color}" font-weight="bold">${fanState} RPM</text>
                ` : ''}
                
                <g>
                    ${isSpinning && duration !== "0" ? svg`
                        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="${duration}s" repeatCount="indefinite"/>
                    ` : ''}
                    <circle cx="0" cy="0" r="20" fill="${cardBg}" stroke="${color}" stroke-width="2"/>
                    <g fill="${color}" opacity="0.9">
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(120)" />
                        <path d="M0,0 C-10,-10 -12,-18 0,-18 C12,-18 10,-10 0,0 Z" transform="rotate(240)" />
                    </g>
                    <circle cx="0" cy="0" r="4" fill="${cardBg}" stroke="${color}" stroke-width="1"/>
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
      }
      .flow-line {
          stroke-dasharray: 10, 15;
          animation: flow var(--flow-speed, 0.8s) linear infinite;
          display: var(--flow-display, block);
      }
      .flow-line-inner {
          stroke-dasharray: 4, 8;
          animation: flow var(--flow-speed, 0.8s) linear infinite;
          display: var(--flow-display, block);
      }
      @keyframes flow {
          to { stroke-dashoffset: -25; }
      }
    `;
    }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'airflow-card',
    name: 'Airflow Card',
    preview: true,
    description: 'A card to visualize airflow and efficiency for ventilation systems.'
});
