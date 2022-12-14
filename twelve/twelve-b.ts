// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

console.time('runtime');

const THE_ALPHABET = new Map<string, number>([['S', 1], ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], ['j', 10], ['k', 11], ['l', 12], ['m', 13], ['n', 14], ['o', 15], ['p', 16], ['q', 17], ['r', 18], ['s', 19], ['t', 20], ['u', 21], ['v', 22], ['w', 23], ['x', 24], ['y', 25], ['z', 26], ['E', 26]]);

type coord = {
  x: number;
  y: number;
}

type node = {
  position: coord;
  height: string;
  to: node[] | null;
  shortestToHere: number;
};

const MAP_WIDTH = lines[0].length;
const MAP_HEIGHT = lines.length;

const map: node[][] = new Array(MAP_WIDTH).fill('').map(() => new Array(MAP_HEIGHT));
let start: coord;
let exit: coord;

lines.forEach((line: string, idx: number) => {
  for (let i = 0; i < line.length; i++) {
    const heightHere = line[i];

    if (heightHere === 'E') {
      exit = { x: i, y: idx };
    }

    map[i][idx] = {
      position: { x: i, y: idx },
      height: heightHere,
      to: null,
      shortestToHere: Infinity,
    };

    if (heightHere === 'S') {
      start = { x: i, y: idx };
      map[i][idx].shortestToHere = 0;
    }
  }
});

const canGet = (fromHeight: string, toNode: node): boolean => {
  return (THE_ALPHABET.get(fromHeight) > THE_ALPHABET.get(toNode.height) - 2);
}

const setPossibleToNodes = (from: node): void => {
  if (from.to === null) {
    from.to = [];
  }

  if (from.position.x > 0) {
    const possibleTo = map[from.position.x - 1][from.position.y];
    if (canGet(from.height, possibleTo)) {
      from.to.push(possibleTo);
    }
  }
  if (from.position.y > 0) {
    const possibleTo = map[from.position.x][from.position.y - 1];
    if (canGet(from.height, possibleTo)) {
      from.to.push(possibleTo);
    }
  }
  if (from.position.x < MAP_WIDTH - 1) {
    const possibleTo = map[from.position.x + 1][from.position.y];
    if (canGet(from.height, possibleTo)) {
      from.to.push(possibleTo);
    }
  }
  if (from.position.y < MAP_HEIGHT - 1) {
    const possibleTo = map[from.position.x][from.position.y + 1];
    if (canGet(from.height, possibleTo)) {
      from.to.push(possibleTo);
    }
  }
};

const process = (here: node, processedAlready: Map<string, node>, toProcess: node[]): boolean => {
  if (processedAlready.get(JSON.stringify(here.position)) !== undefined) {
    toProcess.shift();
    return;
  }

  if (here.to === null) {
    setPossibleToNodes(here);
  }

  processedAlready.set(JSON.stringify(here.position), here);

  here.to.forEach(n => {
    if (here.shortestToHere + 1 < n.shortestToHere) {
      n.shortestToHere = here.shortestToHere + 1;
    }
  });

  toProcess.push(...here.to);
  toProcess.shift();

  return here.height === 'E';
}

const resetShortestValues = (): void => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      map[i][j].shortestToHere = Infinity;
    }
  }
}

const differentStarts: number[] = [];
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const here = map[i][j];
    resetShortestValues();
    if (here.height === 'a' || here.height === 'S') {
      const processedAlready = new Map<string, node>();
      const toProcess: node[] = [];
      
      here.shortestToHere = 0;
      toProcess.push(here);
      while (toProcess.length > 0) {
        const arrivedAtE = process(toProcess[0], processedAlready, toProcess);
        toProcess.sort((ha, hb) => ha.shortestToHere - hb.shortestToHere);

        if (arrivedAtE) {
          differentStarts.push(map[exit.x][exit.y].shortestToHere);
          break;
        }
      };
    }
  }
}

differentStarts.sort((sa, sb) => sa - sb);
console.log(differentStarts);

console.error();

console.timeEnd('runtime');
