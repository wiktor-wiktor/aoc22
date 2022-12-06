// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const MARKER_SIZE = 14;

lines.forEach((line: string) => {
  let frame: string = line.slice(0, MARKER_SIZE - 1);
  for (let i = MARKER_SIZE - 1; i < line.length; i++) {
    frame += line[i];
    const possibleMarker = new Set(frame);
    if (possibleMarker.size === MARKER_SIZE) {
      console.log(i + 1);
      break;
    }
    frame = frame.slice(1);
  }
});
