"use strict";
// npx tsc -w
exports.__esModule = true;
exports.x = void 0;
exports.x = '';
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var monkeys = [];
console.time('runtime');
var MAX_ROUNDS = 10000;
var monkeyBusiness = 0;
var commonMultiplication;
lines.forEach(function (line, idx) {
    var monkeyIndex = Math.floor(idx / 7);
    if (idx % 7 === 0) {
        monkeys[monkeyIndex] = { activity: 0 };
    }
    else if (idx % 7 === 1) {
        monkeys[monkeyIndex].items = line.slice(18).split(', ').map(function (s) { return parseInt(s); });
    }
    else if (idx % 7 === 2) {
        monkeys[monkeyIndex].operation = line.slice(19).split(' ');
    }
    else if (idx % 7 === 3) {
        monkeys[monkeyIndex].test = parseInt(line.slice(21));
        if (monkeyIndex === 0) {
            commonMultiplication = parseInt(line.slice(21));
        }
        else {
            commonMultiplication *= parseInt(line.slice(21));
        }
    }
    else if (idx % 7 === 4) {
        monkeys[monkeyIndex].ifTrue = parseInt(line.slice(29));
    }
    else if (idx % 7 === 5) {
        monkeys[monkeyIndex].ifFalse = parseInt(line.slice(30));
    }
    else if (idx % 7 === 6) { }
});
console.error('Common multiplication:', commonMultiplication);
var printMonkeys = function (round) {
    console.log("== After round ".concat(round + 1, " =="));
    for (var i = 0; i < monkeys.length; i++) {
        console.log("Monkey ".concat(i, " inspected items ").concat(monkeys[i].activity, " times"));
    }
    console.log();
};
var getNewWorryLevel = function (old, leftSide, operator, rightSide) {
    var ls = leftSide === "old" ? old : leftSide;
    var rs = rightSide === "old" ? old : rightSide;
    switch (operator) {
        case '+':
            return Math.floor((parseInt(ls) + parseInt(rs)));
        case '*':
            return Math.floor((parseInt(ls) * parseInt(rs)));
    }
};
var figureOutItemToPass = function (worryLevel, receiverMonkey) {
    var remainder = worryLevel % commonMultiplication;
    var base = Math.floor(worryLevel / commonMultiplication);
    return remainder;
};
for (var i = 0; i < MAX_ROUNDS; i++) {
    for (var j = 0; j < monkeys.length; j++) {
        var currentMonkey = monkeys[j];
        for (var k = 0; k < currentMonkey.items.length; k++) {
            var item = currentMonkey.items[k];
            var boredWorryLevel = getNewWorryLevel(item, currentMonkey.operation[0], currentMonkey.operation[1], currentMonkey.operation[2]);
            if (boredWorryLevel % currentMonkey.test === 0) {
                monkeys[currentMonkey.ifTrue].items.push(boredWorryLevel % commonMultiplication);
            }
            else {
                monkeys[currentMonkey.ifFalse].items.push(boredWorryLevel % commonMultiplication);
            }
            currentMonkey.activity++;
        }
        currentMonkey.items = [];
    }
    printMonkeys(i);
}
monkeys.sort(function (ma, mb) { return mb.activity - ma.activity; });
monkeyBusiness = monkeys[0].activity * monkeys[1].activity;
console.log(monkeys);
console.error(monkeyBusiness);
console.timeEnd('runtime');
