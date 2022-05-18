import { Frame } from "./frame.js";
const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: block;
    }
    svg {
        width: 100%;
        height: 100%;
    }
</style>
<svg id="lp" width="510" height="510" viewBox="0 0 510 510">
    <style>
        .panel-button-icon {
            font: 40px sans-serif;
            fill: white;
            stroke: gray;
        }
        .panel-button-text {
            font: 11px sans-serif;
            fill: white;
        }
    </style>
    <defs>
        <rect id="panel-button"
                  width="40"
                  height="40"
                  style="stroke: black; stroke-width: 2; fill: black"/>
        <rect id="grid-button"
              width="40"
              height="40"/>
        <!--<pattern id="off" viewBox="0,0,10,10" width="10%" height="10%">
              <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"/>
          </pattern>-->

        <pattern id="off"
                 patternUnits="userSpaceOnUse"
                 width="10"
                 height="10">
             <rect x="6"
                   y="6"
                   width="10"
                   height="10"
                   fill="lightgray"/>
        </pattern>
    </defs>
    <rect id="outline"
          x="4"
          y="4"
          width="500"
          height="500"
          style="stroke: black; stroke-width: 4; fill: transparent"/>
    <g id="panel-row">
        <g id="up">
            <use href="#panel-button" class="panel" x="30" y="40"/>
            <path d="M 50 55 L 55 65 L 45 65 z" style="fill: #ffffff"/>
        </g>
        <g id="down">
            <use href="#panel-button" class="panel" x="80" y="40"/>
            <path d="M 95 55 L 105 55 L 100 65 z" style="fill: #ffffff"/>
        </g>
        <g id="left">
            <use href="#panel-button" class="panel" x="130" y="40"/>
            <path d="M 145 60 L 155 55 L 155 65 z" style="fill: #ffffff"/>
        </g>
        <g id="right">
            <use href="#panel-button" class="panel" x="180" y="40"/>
            <path d="M 205 60 L 195 65 L 195 55 z" style="fill: #ffffff"/>
        </g>
        <g id="session">
            <use href="#panel-button" class="panel" x="230" y="40"/>
            <text class="panel-button-text" x="231" y="63">session</text>
        </g>
        <g id="drums">
            <use href="#panel-button" class="panel" x="280" y="40"/>
            <text class="panel-button-text" x="283" y="63">drums</text>
        </g>
        <g id="keys">
            <use href="#panel-button" class="panel" x="330" y="40"/>
            <text class="panel-button-text" x="338" y="63">keys</text>
        </g>
        <g id="user">
            <use href="#panel-button" class="panel" x="380" y="40"/>
            <text class="panel-button-text" x="388" y="63">user</text>
        </g>
        <g id="logo">
            <use href="#panel-button" class="panel" x="430" y="40"/>
            <rect id="panel-button"
                      x="435"
                      y="45"
                      rx="4"
                      ry="4"
                      width="30"
                      height="30"
                      style="fill: white"/>
            <path d="M 450 48 L 455 56 L 444 50 z" style="fill: black"/>
        </g>
    </g>
    <g id="grid-row-1">
        <use href="#grid-button" class="grid" id="0x0" x="30" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x0" x="80" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x0" x="130" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x0" x="180" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x0" x="230" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x0" x="280" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x0" x="330" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x0" x="380" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-1">
            <use href="#panel-button" class="panel" x="430" y="90" style="stroke: black; stroke-width: 2; fill: transparent"/>
            <path d="M 445 105 L 455 110 L 445 115" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-2">
        <use href="#grid-button" class="grid" id="0x1" x="30" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x1" x="80" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x1" x="130" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x1" x="180" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x1" x="230" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x1" x="280" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x1" x="330" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x1" x="380" y="140" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-2" >
            <use href="#panel-button" class="panel" x="430" y="140"/>
            <path d="M 445 155 L 455 160 L 445 165" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-3">
        <use href="#grid-button" class="grid" id="0x2" x="30" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x2" x="80" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x2" x="130" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x2" x="180" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x2" x="230" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x2" x="280" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x2" x="330" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x2" x="380" y="190" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-3" >
            <use href="#panel-button" class="panel" x="430" y="190"/>
            <path d="M 445 205 L 455 210 L 445 215" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-4">
        <use href="#grid-button" class="grid" id="0x3" x="30" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x3" x="80" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x3" x="130" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x3" x="180" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x3" x="230" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x3" x="280" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x3" x="330" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x3" x="380" y="240" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-4">
            <use href="#panel-button" class="panel" x="430" y="240"/>
            <path d="M 445 255 L 455 260 L 445 265" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-5">
        <use href="#grid-button" class="grid" id="0x4" x="30" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x4" x="80" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x4" x="130" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x4" x="180" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x4" x="230" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x4" x="280" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x4" x="330" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x4" x="380" y="290" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-5">
            <use href="#panel-button" class="panel" x="430" y="290"/>
            <path d="M 445 305 L 455 310 L 445 315" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-6">
        <use href="#grid-button" class="grid" id="0x5" x="30" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x5" x="80" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x5" x="130" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x5" x="180" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x5" x="230" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x5" x="280" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x5" x="330" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x5" x="380" y="340" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-6">
            <use href="#panel-button" class="panel" x="430" y="340"/>
            <path d="M 445 355 L 455 360 L 445 365" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-7">
        <use href="#grid-button" class="grid" id="0x6" x="30" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x6" x="80" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x6" x="130" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x6" x="180" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x6" x="230" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x6" x="280" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x6" x="330" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x6" x="380" y="390" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="scene-launch-7">
            <use href="#panel-button" class="panel" x="430" y="390"/>
            <path d="M 445 405 L 455 410 L 445 415" style="stroke: #ffffff; stroke-width: 1"/>
        </g>
    </g>
    <g id="grid-row-8">
        <use href="#grid-button" class="grid" id="0x7" x="30" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="1x7" x="80" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="2x7" x="130" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="3x7" x="180" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="4x7" x="230" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="5x7" x="280" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="6x7" x="330" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <use href="#grid-button" class="grid" id="7x7" x="380" y="440" style="stroke: black; stroke-width: 2; fill: transparent"/>
        <g id="stop-mute-solo" >
            <use href="#panel-button" x="430" y="440"/>
            <text class="panel-button-text" x="435" y="452">stop</text>
            <text class="panel-button-text" x="435" y="464">mute</text>
            <text class="panel-button-text" x="435" y="476">solo</text>
        </g>
    </g>
