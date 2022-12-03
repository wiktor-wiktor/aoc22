"use strict";
// npx tsc -w -p one.ts
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
console.log('lines: ', lines.length);
var ourPoints = {
    'X': 1,
    'Y': 2,
    'Z': 3,
    'A': 1,
    'B': 2,
    'C': 3
};
var getScore = function (their, our) {
    if (their === 'A' && our === 'X' || their === 'B' && our === 'Y' || their === 'C' && our === 'Z') {
        return 3;
    }
    if (their === 'A' && our === 'Y' || their === 'B' && our === 'Z' || their === 'C' && our === 'X') {
        return 6;
    }
    return 0;
};
var getScore_pt2 = function (their, outcome) {
    switch (outcome) {
        case 'X':
            console.log(outcome, 0, (ourPoints[their] - 1) || 3);
            return 0 + ((ourPoints[their] - 1) || 3);
        case 'Y':
            console.log(outcome, 3, ourPoints[their]);
            return 3 + ourPoints[their];
        case 'Z':
            console.log(outcome, 6, ((ourPoints[their] + 1) % 4) || 1);
            return 6 + (((ourPoints[their] + 1) % 4) || 1);
    }
};
var total = 0;
lines.forEach(function (line) {
    var plays = line.split(' ');
    var their = plays[0];
    var our = plays[1];
    var outcome = plays[1];
    //const score = getScore(their, our) + ourPoints[our];
    var score_2 = getScore_pt2(their, outcome);
    console.log(score_2);
    total += score_2;
});
console.log('total: ', total);
