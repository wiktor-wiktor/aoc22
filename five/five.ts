// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

let finalMessage: string = '';

const stacks: string[] = [];
let amountOfStacks = (lines[0].length + 1) / 4;

console.log(amountOfStacks);

let crateLines: string[] = [];
let procedureLines: string[] = [];

let crates: string[][] = [];

lines.some((line: string, idx: number) => {
  if (line.length !== 0) {
    crateLines.push(line);
  } else {
    crateLines = crateLines.slice(0, -1);
    procedureLines = lines.slice(idx + 1);
    return true;
  }
});

crateLines.forEach((line: string) => {
  for(let i = 0; i < amountOfStacks; i++) {
    if (crates[i] === undefined) {
      crates[i] = [];
    }
    const possibleCrate = line[1 + (i * 4)];
    if (possibleCrate !== ' ') {
      crates[i].push(possibleCrate);
    }
  }
});

const move = (amount: number, from: number, to: number): void => {
  for (let i = 0; i < amount; i++) {
    crates[to].unshift(crates[from].shift());
  }
}

const move2 = (amount: number, from: number, to: number): void => {
  const moving: string[] = crates[from].slice(0, amount);
  crates[to].unshift(...moving);
  crates[from] = crates[from].slice(amount);
}

console.log('--- crates prior ---', crates);

procedureLines.forEach((procedure: string) => {
  const instruction = procedure.split(' ');

  move2(
    parseInt(instruction[1]),
    parseInt(instruction[3]) - 1,
    parseInt(instruction[5]) - 1
  );
});

for (let i = 0; i < amountOfStacks; i++) {
  finalMessage += crates[i][0];
}

console.log('--- crates after ---', crates);

console.log('message: ', finalMessage);