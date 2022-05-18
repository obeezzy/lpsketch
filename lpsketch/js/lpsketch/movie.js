import { Frame } from "./frame.js"

export class Movie {
    constructor({title, description, framerate, frames}) {
        this._title = title;
        this._description = description;
        this._framerate = parseInt(framerate);
        this._version = "0.1";
        this._frames = frames;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get framerate() {
        return this._framerate;
    }

    get frames() {
        return this._frames;
    }

    static fromJson(json) {
        return new Movie({ title: json.title,
                            description: json.description,
                            framerate: json.framerate,
                            frames: json.frames.map((frame) => Frame.fromJson(frame)) });
    }

    toJson() {
        return {
            title: this._title,
            description: this._description,
            framerate: this._framerate,
            frames: this._frames.map((frame) => frame.toJson()),
            version: this._version,
        };
    }

    toString() {
        return JSON.stringify(this.toJson());
    }
}
