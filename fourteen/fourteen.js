"use strict";
// npx tsc -w
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
console.time('runtime');
var X_OF_SAND_SOURCE = 500;
var boundariesX = [X_OF_SAND_SOURCE, X_OF_SAND_SOURCE];
var boundariesY = [0, 0];
lines.forEach(function (line, idx) {
    var coordsArray = line.split(' -> ');
    coordsArray.forEach(function (coord) {
        var xy = coord.split(',').map(function (c) { return parseInt(c); });
        if (xy[0] < boundariesX[0]) {
            boundariesX[0] = xy[0];
        }
        if (xy[0] > boundariesX[1]) {
            boundariesX[1] = xy[0];
        }
        if (xy[1] < boundariesY[0]) {
            boundariesY[0] = xy[1];
        }
        if (xy[1] > boundariesY[1]) {
            boundariesY[1] = xy[1];
        }
    });
});
var offset = (X_OF_SAND_SOURCE - boundariesY[1]) - 3;
// map has a padding: 0 2 at the level (bedrock - 1)
var map = new Array(boundariesY[1] * 2 + 7).fill('').map(function () { return new Array(boundariesY[1] + 3).fill('.'); });
console.log(boundariesX);
console.log(boundariesY);
console.log(map.length, map[0].length);
var printMap = function () {
    for (var j = 0; j < map[0].length; j++) {
        var row = '';
        for (var i = 0; i < map.length; i++) {
            row += map[i][j];
        }
        console.log(row);
    }
    console.log();
};
for (var i = 0; i < map.length; i++) {
    map[i][map[0].length - 1] = '#';
}
var fillALine = function (from, to) {
    if (from.x === to.x) {
        var minY = Math.min(from.y, to.y);
        var maxY = Math.max(from.y, to.y);
        // console.log(from, to, `${minY} - ${maxY}`);
        for (var i = minY; i < maxY + 1; i++) {
            if (from.x - offset > -1 && from.x - offset < map.length) {
                map[from.x - offset][i] = i.toString();
            }
        }
    }
    else if (from.y === to.y) {
        var minX = Math.min(from.x, to.x);
        var maxX = Math.max(from.x, to.x);
        // console.log(from, to, `${minX} - ${maxX}`);
        for (var i = 0; i < maxX - minX + 1; i++) {
            if (i + minX - offset > -1 && i + minX - offset < map.length) {
                map[i + minX - offset][from.y] = i.toString();
            }
        }
    }
    else {
        console.error('NO, NOPE, shouldt happen');
    }
};
var moveGainAStep = function (position) {
    if (map[position.x][position.y + 1] === '.') {
        position.y += 1;
        return true;
    }
    if (map[position.x][position.y + 1] !== '.') {
        if (map[position.x - 1][position.y + 1] === '.') {
            position.x -= 1;
            position.y += 1;
            return true;
        }
        if (map[position.x + 1][position.y + 1] === '.') {
            position.x += 1;
            position.y += 1;
            return true;
        }
        map[position.x][position.y] = 'o';
        return false;
    }
};
var dropGrain = function () {
    var currentGrainPosition = { x: X_OF_SAND_SOURCE - offset, y: 0 };
    if (map[currentGrainPosition.x][currentGrainPosition.y] === 'o') {
        return false;
    }
    while (moveGainAStep(currentGrainPosition)) {
        if (currentGrainPosition.y === map[0].length - 1) {
            return false;
        }
    }
    return true;
};
lines.forEach(function (line, idx) {
    var coordsArray = line.split(' -> ');
    for (var i = 0; i < coordsArray.length - 1; i++) {
        var fromArray = coordsArray[i].split(',');
        var toArray = coordsArray[i + 1].split(',');
        fillALine({ x: parseInt(fromArray[0]), y: parseInt(fromArray[1]) }, { x: parseInt(toArray[0]), y: parseInt(toArray[1]) });
        // printMap();
    }
});
var grainsCounter = 0;
// setInterval(() => {
//   const g = dropGrain();
//   printMap();
//   grainsCounter++;
//   if (!g) { console.log(grainsCounter)}
// }, 120);
while (dropGrain()) {
    grainsCounter++;
}
console.log(grainsCounter);
console.timeEnd('runtime');
