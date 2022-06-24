"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webp_1 = __importDefault(require("../webp"));
const os_1 = require("os");
class default_1 {
    constructor() {
        /**
         * Supported MimeTypes
         */
        this.supportedTypes = ['video/mp4', 'image/gif', 'image/jpeg', 'image/png'];
        this.webpmux = webp_1.default('webpmux');
        this.cwebp = webp_1.default('cwebp');
        this.git2webp = webp_1.default('gif2webp');
        /**
         * path of the file
         */
        this.path = os_1.tmpdir();
        /**
         * Processoptions to pass to ffmpeg
         */
        this.processOptions = {
            fps: 15,
            startTime: `00:00:00.0`,
            endTime: `00:00:10.0`,
            loop: 0
        };
        this.final = '';
        /**
         * MimeType of the buffer provided
         */
        this.mime = '';
        /**
         * Output options for FFMpeg
         */
        this.outputOptions = [
            `-vcodec`,
            `libwebp`,
            `-vf`,
            `crop=w='min(min(iw\,ih)\,500)':h='min(min(iw\,ih)\,500)',scale=500:500,setsar=1,fps=${this.processOptions.fps}`,
            `-loop`,
            `${this.processOptions.loop}`,
            `-ss`,
            this.processOptions.startTime,
            `-t`,
            this.processOptions.endTime,
            `-preset`,
            `default`,
            `-an`,
            `-vsync`,
            `0`,
            `-s`,
            `512:512`
        ];
    }
}
exports.default = default_1;
//# sourceMappingURL=Base.js.map