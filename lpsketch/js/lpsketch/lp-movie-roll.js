const template = document.createElement("template");
template.innerHTML = `
<style>
    :host {
        display: block;
        min-height: 50px;
        height: 80px;
        max-height: 100px;
        overflow: hidden;
    }

    .movie-roll {
        display: flex;
        width: 100%;
        height: 100%;
        background: #efefef;
        white-space: nowrap;
        overflow-x: auto;
        padding: 4px 8px;
    }

    .movie-roll > * {
        flex: 0 0 auto;
    }
</style>
<div class="movie-roll"></div>
`

class LPMovieRoll extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({"mode": "open"});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._movieRoll = this._shadowRoot.querySelector(".movie-roll");
        this._activeSketchpad = null;
        this._timerId = null;
        this._loop = false;
    }

    add(lp) {
        if (lp.nodeName === "LP-SKETCHPAD") {
            const snapshot = lp.clone();
            this._movieRoll.appendChild(snapshot);
            this._setupClone(snapshot);
            for (const led of lp.grid.ledRange())
                snapshot.grid.led(led.id - 1).color = led.color;
            snapshot.onclick = () => this._activate(snapshot);
        }
    }

    insert(lp) {
        if (lp.nodeName === "LP-SKETCHPAD") {
            const snapshot = lp.clone();
            if (this._activeSketchpad)
                this._activeSketchpad.insertAdjacentElement('afterend', snapshot);
            else
                this._movieRoll.appendChild(snapshot);
            this._setupClone(snapshot);

            for (const led of lp.grid.ledRange())
                snapshot.grid.led(led.id - 1).color = led.color;

            snapshot.onclick = () => this._activate(snapshot);
            this._activate(snapshot);
        }
    }

    clear() {
        while (this._movieRoll.firstChild)
            this._movieRoll.removeChild(this._movieRoll.firstChild);
        this._activeSketchpad = null;
    }

    removeActive() {
        if (this._activeSketchpad) {
            const previousSibling = this._activeSketchpad.previousSibling;
            const nextSibling = this._activeSketchpad.nextSibling;

            this._movieRoll.removeChild(this._activeSketchpad);

            if (previousSibling?.nodeName === "LP-SKETCHPAD")
                previousSibling.click();
            else if (nextSibling?.nodeName === "LP-SKETCHPAD")
                nextSibling.click();
            else
                this._activeSketchpad = null;
        }
    }

    render(lp, sketchpad) {
        for (const led of sketchpad.grid.ledRange())
            lp.grid.led(led.id - 1).color = led.color;
    }

    updateActive(lp) {
        if (this._activeSketchpad) {
            for (const led of lp.grid.ledRange())
                this._activeSketchpad.grid.led(led.id - 1).color = led.color;
        }
    }

    play({framerate}={}) {
        if (this._movieRoll.children.length) {
            framerate ??= 2;
            framerate = Math.max(1, Math.min(60, framerate));
            this._timerId = window.setInterval(() => this.skip(), 1000 / framerate);
            this._emitPlayingChange();
        }
    }

    stop() {
        window.clearInterval(this._timerId);
        this._timerId = null;
        this._emitPlayingChange();
    }

    skip(frameCount=1) {
        if (!frameCount)
            return;

        const forward = frameCount >= 0;
        if (forward) {
            const children = Array.from(this._movieRoll.children);
            const index = children.indexOf(this._activeSketchpad);
            const newIndex = index + frameCount;
            if (children.length > newIndex)
                this._activate(children[newIndex]);
            else if (this._loop && children.length)
                this._activate(children[0])
            else
                this.stop();
        } else {
            const children = Array.from(this._movieRoll.children);
            const index = children.indexOf(this._activeSketchpad);
            const newIndex = index + frameCount;
            if (newIndex >= 0)
                this._activate(children[newIndex]);
            else
                this.stop();
        }
    }

    first() {
        this._activate(this._movieRoll.firstChild);
    }

    last() {
        this._activate(this._movieRoll.lastChild);
    }

    previous() {
        this.skip(-1);
    }

    next() {
        this.skip();
    }

    get playing() {
        return this._timerId !== null;
    }

    get frames() {
        const movieFrames = [];
        for (const child of [...this._movieRoll.children])
            if (child.nodeName === "LP-SKETCHPAD")
                movieFrames.push(child.frame);
        return movieFrames;
    }

    get loop() {
        return this._loop;
    }

    set loop(loop) {
        this._loop = loop;
    }

    _setupClone(sketchpad) {
        sketchpad.style.height = "90%";
        sketchpad.style.width = `${sketchpad.clientHeight}px`;
        sketchpad.style.marginRight = "8px";
        sketchpad.classList.add("sketchpad-mini");
    }

    _emitActiveChange(sketchpad) {
        const ev = new CustomEvent('activechange', {
            detail: { sketchpad }
        });
        this.dispatchEvent(ev);
    }

    _emitPlayingChange() {
        const ev = new CustomEvent('playingchange', {
            detail: { playing: this.playing }
        });
        this.dispatchEvent(ev);
    }

    _activate(sketchpad) {
        this._movieRoll.querySelectorAll("lp-sketchpad")
            .forEach((sketchpad) => sketchpad.outlineColor = "" );
        sketchpad.outlineColor = "green";
        if (this._activeSketchpad != sketchpad) {
            this._activeSketchpad = sketchpad;
            this._emitActiveChange(sketchpad);
        }
    }
}

window.customElements.define("lp-movie-roll", LPMovieRoll);
