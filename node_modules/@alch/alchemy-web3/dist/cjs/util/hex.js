"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toHex(n) {
    return "0x" + n.toString(16);
}
exports.toHex = toHex;
function fromHex(hexString) {
    return Number.parseInt(hexString, 16);
}
exports.fromHex = fromHex;
