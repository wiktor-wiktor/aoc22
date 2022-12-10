// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

let theSum = 0;
let cycle = 1;
let registerX = 1;

let screen  = new Array(240);

const pollStrength = (): void => {
  const strength = cycle * registerX;
  if ((cycle - 20) % 40 === 0) {
    theSum += strength;
  }
}

let litCount = 0;
const putPixel = (): void => {
  if (((cycle - 1) % 40) - registerX > -2 && ((cycle - 1) % 40) - registerX < 2) {
    litCount += 1;
    screen[cycle - 1] = '⬜';
  } else {
    screen[cycle - 1] = '⬛';
  }
}

const processInstruction = (instruction: string, argument: number | undefined): void => {
  switch (instruction) {
    case 'noop':
      putPixel();
      pollStrength();
      cycle += 1;
      break;
    case 'addx':
      putPixel();
      pollStrength();
      cycle += 1;
      putPixel();
      pollStrength();
      cycle += 1;
      registerX += argument;
      break;
  }
};

console.time('runtime');

lines.forEach((line: string) => {
  const lineSplit = line.split(' ');
  processInstruction(lineSplit[0], parseInt(lineSplit[1] ?? '0' ));
});

console.timeEnd('runtime');

for (let i = 0; i < 6; i++) {
  let line = '';
  for (let j = 0; j < 40; j++) {
    line += screen[i * 40 + j];
  }
  console.log(line);
}
