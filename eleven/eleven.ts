// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

type monkey = {
  items?: number[],
  operation?: [number, string, number],
  test?: number,
  ifTrue?: number,
  ifFalse?: number,
  activity?: number,
}

const monkeys: monkey[] = [];

console.time('runtime');

const MAX_ROUNDS = 10000;
let monkeyBusiness = 0;
let commonMultiplication: number;

lines.forEach((line: string, idx: number) => {
  const monkeyIndex = Math.floor(idx / 7);

  if (idx % 7 === 0) {
    monkeys[monkeyIndex] = { activity: 0 };
  } else if (idx % 7 === 1) {
    monkeys[monkeyIndex].items = line.slice(18).split(', ').map(s => parseInt(s));
  } else if (idx % 7 === 2) {
    monkeys[monkeyIndex].operation = line.slice(19).split(' ') as [number, string, number];
  } else if (idx % 7 === 3) {
    monkeys[monkeyIndex].test = parseInt(line.slice(21));
    if (monkeyIndex === 0) {
      commonMultiplication = parseInt(line.slice(21));
    } else {
      commonMultiplication *= parseInt(line.slice(21));
    }
  } else if (idx % 7 === 4) {
    monkeys[monkeyIndex].ifTrue = parseInt(line.slice(29));
  } else if (idx % 7 === 5) {
    monkeys[monkeyIndex].ifFalse = parseInt(line.slice(30));
  } else if (idx % 7 === 6) {}
});

console.error('Common multiplication:', commonMultiplication);

const printMonkeys = (round: number): void => {
  console.log(`== After round ${round + 1} ==`)
  for (let i = 0; i < monkeys.length; i++) {
    console.log(`Monkey ${i} inspected items ${ monkeys[i].activity } times`)
  }
  console.log();
}

const getNewWorryLevel = (
  old: number,
  leftSide: number | "old",
  operator: string,
  rightSide: number | "old"
): number => {
  const ls: number = leftSide === "old" ? old : leftSide;
  const rs: number = rightSide === "old" ? old : rightSide;
  switch (operator) {
    case '+':
      return Math.floor((parseInt(ls) + parseInt(rs)));
    case '*':
      return Math.floor((parseInt(ls) * parseInt(rs)));
  }
}

const figureOutItemToPass = (worryLevel: number, receiverMonkey: monkey): number => {
  const remainder = worryLevel % commonMultiplication;
  const base = Math.floor(worryLevel / commonMultiplication);

  return remainder;
}

for (let i = 0; i < MAX_ROUNDS; i++) {
  for (let j = 0; j < monkeys.length; j++) {
    const currentMonkey = monkeys[j];
    for (let k = 0; k < currentMonkey.items.length; k++) {
      const item = currentMonkey.items[k];
      const boredWorryLevel = getNewWorryLevel(
        item,
        currentMonkey.operation[0],
        currentMonkey.operation[1],
        currentMonkey.operation[2],
      );

      if (boredWorryLevel % currentMonkey.test === 0) {
        monkeys[currentMonkey.ifTrue].items.push(boredWorryLevel % commonMultiplication);
      } else {
        monkeys[currentMonkey.ifFalse].items.push(boredWorryLevel % commonMultiplication);
      }

      currentMonkey.activity++;
    }
    currentMonkey.items = [];
  }
  printMonkeys(i);
}

monkeys.sort((ma, mb) => { return mb.activity - ma.activity; });

monkeyBusiness = monkeys[0].activity * monkeys[1].activity;

console.log(monkeys)
console.error(monkeyBusiness);

console.timeEnd('runtime');
