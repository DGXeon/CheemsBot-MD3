"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.default = (bin) => `"${path_1.join(path_1.join(__dirname, '..', '..', 'bin'), process.platform === 'darwin'
    ? 'libwebp_osx'
    : process.platform === 'win32'
        ? 'libwebp_win64'
        : 'libwebp_linux', 'bin', bin)}"`;
//# sourceMappingURL=index.js.map