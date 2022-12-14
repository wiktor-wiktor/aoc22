"use strict";
// npx tsc -w
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
console.time('runtime');
var THE_ALPHABET = new Map([['S', 0], ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], ['j', 10], ['k', 11], ['l', 12], ['m', 13], ['n', 14], ['o', 15], ['p', 16], ['q', 17], ['r', 18], ['s', 19], ['t', 20], ['u', 21], ['v', 22], ['w', 23], ['x', 24], ['y', 25], ['z', 26], ['E', 27]]);
var MAP_WIDTH = lines[0].length;
var MAP_HEIGHT = lines.length;
var map = new Array(MAP_WIDTH).fill('').map(function () { return new Array(MAP_HEIGHT); });
var start;
var exit;
lines.forEach(function (line, idx) {
    for (var i = 0; i < line.length; i++) {
        var heightHere = line[i];
        if (heightHere === 'S') {
            start = {
                position: { x: i, y: idx },
                height: heightHere,
                to: null,
                shortestToHere: Infinity
            };
        }
        if (heightHere === 'E') {
            exit = { x: i, y: idx };
        }
        map[i][idx] = {
            position: { x: i, y: idx },
            height: heightHere,
            to: null,
            shortestToHere: Infinity
        };
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
var shortestWay;
var shortestWayLength = Infinity;
var longestWaySoFar = 0;
var ways = 1;
var findWays = function (path) {
    ways++;
    if (Math.random() * 600000 < 10) {
        console.log('');
        console.log('longest so far: ', longestWaySoFar);
        console.log('current open ways: ', ways.toString().padStart(12, '0'));
        console.log('SHORTEST SO FAR: ', shortestWayLength);
    }
    var last = path[path.length - 1];
    if (path.length > longestWaySoFar) {
        longestWaySoFar = path.length;
    }
    if (last.position.x === exit.x && last.position.y === exit.y) {
        if (shortestWayLength > path.length) {
            shortestWayLength = path.length;
            shortestWay = path;
        }
        ways--;
        return;
    }
    if (last.shortestToHere < path.length) {
        ways--;
        return;
    }
    else {
        last.shortestToHere = path.length;
    }
    if (last.to === null) {
        setPossibleToNodes(last);
    }
    var newWaysOpened = 0;
    last.to.forEach(function (n) {
        if (path.indexOf(n) === -1) {
            newWaysOpened += 1;
            findWays(__spreadArray(__spreadArray([], path, true), [n], false));
        }
    });
    ways--;
};
findWays([start]);
console.error(shortestWayLength);
console.timeEnd('runtime');
