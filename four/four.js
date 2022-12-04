"use strict";
// npx tsc -w -p one.ts
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var total = 0;
lines.forEach(function (line) {
    var first = line.split(',')[0];
    var second = line.split(',')[1];
    var fmin = parseInt(first.split('-')[0]);
    var fmax = parseInt(first.split('-')[1]);
    var smin = parseInt(second.split('-')[0]);
    var smax = parseInt(second.split('-')[1]);
    // part 1
    // if (fmin <= smin && fmax >= smax) {
    //   total += 1;
    // } else if (smin <= fmin && smax >= fmax) {
    //   total += 1;
    // }
    if (fmin <= smin && fmax >= smin) {
        total += 1;
    }
    else if (smin <= fmin && smax >= fmin) {
        total += 1;
    }
});
console.log('total: ', total);
