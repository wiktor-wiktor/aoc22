"use strict";
// npx tsc -w
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var theSum = 0;
var cycle = 1;
var registerX = 1;
var screen = new Array(240);
var pollStrength = function () {
    var strength = cycle * registerX;
    if ((cycle - 20) % 40 === 0) {
        theSum += strength;
    }
};
var litCount = 0;
var putPixel = function () {
    if (((cycle - 1) % 40) - registerX > -2 && ((cycle - 1) % 40) - registerX < 2) {
        litCount += 1;
        screen[cycle - 1] = '⬜';
    }
    else {
        screen[cycle - 1] = '⬛';
    }
};
var processInstruction = function (instruction, argument) {
    switch (instruction) {
        case 'noop':
            putPixel();
            pollStrength();
            cycle += 1;
            break;
        case 'addx':
            putPixel();
            pollStrength();
            cycle += 1;
            putPixel();
            pollStrength();
            cycle += 1;
            registerX += argument;
            break;
    }
};
console.time('runtime');
lines.forEach(function (line) {
    var _a;
    var lineSplit = line.split(' ');
    processInstruction(lineSplit[0], parseInt((_a = lineSplit[1]) !== null && _a !== void 0 ? _a : '0'));
});
console.timeEnd('runtime');
for (var i = 0; i < 6; i++) {
    var line = '';
    for (var j = 0; j < 40; j++) {
        line += screen[i * 40 + j];
    }
    console.log(line);
}
