"use strict";
// npx tsc -w -p
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var getStartPosition = function () { return [11, 15]; };
var board = new Map();
board.set("".concat(getStartPosition()[0], ", ").concat(getStartPosition()[1]), true);
var AMOUNT_OF_KNOTS = 10;
var currentHeadPosition = getStartPosition();
var currentTailPosition = new Array(AMOUNT_OF_KNOTS - 1).fill(getStartPosition());
var tailVisitedPositions = new Map();
;
tailVisitedPositions.set("".concat(getStartPosition()[0], " ").concat(getStartPosition()[1]), true);
//
// Possible positions of Tail in relation to Head (Head is at the center, at E)
// A B C
// D E F
// G H I
var currentTHRelation = new Array(AMOUNT_OF_KNOTS - 1).fill('E');
//
// Key: The currentTHRelation + current move of the head
// Value: [next THRelation, dx of how tail moves, dy of how tail moves, name of the tail move (if it moved)]
//
// new part 2 diagonal moves are symbolised as below
// O . T
// . . .
// S . F
//
var tailMovementRecipe = {
    'AU': ['D', 0, 0], 'AR': ['D', 1, 1, 'F'], 'AD': ['B', 1, 1, 'F'], 'AL': ['B', 0, 0],
    'BU': ['E', 0, 0], 'BR': ['A', 0, 0], 'BD': ['B', 0, 1, 'D'], 'BL': ['C', 0, 0],
    'CU': ['F', 0, 0], 'CR': ['B', 0, 0], 'CD': ['B', -1, 1, 'S'], 'CL': ['F', -1, 1, 'S'],
    'DU': ['G', 0, 0], 'DR': ['D', 1, 0, 'R'], 'DD': ['A', 0, 0], 'DL': ['E', 0, 0],
    'EU': ['H', 0, 0], 'ER': ['D', 0, 0], 'ED': ['B', 0, 0], 'EL': ['F', 0, 0],
    'FU': ['I', 0, 0], 'FR': ['E', 0, 0], 'FD': ['C', 0, 0], 'FL': ['F', -1, 0, 'L'],
    'GU': ['H', 1, -1, 'T'], 'GR': ['D', 1, -1, 'T'], 'GD': ['D', 0, 0], 'GL': ['H', 0, 0],
    'HU': ['H', 0, -1, 'U'], 'HR': ['G', 0, 0], 'HD': ['E', 0, 0], 'HL': ['I', 0, 0],
    'IU': ['H', -1, -1, 'O'], 'IR': ['H', 0, 0], 'ID': ['F', 0, 0], 'IL': ['F', -1, -1, 'O'],
    'AO': ['E', 0, 0], 'AT': ['D', 1, 0, 'R'], 'AF': ['A', 1, 1, 'F'], 'AS': ['B', 0, 1, 'D'],
    'BO': ['F', 0, 0], 'BT': ['D', 0, 0], 'BF': ['B', 1, 1, 'F'], 'BS': ['B', -1, 1, 'S'],
    'CO': ['F', -1, 0, 'L'], 'CT': ['E', 0, 0], 'CF': ['B', 0, 1, 'D'], 'CS': ['C', -1, 1, 'S'],
    'DO': ['H', 0, 0], 'DT': ['D', 1, -1, 'T'], 'DF': ['D', 1, 1, 'F'], 'DS': ['B', 0, 0],
    'EO': ['I', 0, 0], 'ET': ['G', 0, 0], 'EF': ['A', 0, 0], 'ES': ['C', 0, 0],
    'FO': ['F', -1, -1, 'O'], 'FT': ['H', 0, 0], 'FF': ['B', 0, 0], 'FS': ['F', -1, 1, 'S'],
    'GO': ['H', 0, -1, 'U'], 'GT': ['G', 1, -1, 'T'], 'GF': ['D', 1, 0, 'R'], 'GS': ['E', 0, 0],
    'HO': ['H', -1, -1, 'O'], 'HT': ['H', 1, -1, 'T'], 'HF': ['D', 0, 0], 'HS': ['F', 0, 0],
    'IO': ['I', -1, -1, 'O'], 'IT': ['H', 0, -1, 'U'], 'IF': ['E', 0, 0], 'IS': ['F', -1, 0, 'L']
};
// "Unique" move example as from the specification
// dragged knot ends at a straight (not on the diagonal)
//
// ......
// ......
// ......
// ....H.
// 4321..  (4 covers 5, 6, 7, 8, 9, s)
// ......
// ......
// ....H.
// .4321.
// 5.....  (5 covers 6, 7, 8, 9, s)
//
var drawStep = function () {
    var visualMatrix = new Array(26).fill('.').map(function () { return new Array(21).fill('.'); });
    board.forEach(function (key, coords) {
        var coordsSplit = coords.split(' ');
        visualMatrix[parseInt(coordsSplit[0])][parseInt(coordsSplit[1])] = '.';
    });
    for (var k = AMOUNT_OF_KNOTS - 2; k >= 0; k--) {
        visualMatrix[currentTailPosition[k][0]][currentTailPosition[k][1]] = k + 1;
    }
    visualMatrix[currentHeadPosition[0]][currentHeadPosition[1]] = 'H';
    /* tailVisitedPositions.forEach((key, coords) => {
      const coordsSplit = coords.split(' ');
      visualMatrix[parseInt(coordsSplit[0])][parseInt(coordsSplit[1])] = '#';
    }); */
    for (var j = 0; j < visualMatrix[0].length; j++) {
        var row = '';
        for (var i = 0; i < visualMatrix.length; i++) {
            row += "".concat(visualMatrix[i][j]);
        }
        console.log(row);
    }
};
var adjustKnot = function (index, direction) {
    if (direction === undefined) {
        return;
    }
    currentTailPosition[index] = [
        currentTailPosition[index][0] + tailMovementRecipe["".concat(currentTHRelation[index]).concat(direction)][1],
        currentTailPosition[index][1] + tailMovementRecipe["".concat(currentTHRelation[index]).concat(direction)][2]
    ];
    var knotMoveDirection = tailMovementRecipe["".concat(currentTHRelation[index]).concat(direction)][3];
    currentTHRelation[index] = tailMovementRecipe["".concat(currentTHRelation[index]).concat(direction)][0];
    board.set("".concat(currentTailPosition[index][0], " ").concat(currentTailPosition[index][1]), true);
    if (index + 1 < AMOUNT_OF_KNOTS - 1) {
        adjustKnot(index + 1, knotMoveDirection);
    }
    // Mark visits of last to count at the end
    if (index === AMOUNT_OF_KNOTS - 2) {
        tailVisitedPositions.set("".concat(currentTailPosition[index][0], " ").concat(currentTailPosition[index][1]), true);
    }
};
var moveHead = function (direction, steps) {
    for (var i = 0; i < steps; i++) {
        switch (direction) {
            case 'U':
                currentHeadPosition = [
                    currentHeadPosition[0],
                    currentHeadPosition[1] - 1
                ];
                break;
            case 'R':
                currentHeadPosition = [
                    currentHeadPosition[0] + 1,
                    currentHeadPosition[1]
                ];
                break;
            case 'D':
                currentHeadPosition = [
                    currentHeadPosition[0],
                    currentHeadPosition[1] + 1
                ];
                break;
            case 'L':
                currentHeadPosition = [
                    currentHeadPosition[0] - 1,
                    currentHeadPosition[1]
                ];
                break;
        }
        adjustKnot(0, direction);
    }
};
console.time('runtime');
lines.forEach(function (line) {
    var lineSplit = line.split(' ');
    var direction = lineSplit[0];
    var steps = parseInt(lineSplit[1]);
    moveHead(direction, steps);
});
//drawStep();
console.timeEnd('runtime');
console.error(board.size);
console.error(tailVisitedPositions.size);
