"use strict";
// npx tsc -w -p one.ts
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var finalMessage = '';
var stacks = [];
var amountOfStacks = (lines[0].length + 1) / 4;
console.log(amountOfStacks);
var crateLines = [];
var procedureLines = [];
var crates = [];
lines.some(function (line, idx) {
    if (line.length !== 0) {
        crateLines.push(line);
    }
    else {
        crateLines = crateLines.slice(0, -1);
        procedureLines = lines.slice(idx + 1);
        return true;
    }
});
crateLines.forEach(function (line) {
    for (var i = 0; i < amountOfStacks; i++) {
        if (crates[i] === undefined) {
            crates[i] = [];
        }
        var possibleCrate = line[1 + (i * 4)];
        if (possibleCrate !== ' ') {
            crates[i].push(possibleCrate);
        }
    }
});
var move = function (amount, from, to) {
    for (var i = 0; i < amount; i++) {
        crates[to].unshift(crates[from].shift());
    }
};
var move2 = function (amount, from, to) {
    var _a;
    var moving = crates[from].slice(0, amount);
    (_a = crates[to]).unshift.apply(_a, moving);
    crates[from] = crates[from].slice(amount);
};
console.log('--- crates prior ---', crates);
procedureLines.forEach(function (procedure) {
    var instruction = procedure.split(' ');
    move2(parseInt(instruction[1]), parseInt(instruction[3]) - 1, parseInt(instruction[5]) - 1);
});
for (var i = 0; i < amountOfStacks; i++) {
    finalMessage += crates[i][0];
}
console.log('--- crates after ---', crates);
console.log('message: ', finalMessage);
