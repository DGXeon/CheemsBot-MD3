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
exports.convertFromWebp = exports.convertToWebp = void 0;
const child_process_1 = require("child_process");
const fs_extra_1 = require("fs-extra");
const util_1 = require("util");
const webp_1 = __importDefault(require("../webp"));
const execute = util_1.promisify(child_process_1.exec);
/**
 * Converts image into WebP
 * @param path
 * @param filename
 */
const convertToWebp = (path, filename = 'converted') => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_extra_1.existsSync(path))
        throw new Error(`File does not exist: ${path}`);
    const type = path.split('.')[1];
    if (type === 'gif') {
        yield execute(`${webp_1.default('gif2webp')} ${path} -o ${filename}.webp`);
        return `${filename}.webp`;
    }
    execute(`${webp_1.default('cwebp')} ${path} -o ${filename}.webp`);
    return `${filename}.webp`;
});
exports.convertToWebp = convertToWebp;
/**
 * Converts WebP into PNG
 * @param path
 * @param filename
 */
const convertFromWebp = (path, filename = 'converted-from-webp') => __awaiter(void 0, void 0, void 0, function* () {
    if (!fs_extra_1.existsSync(path))
        throw new Error(`File does not exist: ${path}`);
    yield execute(`${webp_1.default('dwebp')} ${path} -o ${filename}.png`);
    return `${filename}.png`;
});
exports.convertFromWebp = convertFromWebp;
//# sourceMappingURL=Webp.js.map