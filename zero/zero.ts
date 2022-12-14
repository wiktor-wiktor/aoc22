// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

console.time('runtime');


lines.forEach((line: string, idx: number) => {
  
});

console.timeEnd('runtime');
