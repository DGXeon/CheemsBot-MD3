"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Exif_1 = __importDefault(require("./Exif"));
const fs = __importStar(require("fs-extra"));
const axios_1 = __importDefault(require("axios"));
const file_type_1 = require("file-type");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const streamifier = __importStar(require("streamifier"));
const gif_frames_1 = __importDefault(require("gif-frames"));
const image_size_1 = __importDefault(require("image-size"));
const Jimp = __importStar(require("jimp"));
class Build extends Exif_1.default {
    /**
     * Builds sticker
     * @param processOptions
     */
    build(processOptions = this.processOptions) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.processOptions = processOptions;
            if (typeof this.data === 'string') {
                if (this.data.startsWith('./')) {
                    if (!fs.existsSync(this.data))
                        throw new Error(`${this.data} filepath does not exist`);
                    this.data = yield fs.readFile(this.data);
                }
                else {
                    this.data = (yield axios_1.default.get(this.data, { responseType: 'arraybuffer' })).data;
                }
            }
            const mime = (_a = (yield file_type_1.fromBuffer(this.data))) === null || _a === void 0 ? void 0 : _a.mime;
            if (!mime)
                throw new Error('Invalid Input');
            this.mime = mime;
            if ((this.mime === 'image/gif' || this.mime === 'video/mp4') && this.config)
                this.config.animated = true;
            if (!((_b = this.config) === null || _b === void 0 ? void 0 : _b.animated)) {
                const file = !((_c = this.config) === null || _c === void 0 ? void 0 : _c.crop) ? yield this.staticNoCrop() : yield this.static();
                yield this.addMetadata(file);
                this.final = file;
            }
            if ((_d = this.config) === null || _d === void 0 ? void 0 : _d.animated) {
                const file = !this.config.crop ? yield this.animatedNoCrop() : yield this.animated();
                yield this.addMetadata(file);
                this.final = file;
                return;
            }
        });
    }
    /**
     * @returns {string} Filename
     */
    animated() {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = `${this.path}/${Math.random().toString()}`;
            const stream = yield streamifier.createReadStream(this.data);
            yield new Promise((resolve, reject) => {
                fluent_ffmpeg_1.default(stream)
                    .inputFormat(this.mime === this.supportedTypes[1] ? 'gif' : 'mp4')
                    .on('error', function (err) {
                    reject(err);
                })
                    .addOutputOptions(this.outputOptions)
                    .toFormat('webp')
                    .on('end', () => {
                    resolve(true);
                })
                    .saveToFile(`${filename}.webp`);
            });
            return `${filename}.webp`;
        });
    }
    /**
     * Creates animated sticker without with transparant borders
     * @returns {string} Filename
     */
    animatedNoCrop() {
        return __awaiter(this, void 0, void 0, function* () {
            const rn = Math.random();
            const fileName = `${this.path}/${rn.toString(36)}`;
            const fileNameF = `${this.path}/${rn.toString(36)}`;
            const sv = `${fileName}${this.mime === this.supportedTypes[0] ? '.mp4' : '.gif'}`;
            yield fs.writeFile(sv, this.data);
            if (this.mime === this.supportedTypes[0])
                yield this.exec(`ffmpeg -y -i ${fileName}.mp4 ${fileName}.gif`, {});
            let frames = [];
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            yield gif_frames_1.default({ url: fileName + '.gif', frames: 'all' }).then(function (frameData) {
                frameData[0].getImage().pipe(fs.createWriteStream(fileName + '.png'));
                frames = frameData;
            });
            if (frames.length < 7)
                yield this.exec('convert ' + fileName + '.gif ' + fileName + '.gif  ' + fileName + '.gif', {});
            yield this.exec('convert ' + fileName + '.gif -coalesce -delete 0 ' + fileName + '.gif', {});
            const dimensions = image_size_1.default(fileName + '.gif');
            let success = true;
            let colors;
            while (success) {
                yield Jimp.read(fileName + '.png')
                    .then((image) => {
                    for (let i = 1; i < ((dimensions === null || dimensions === void 0 ? void 0 : dimensions.width) ? dimensions.width : 1); i++) {
                        for (let j = 1; j < ((dimensions === null || dimensions === void 0 ? void 0 : dimensions.height) ? dimensions.height : 1); j++) {
                            colors = Jimp.intToRGBA(image.getPixelColor(i, j));
                            if (colors.r > 155) {
                                colors.r = colors.r - 5;
                            }
                            else {
                                colors.r = colors.r + 5;
                            }
                            if (colors.g > 155) {
                                colors.g = colors.g - 5;
                            }
                            else {
                                colors.g = colors.g + 5;
                            }
                            if (colors.b > 155) {
                                colors.b = colors.b - 5;
                            }
                            else {
                                colors.b = colors.b + 5;
                            }
                            if (colors.a > 155) {
                                colors.a = colors.a - 5;
                            }
                            else {
                                colors.a = colors.a + 5;
                            }
                            const hex = Jimp.rgbaToInt(colors.r, colors.g, colors.b, colors.a);
                            image.setPixelColor(hex, i, j);
                            success = false;
                        }
                    }
                    image.write(fileNameF + '.png');
                })
                    .catch((err) => {
                    throw new Error(err.message);
                });
            }
            if (dimensions.width && dimensions.height && dimensions.width < dimensions.height) {
                yield this.exec('mogrify -bordercolor transparent -border ' +
                    (dimensions.height - dimensions.width) / 2 +
                    'x0 ' +
                    fileName +
                    '.gif', {});
                yield this.exec('mogrify -bordercolor transparent -border ' +
                    (dimensions.height - dimensions.width) / 2 +
                    'x0 ' +
                    fileNameF +
                    '.png', {});
            }
            if (dimensions.width && dimensions.height && dimensions.width > dimensions.height) {
                yield this.exec('mogrify -bordercolor transparent -border 0x' +
                    (dimensions.width - dimensions.height) / 2 +
                    ` ${fileName}.gif`, {});
                yield this.exec('mogrify -bordercolor transparent -border 0x' +
                    (dimensions.width - dimensions.height) / 2 +
                    ` ${fileNameF}.png`, {});
            }
            yield this.exec('convert ' + fileNameF + '.png ' + fileName + '.gif -resize 256x256 ' + fileName + '.gif', {});
            yield this.exec(`${this.git2webp} ${fileName}.gif -o ${fileName}.webp`);
            return `${fileName}.webp`;
        });
    }
    /**
     * Creates Static sticker
     * @returns {string} Filename
     */
    static() {
        return __awaiter(this, void 0, void 0, function* () {
            const file = `${this.path}/${Math.random().toString()}`;
            fs.writeFileSync(`${file}.png`, this.data);
            yield this.exec(`${this.cwebp} ${file}.png -o ${file}.webp`);
            return `${file}.webp`;
        });
    }
    /**
     * Creates static sticker with transparent borders
     * @returns {string} Filename
     */
    staticNoCrop() {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = `${this.path}/${Math.random().toString(36)}`;
            fs.writeFileSync(`${filename}.png`, this.data);
            const dimensions = image_size_1.default(this.data);
            if (dimensions.width && dimensions.height && dimensions.width < dimensions.height)
                yield this.exec(`mogrify -bordercolor transparent -border ${(dimensions.height - dimensions.width) / 2}x0 ${filename}.png`);
            if (dimensions.width && dimensions.height && dimensions.width > dimensions.height)
                yield this.exec(`mogrify -bordercolor transparent -border 0x${(dimensions.width - dimensions.height) / 2} ${filename}.png`);
            yield this.exec(`${this.cwebp} ${filename}.png -o ${filename}.webp`);
            return `${filename}.webp`;
        });
    }
}
exports.default = Build;
//# sourceMappingURL=Build.js.map