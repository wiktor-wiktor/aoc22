"use strict";
// npx tsc -w -p one.ts
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var forest = new Map();
var visibilityFlags = new Map();
var forestHeight = lines.length;
var forestWidth = lines[0].length;
var edgeTreesCount = 2 * forestWidth + 2 * forestHeight - 4;
console.time("runtime");
for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < lines[i].length; j++) {
        forest.set("".concat(i, " ").concat(j), parseInt(lines[i][j]));
    }
}
var totalVisible = edgeTreesCount;
var assessTreeVisibilityHere = function (i, j, currentMax) {
    if (currentMax.value === 9) {
        return true;
    }
    var treeHeight = forest.get("".concat(i, " ").concat(j));
    var currentVisibilityHere = visibilityFlags.get("".concat(i, " ").concat(j));
    if (!currentVisibilityHere && treeHeight > currentMax.value) {
        visibilityFlags.set("".concat(i, " ").concat(j), true);
        totalVisible += 1;
    }
    if (treeHeight > currentMax.value) {
        currentMax.value = treeHeight;
    }
    // no point in looking further in this row and direction
    if (treeHeight === 9) {
        return true;
    }
    return false;
};
// left to right
for (var i = 1; i < forestHeight - 1; i++) {
    var currentMax = { value: parseInt(lines[i][0]) };
    for (var j = 1; j < forestWidth - 1; j++) {
        var isMax = assessTreeVisibilityHere(i, j, currentMax);
        if (isMax) {
            break;
        }
    }
}
// top to bottom
for (var i = 1; i < forestWidth - 1; i++) {
    var currentMax = { value: parseInt(lines[0][i]) };
    for (var j = 1; j < forestHeight - 1; j++) {
        var isMax = assessTreeVisibilityHere(j, i, currentMax);
        if (isMax) {
            break;
        }
    }
}
// right to left
for (var i = 1; i < forestHeight - 1; i++) {
    var currentMax = { value: parseInt(lines[i][forestWidth - 1]) };
    for (var j = 1; j < forestWidth - 1; j++) {
        var isMax = assessTreeVisibilityHere(i, forestWidth - 1 - j, currentMax);
        if (isMax) {
            break;
        }
    }
}
// bottom to top
for (var i = 1; i < forestWidth - 1; i++) {
    var currentMax = { value: parseInt(lines[forestHeight - 1][i]) };
    for (var j = 1; j < forestHeight - 1; j++) {
        var isMax = assessTreeVisibilityHere(forestHeight - 1 - j, i, currentMax);
        if (isMax) {
            break;
        }
    }
}
console.timeEnd('runtime');
console.log(totalVisible);
console.time('runtime pt2');
var bestScenicScore = 0;
var assessTreeScenicScore = function (x, y) {
    var visibleToTop = 0;
    var visibleToRight = 0;
    var visibleToBottom = 0;
    var visibleToLeft = 0;
    var heightHere = forest.get("".concat(x, " ").concat(y));
    for (var i = 0; i < x; i++) {
        var currentHeight = forest.get("".concat(x - i - 1, " ").concat(y));
        visibleToTop += 1;
        if (currentHeight >= heightHere) {
            break;
        }
    }
    for (var i = 0; i < forestWidth - y - 1; i++) {
        var currentHeight = forest.get("".concat(x, " ").concat(y + i + 1));
        visibleToRight += 1;
        if (currentHeight >= heightHere) {
            break;
        }
    }
    for (var i = 0; i < forestHeight - x - 1; i++) {
        var currentHeight = forest.get("".concat(x + i + 1, " ").concat(y));
        visibleToBottom += 1;
        if (currentHeight >= heightHere) {
            break;
        }
    }
    for (var i = 0; i < y; i++) {
        var currentHeight = forest.get("".concat(x, " ").concat(y - i - 1));
        visibleToLeft += 1;
        if (currentHeight >= heightHere) {
            break;
        }
    }
    return visibleToTop * visibleToRight * visibleToBottom * visibleToLeft;
};
for (var i = 0; i < forestHeight; i++) {
    for (var j = 0; j < forestWidth; j++) {
        var scsc = assessTreeScenicScore(i, j);
        if (scsc > bestScenicScore) {
            bestScenicScore = scsc;
        }
    }
}
console.timeEnd('runtime pt2');
console.log(bestScenicScore);
