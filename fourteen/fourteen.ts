// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

console.time('runtime');

type coord = {
  x: number;
  y: number
};

const X_OF_SAND_SOURCE = 500;

let boundariesX: [number, number] = [X_OF_SAND_SOURCE, X_OF_SAND_SOURCE];
let boundariesY: [number, number] = [0, 0];

lines.forEach((line: string, idx: number) => {
  const coordsArray: string[] = line.split(' -> ');
  coordsArray.forEach(coord => {
    const xy: number[] = coord.split(',').map(c => parseInt(c));

    if (xy[0] < boundariesX[0]) {
      boundariesX[0] = xy[0];
    }
    if (xy[0] > boundariesX[1]) {
      boundariesX[1] = xy[0];
    }

    if (xy[1] < boundariesY[0]) {
      boundariesY[0] = xy[1];
    }
    if (xy[1] > boundariesY[1]) {
      boundariesY[1] = xy[1];
    }
  });
});

const offset = (X_OF_SAND_SOURCE - boundariesY[1]) - 3;

// map has a padding: 0 2 at the level (bedrock - 1)
const map: string[][] = new Array(boundariesY[1] * 2 + 7).fill('').map(() => new Array(boundariesY[1] + 3).fill('.'));
console.log(boundariesX);
console.log(boundariesY);
console.log(map.length, map[0].length);

const printMap = (): void => {
  for (let j = 0; j < map[0].length; j++) {
    let row = '';
    for (let i = 0; i < map.length; i++) {
      row += map[i][j];
    }
    console.log(row);
  }
  console.log();
}

for (let i = 0; i < map.length; i++) {
  map[i][map[0].length - 1] = '#';
}

const fillALine = (from: coord, to: coord): void => {
  if (from.x === to.x) {
    const minY = Math.min(from.y, to.y);
    const maxY = Math.max(from.y, to.y);
    // console.log(from, to, `${minY} - ${maxY}`);
    for (let i = minY; i < maxY + 1; i++) {
      if (from.x - offset > -1 && from.x - offset < map.length) {
        map[from.x - offset][i] = i.toString();
      }
    }
  } else if (from.y === to.y) {
    const minX = Math.min(from.x, to.x);
    const maxX = Math.max(from.x, to.x);
    // console.log(from, to, `${minX} - ${maxX}`);
    for (let i = 0; i < maxX - minX + 1; i++) {
      if (i + minX - offset > -1 && i + minX - offset < map.length) {
        map[i + minX - offset][from.y] = i.toString();
      }
    }
  } else {
    console.error('NO, NOPE, shouldt happen');
  }
}

const moveGainAStep = (position: coord): boolean => {
  if (map[position.x][position.y + 1] === '.') {
    position.y += 1;
    return true;
  }

  if (map[position.x][position.y + 1] !== '.') {
    if (map[position.x - 1][position.y + 1] === '.') {
      position.x -= 1;
      position.y += 1;
      return true;
    }
    if (map[position.x + 1][position.y + 1] === '.') {
      position.x += 1;
      position.y += 1;
      return true;
    }
    map[position.x][position.y] = 'o';
    return false;
  }
}

const dropGrain = (): boolean => {
  let currentGrainPosition: coord = { x: X_OF_SAND_SOURCE - offset, y: 0 };

  if (map[currentGrainPosition.x][currentGrainPosition.y] === 'o') {
    return false;
  }

  while (moveGainAStep(currentGrainPosition)) {
    if (currentGrainPosition.y === map[0].length - 1) {
      return false;
    }
  }
  
  return true;
}

lines.forEach((line: string, idx: number) => {
  const coordsArray: string[] = line.split(' -> ');

  for (let i = 0; i < coordsArray.length - 1; i++) {
    const fromArray: string[] = coordsArray[i].split(',');
    const toArray: string[] = coordsArray[i + 1].split(',');
  
    fillALine(
      { x: parseInt(fromArray[0]), y: parseInt(fromArray[1]) },
      { x: parseInt(toArray[0]), y: parseInt(toArray[1]) }
    );

    // printMap();
  }
});

let grainsCounter = 0;

// setInterval(() => {
//   const g = dropGrain();
//   printMap();
//   grainsCounter++;
//   if (!g) { console.log(grainsCounter)}
// }, 120);

while (dropGrain()) {
  grainsCounter++;
}

console.log(grainsCounter);

console.timeEnd('runtime');
