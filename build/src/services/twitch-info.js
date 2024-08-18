"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwitchVideoData = void 0;
const child_process_1 = require("child_process");
function getTwitchVideoData(url) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`twitch-dl info --json ${url}`, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            if (stdout) {
                resolve(JSON.parse(stdout));
            }
            else {
                throw new Error(stderr);
                // reject()
            }
        });
    });
}
exports.getTwitchVideoData = getTwitchVideoData;