</svg>
`

class LPSketchpad extends HTMLElement {
    constructor() {
        super();
        self._scale = 1;
        this._shadowRoot = this.attachShadow({ "mode": "open" });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._svg = this._shadowRoot.getElementById("lp");
        this._ws = null;
        this._connected = false;
        this._grid = this._createGrid();
    }

    _createGrid() {
        const grid = new Grid();
        this._svg.querySelectorAll(".grid").forEach((e) => {
            const led = new Led(e);
            grid._add(led);
        });

        return grid;
    }

    get scale() {
        return self._scale;
    }

    set scale(value) {
        self._scale = value;
        this._svg.style.width = `${parseInt(value * this._svg.getAttribute("width"))}px`
        this._svg.style.height = `${parseInt(value * this._svg.getAttribute("height"))}px`
    }

    get grid() {
        return this._grid;
    }

    get frame() {
        return new Frame({ grid: this._grid });
    }

    set frame(frame) {
        const bits = [...frame.bitRange()];
        for (const led of this._grid.ledRange()) {
            const bit = bits[led.id - 1];
            if (bit && led.name in frame.config) {
                const bitConfig = frame.config[led.name];
                led.rgb = bitConfig.lighting_data.on_state.color.rgb;
            }
        }
    }

    get connected() {
        return this._connected;
    }

    get outlineColor() {
        return this._outlineColor;
    }

    set outlineColor(value) {
        if (value === "") {
            this._svg.getElementById("outline").style.stroke = "";
            this._svg.getElementById("outline").style.strokeWidth = 4;
        } else {
            this._svg.getElementById("outline").style.stroke = value;
            this._svg.getElementById("outline").style.strokeWidth = 12;
        }
        this._outlineColor = value;
    }

    clone() {
        return this.cloneNode(true);
    }

    connect() {
        this._ws = new WebSocket("ws://localhost:7654/sync");
        this._ws.onopen = () => this._emitConnectChange({ connected: true });
        this._ws.onclose = () => this._onclose();
    }

    disconnect() {
        this._ws?.close();
    }

    _onclose() {
        this._ws = null;
        this._emitConnectChange({ connected: false });
    }

    sync() {
        this._ws?.send(this.frame.toString())
    }

    _emitConnectChange({ connected }) {
        if (connected !== this._connected) {
            this._connected = connected;
            const ev = new CustomEvent('connectchange', {
                detail: { connected }
            });
            this.dispatchEvent(ev);
        }
    }
}

class Grid {
    constructor() {
        this._leds = [];
    }

    _add(led) {
        this._leds.push(led);
    }

    led(x, y=-1) {
        var index = (y < 0) ? x : this._indexFromXy(x, y);
        return this._leds[index];
    }

    clear() {
        for (let i = 0; i < this.length; ++i)
            this.led(i).color = "";
    }

    *ledRange() {
        for (let i = 0; i < this.length; ++i)
            yield this.led(i);
    }

    get length() {
        return this._leds.length;
    }

    _indexFromXy(x, y) {
        return (y * 8) + x;
    }
}

class Led {
    constructor(ledElement) {
        this._ledElement = ledElement;
        this._color = "";
        this._highlightColor = "";
        this._resetColor();
    }

    get x() {
        return parseInt(this.name.match(/(\d+)x(\d+)/i)[1])
    }

    get y() {
        return parseInt(this.name.match(/(\d+)x(\d+)/i)[2])
    }

    get id() {
        return (this.y * 8) + this.x + 1;
    }

    get name() {
        return this._ledElement.id;
    }

    get rgb() {
        if (this.color) {
            const rgb = this._hexToRgb(this.color);
            return [ rgb.r >> 1, rgb.g >> 1, rgb.b >> 1 ];
        }
        return [0, 0, 0];
    }

    set rgb(rgb) {
        let hexString = "#";
        for (let value of rgb) {
            value = Math.min(value << 1, 255);
            const hexValue = (value).toString(16);
            hexString += hexValue.length == 1 ?
                            hexValue.padStart(2, "0") :
                            hexValue;
        }
        this.color = hexString;
    }

    get color() {
        return this._color;
    }

    set color(color) {
        if (color === "")
            this._resetColor();
        else
            this._ledElement.style.fill = color;
        this._color = color;
    }

    get highlightColor() {
        return this._highlightColor;
    }

    set highlightColor(value) {
        if (value === "")
            this._resetHighlight();
        else
            this._ledElement.style.stroke = value;
        this._highlightColor = value;
    }

    reset() {
        if (this._color) {
            this._resetColor();
            this._resetHighlight();
            this._color = "";
        }
    }

    _resetColor() {
        this._color = "";
        this._ledElement.style.fill = "url(#off)";
    }

    _resetHighlight() {
        this._highlightColor = "";
        this._ledElement.style.stroke = "black";
    }

    _hexToRgb(hex) {
        var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        return {
            r: parseInt(m[1], 16),
            g: parseInt(m[2], 16),
            b: parseInt(m[3], 16)
        };
    }

    set onclick(func) {
        this._ledElement.onclick = func;
    }
}

window.customElements.define("lp-sketchpad", LPSketchpad);
