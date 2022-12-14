// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

console.time('runtime');

const THE_ALPHABET = new Map<string, number>([['S', 0], ['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5], ['f', 6], ['g', 7], ['h', 8], ['i', 9], ['j', 10], ['k', 11], ['l', 12], ['m', 13], ['n', 14], ['o', 15], ['p', 16], ['q', 17], ['r', 18], ['s', 19], ['t', 20], ['u', 21], ['v', 22], ['w', 23], ['x', 24], ['y', 25], ['z', 26], ['E', 27]]);

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
let start: node;
let exit: coord;

lines.forEach((line: string, idx: number) => {
  for (let i = 0; i < line.length; i++) {
    const heightHere = line[i];
    if (heightHere === 'S') {
      start = {
        position: { x: i, y: idx },
        height: heightHere,
        to: null,
        shortestToHere: Infinity,
      };
    }

    if (heightHere === 'E') {
      exit = { x: i, y: idx };
    }

    map[i][idx] = {
      position: { x: i, y: idx },
      height: heightHere,
      to: null,
      shortestToHere: Infinity,
    };
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

let shortestWay: node[];
let shortestWayLength = Infinity;
let longestWaySoFar = 0;
let ways = 1;
const findWays = (path: node[]): void => {
  ways++;
  if (Math.random() * 600000 < 10) {
    console.log('');
    console.log('longest so far: ', longestWaySoFar);
    console.log('current open ways: ', ways.toString().padStart(12, '0'));
    console.log('SHORTEST SO FAR: ', shortestWayLength);
  }
  const last = path[path.length - 1];
  if (path.length > longestWaySoFar) {
    longestWaySoFar = path.length;
  }
  if (last.position.x === exit.x && last.position.y === exit.y) {
    if (shortestWayLength > path.length) {
      shortestWayLength = path.length;
      shortestWay = path;
    }
    ways--;
    return;
  }

  if (last.shortestToHere < path.length) {
    ways--;
    return;
  } else {
    last.shortestToHere = path.length;
  }

  if (last.to === null) {
    setPossibleToNodes(last);
  }

  let newWaysOpened = 0;
  last.to.forEach((n) => {
    if (path.indexOf(n) === -1) {
      newWaysOpened += 1;
      findWays([...path, n]);
    }
  });

  ways--;
}

findWays([start]);

console.error(shortestWayLength);

console.timeEnd('runtime');
