"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Init_1 = __importDefault(require("./Init"));
const Raw_1 = require("../Raw");
class Exif extends Init_1.default {
    constructor() {
        super(...arguments);
        this.createExif = Raw_1.createExif;
    }
    /**
     * Sets pack author
     * @param author
     */
    setAuthor(author) {
        if (this.config)
            this.config.author = author;
        else
            this.config = { author };
    }
    /**
     * Sets packname
     * @param pack
     */
    setPack(pack) {
        if (this.config)
            this.config.pack = pack;
        else
            this.config = { pack };
    }
    /**
     * Adds metadata to the webp
     * @param filename
     */
    addMetadata(filename) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exec(`${this.webpmux} -set exif ${this.createExif(((_a = this.config) === null || _a === void 0 ? void 0 : _a.pack) || 'WSF', ((_b = this.config) === null || _b === void 0 ? void 0 : _b.author) || 'Made Using', `${this.path}/${Math.random().toString(36)}`)} ${filename} -o ${filename}`);
        });
    }
}
exports.default = Exif;
//# sourceMappingURL=Exif.js.map