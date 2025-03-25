"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "hgjdksusnskaldrnfjjj";
    let linkString = "";
    for (let i = 0; i < len; i++) {
        linkString += options[Math.floor(Math.random() * options.length)];
    }
    return linkString;
}
