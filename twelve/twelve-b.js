"use strict";
// npx tsc -w
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
console.time('runtime');
var THE_ALPHABET = new Map([['S', 1], ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], ['j', 10], ['k', 11], ['l', 12], ['m', 13], ['n', 14], ['o', 15], ['p', 16], ['q', 17], ['r', 18], ['s', 19], ['t', 20], ['u', 21], ['v', 22], ['w', 23], ['x', 24], ['y', 25], ['z', 26], ['E', 26]]);
var MAP_WIDTH = lines[0].length;
var MAP_HEIGHT = lines.length;
var map = new Array(MAP_WIDTH).fill('').map(function () { return new Array(MAP_HEIGHT); });
var start;
var exit;
lines.forEach(function (line, idx) {
    for (var i = 0; i < line.length; i++) {
        var heightHere = line[i];
        if (heightHere === 'E') {
            exit = { x: i, y: idx };
        }
        map[i][idx] = {
            position: { x: i, y: idx },
            height: heightHere,
            to: null,
            shortestToHere: Infinity
        };
        if (heightHere === 'S') {
            start = { x: i, y: idx };
            map[i][idx].shortestToHere = 0;
        }
    }
});
var canGet = function (fromHeight, toNode) {
    return (THE_ALPHABET.get(fromHeight) > THE_ALPHABET.get(toNode.height) - 2);
};
var setPossibleToNodes = function (from) {
    if (from.to === null) {
        from.to = [];
    }
    if (from.position.x > 0) {
        var possibleTo = map[from.position.x - 1][from.position.y];
        if (canGet(from.height, possibleTo)) {
            from.to.push(possibleTo);
        }
    }
    if (from.position.y > 0) {
        var possibleTo = map[from.position.x][from.position.y - 1];
        if (canGet(from.height, possibleTo)) {
            from.to.push(possibleTo);
        }
    }
    if (from.position.x < MAP_WIDTH - 1) {
        var possibleTo = map[from.position.x + 1][from.position.y];
        if (canGet(from.height, possibleTo)) {
            from.to.push(possibleTo);
        }
    }
    if (from.position.y < MAP_HEIGHT - 1) {
        var possibleTo = map[from.position.x][from.position.y + 1];
        if (canGet(from.height, possibleTo)) {
            from.to.push(possibleTo);
        }
    }
};
var process = function (here, processedAlready, toProcess) {
    if (processedAlready.get(JSON.stringify(here.position)) !== undefined) {
        toProcess.shift();
        return;
    }
    if (here.to === null) {
        setPossibleToNodes(here);
    }
    processedAlready.set(JSON.stringify(here.position), here);
    here.to.forEach(function (n) {
        if (here.shortestToHere + 1 < n.shortestToHere) {
            n.shortestToHere = here.shortestToHere + 1;
        }
    });
    toProcess.push.apply(toProcess, here.to);
    toProcess.shift();
    return here.height === 'E';
};
var resetShortestValues = function () {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            map[i][j].shortestToHere = Infinity;
        }
    }
};
var differentStarts = [];
for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
        var here = map[i][j];
        resetShortestValues();
        if (here.height === 'a' || here.height === 'S') {
            var processedAlready = new Map();
            var toProcess = [];
            here.shortestToHere = 0;
            toProcess.push(here);
            while (toProcess.length > 0) {
                var arrivedAtE = process(toProcess[0], processedAlready, toProcess);
                toProcess.sort(function (ha, hb) { return ha.shortestToHere - hb.shortestToHere; });
                if (arrivedAtE) {
                    differentStarts.push(map[exit.x][exit.y].shortestToHere);
                    break;
                }
            }
            ;
        }
    }
}
differentStarts.sort(function (sa, sb) { return sa - sb; });
console.log(differentStarts);
console.error();
console.timeEnd('runtime');
