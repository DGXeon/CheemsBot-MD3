"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
class Init extends Base_1.default {
    /**
     * Creates a new instance of the this Class
     * @param data
     * @param param1
     */
    constructor(image, config) {
        super();
        this.exec = util_1.default.promisify(child_process_1.exec);
        this.config = config
            ? config
            : {
                pack: 'Made Using',
                author: 'Wa Sticker Formatter',
                crop: true
            };
        this.data = image;
    }
}
exports.default = Init;
//# sourceMappingURL=Init.js.map