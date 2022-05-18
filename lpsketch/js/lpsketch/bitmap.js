import { Frame } from "./frame.js";

export class Bitmap {
    constructor({title, description, frame}) {
        this._title = title;
        this._description = description;
        this._version = "0.1";
        this._frame = frame;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get frame() {
        return this._frame;
    }

    static fromJson(json) {
        return new Bitmap({ title: json.title,
                            description: json.description,
                            frame: Frame.fromJson({ data: json.bitmap.data,
                                                    config: json.bitmap.config }) });
    }

    toJson() {
        return {
            title: this._title,
            description: this._description,
            bitmap: this._frame.toJson(),
            version: this._version,
        };
    }

    toString() {
        return JSON.stringify(this.toJson());
    }
}
