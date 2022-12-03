// npx tsc -w -p one.ts

export const x = "";

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines = input.split('\n');

type elfN = {
  raw: string;
  sum: number
};

const elves = input.split('\n\n');
const elvesNormalized: elfN[] = [];

console.log(elves.length);

elves.forEach((elf: string) => {
  const elfNorm: elfN = {
    raw: elf,
    sum: elf.split('\n').reduce((p: number, n: string) => { return p + parseInt(n); }, 0),
  }

  elvesNormalized.push(elfNorm);
});

elvesNormalized.sort((a: elfN, b: elfN) => { return b.sum - a.sum });

console.log(elvesNormalized[0].sum + elvesNormalized[1].sum + elvesNormalized[2].sum);