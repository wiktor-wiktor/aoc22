"use strict";
// npx tsc -w
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
console.time('runtime');
var packetsInTheRightOrder = [];
var comparePackets = function (pp, depth) {
    var leftSide = pp.leftPacket;
    var rightSide = pp.rightPacket;
    var tab = new Array(depth * 2).fill(' ').join('');
    if (leftSide === undefined) {
        return -1;
    }
    else if (rightSide === undefined) {
        return 1;
    }
    if (typeof leftSide === 'number' && typeof rightSide === 'number') {
        if (leftSide < rightSide) {
            return 1;
        }
        if (leftSide === rightSide) {
            return 0;
        }
        if (leftSide > rightSide) {
            return -1;
        }
    }
    else if (typeof leftSide === 'object' && typeof rightSide === 'number') {
        return comparePackets({ leftPacket: leftSide, rightPacket: [rightSide] }, depth + 1);
    }
    else if (typeof leftSide === 'number' && typeof rightSide === 'object') {
        return comparePackets({ leftPacket: [leftSide], rightPacket: rightSide }, depth + 1);
    }
    else if (typeof leftSide === 'object' && typeof rightSide === 'object') {
        for (var i = 0; i < Math.max(leftSide.length, rightSide.length); i++) {
            if (leftSide[i] === undefined) {
                return 1;
            }
            if (rightSide[i] === undefined) {
                return -1;
            }
            var comparison = comparePackets({ leftPacket: leftSide[i], rightPacket: rightSide[i] }, depth + 1);
            if (comparison !== 0) {
                return comparison;
            }
        }
        return 0;
    }
};
var allPackets = [];
lines.forEach(function (line, idx) {
    if (line.length > 0) {
        allPackets.push(JSON.parse(line));
    }
});
var tmp;
lines.forEach(function (line, idx) {
    if (idx % 3 === 0) {
        tmp = JSON.parse(line);
    }
    else if (idx % 3 === 1) {
        if (comparePackets({
            leftPacket: tmp,
            rightPacket: JSON.parse(line)
        }, 0) === 1) {
            packetsInTheRightOrder.push((idx - 1) / 3 + 1);
        }
    }
});
console.log(packetsInTheRightOrder.reduce(function (p, c) { return p + c; }, 0));
allPackets.push([[2]]);
allPackets.push([[6]]);
allPackets.sort(function (ap, bp) { return comparePackets({ leftPacket: bp, rightPacket: ap }, 0); });
var decoderKey;
for (var i = 0; i < allPackets.length; i++) {
    if (allPackets[i].length === 1 && allPackets[i][0].length === 1 && allPackets[i][0][0] === 2) {
        decoderKey = i + 1;
    }
    if (allPackets[i].length === 1 && allPackets[i][0].length === 1 && allPackets[i][0][0] === 6) {
        decoderKey *= i + 1;
    }
}
console.log(decoderKey);
console.timeEnd('runtime');
