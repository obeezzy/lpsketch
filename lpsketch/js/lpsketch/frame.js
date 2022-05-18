export class Frame {
    constructor({ data, config, grid }) {
        this._data = data ?? [];
        this._config = config ?? {};
        if (grid)
            this._load(grid);
    }

    get data() {
        return this._data;
    }

    get config() {
        return this._config;
    }

    *bitRange() {
        for (const rowData of this._data) {
            let bitmask = 1;
            for (let i = 0; i < 8; ++i) {
                const bit = rowData & bitmask;
                yield bit;
                bitmask <<= 1;
            }
        }
    }

    static fromJson(json) {
        return new Frame({ data: json.data,
                            config: json.config });
    }

    toJson() {
        let config = {}
        for (let key in this._config)
            config = Object.assign({}, config, this._config[key].toJson());
        return {
            data: this._data,
            config
        };
    }

    toString() {
        return JSON.stringify(this.toJson());
    }

    _load(grid) {
        // Little endian
        let position = 0;
        let word = 0;
        for (const led of grid.ledRange()) {
            const bit = !!led.color ? 1 : 0;
            if (bit)
                this._config[led.name] = new BitConfig(led);
            word |= (bit ? (bit << position) : 0);
            position++;

            if (position > 7) {
                this._data.push(word);
                position = 0;
                word = 0;
            }
        }
    }
}

class BitConfig {
    constructor(led) {
        this._led = led;
    }

    get name() {
        return this._led.name;
    }

    toJson() {
        return {
            [this._led.name]: {
                lighting_type: "rgb",
                lighting_data: {
                    on_state: {
                        color: {
                            rgb: this._led.rgb
                        }
                    },
                    off_state: {
                        color: {
                            rgb: [0, 0, 0]
                        }
                    }
                }
            }
        };
    }

    toString() {
        return JSON.stringify(this.toJson());
    }
}
