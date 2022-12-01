// npx tsc -w -p one.ts
var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
var elves = input.split('\n\n');
var elvesNormalized = [];
console.log(elves.length);
elves.forEach(function (elf) {
    var elfNorm = {
        raw: elf,
        sum: elf.split('\n').reduce(function (p, n) { return p + parseInt(n); }, 0)
    };
    elvesNormalized.push(elfNorm);
});
elvesNormalized.sort(function (a, b) { return b.sum - a.sum; });
console.log(elvesNormalized[0].sum + elvesNormalized[1].sum + elvesNormalized[2].sum);
