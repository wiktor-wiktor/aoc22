// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

let total = 0;

lines.forEach((line: string) => {

  const first: string = line.split(',')[0];
  const second: string = line.split(',')[1];

  const fmin: number = parseInt(first.split('-')[0]);
  const fmax: number = parseInt(first.split('-')[1]);
  const smin: number = parseInt(second.split('-')[0]);
  const smax: number = parseInt(second.split('-')[1]);

  // part 1
  // if (fmin <= smin && fmax >= smax) {
  //   total += 1;
  // } else if (smin <= fmin && smax >= fmax) {
  //   total += 1;
  // }

  if (fmin <= smin && fmax >= smin) {
    total += 1;
  } else if (smin <= fmin && smax >= fmin) {
    total += 1;
  }
});

console.log('total: ', total);