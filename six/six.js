"use strict";
// npx tsc -w -p one.ts
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var MARKER_SIZE = 14;
lines.forEach(function (line) {
    var frame = line.slice(0, MARKER_SIZE - 1);
    for (var i = MARKER_SIZE - 1; i < line.length; i++) {
        frame += line[i];
        var possibleMarker = new Set(frame);
        if (possibleMarker.size === MARKER_SIZE) {
            console.log(i + 1);
            break;
        }
        frame = frame.slice(1);
    }
});
