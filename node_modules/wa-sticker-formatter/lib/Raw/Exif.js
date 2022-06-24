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
exports.addMetadataToWebpBuffer = exports.setMetadata = exports.createExif = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs_extra_1 = require("fs-extra");
const os_1 = require("os");
const webp_1 = __importDefault(require("../webp"));
const execute = util_1.promisify(child_process_1.exec);
/**
 * Creates Exif Metadata File
 * @param pack
 * @param author
 */
const createExif = (pack, author, filename) => {
    const stickerPackID = 'com.etheral.waifuhub.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2';
    const json = {
        'sticker-pack-id': stickerPackID,
        'sticker-pack-name': pack,
        'sticker-pack-publisher': author
    };
    let length = new TextEncoder().encode(JSON.stringify(json)).length;
    const f = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
    const code = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00];
    if (length > 256) {
        length = length - 256;
        code.unshift(0x01);
    }
    else {
        code.unshift(0x00);
    }
    const fff = Buffer.from(code);
    const ffff = Buffer.from(JSON.stringify(json), 'utf-8');
    let len;
    if (length < 16) {
        len = length.toString(16);
        len = '0' + length;
    }
    else {
        len = length.toString(16);
    }
    const ff = Buffer.from(len, 'hex');
    const buffer = Buffer.concat([f, ff, fff, ffff]);
    const fn = `${filename}.exif`;
    fs_extra_1.writeFileSync(fn, buffer);
    return fn;
};
exports.createExif = createExif;
/**
 * Sets Exif metadata to WebP
 * @param pack
 * @param author
 * @param file
 */
const setMetadata = (pack, author, file) => __awaiter(void 0, void 0, void 0, function* () {
    const exif = exports.createExif(pack, author, `${os_1.tmpdir()}/${Math.random().toString(36)}`);
    yield execute(`${webp_1.default('webpmux')} -set exif ${exif} "${file}" -o "${file}"`);
    return yield fs_extra_1.readFile(file);
});
exports.setMetadata = setMetadata;
/**
 * Adds metadata to the given webp buffer and returns the new buffer
 * @param buffer
 * @param pack
 * @param author
 * @returns webpbuffer
 */
const addMetadataToWebpBuffer = (buffer, pack, author) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = `${os_1.tmpdir()}/${Math.random().toString(36)}`;
    yield fs_extra_1.writeFile(filename, buffer);
    return yield exports.setMetadata(pack, author, filename);
});
exports.addMetadataToWebpBuffer = addMetadataToWebpBuffer;
//# sourceMappingURL=Exif.js.map