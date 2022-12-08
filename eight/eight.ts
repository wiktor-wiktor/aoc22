// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const forest: Map<string, number> = new Map();
const visibilityFlags: Map<string, boolean> = new Map();

const forestHeight = lines.length;
const forestWidth = lines[0].length;

const edgeTreesCount = 2 * forestWidth + 2 * forestHeight - 4;

console.time("runtime");

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    forest.set(`${i} ${j}`, parseInt(lines[i][j]));
  }
}

let totalVisible = edgeTreesCount;

const assessTreeVisibilityHere = (i: number, j: number, currentMax: { value: number }): boolean => {
  if (currentMax.value === 9) {
    return true;
  }
  const treeHeight = forest.get(`${i} ${j}`);
  const currentVisibilityHere = visibilityFlags.get(`${i} ${j}`);

  if (!currentVisibilityHere && treeHeight > currentMax.value) {
    visibilityFlags.set(`${i} ${j}`, true);
    totalVisible += 1;

  }

  if (treeHeight > currentMax.value) {
    currentMax.value = treeHeight;
  }

  // no point in looking further in this row and direction
  if (treeHeight === 9) {
    return true;
  }
  return false;
}

// left to right
for (let i = 1; i < forestHeight - 1; i++) {
  let currentMax = { value: parseInt(lines[i][0]) };
  for (let j = 1; j < forestWidth - 1; j++) {
    const isMax = assessTreeVisibilityHere(i, j, currentMax);
    if (isMax) {
      break;
    }
  }
}

// top to bottom
for (let i = 1; i < forestWidth - 1; i++) {
  let currentMax = { value: parseInt(lines[0][i]) };
  for (let j = 1; j < forestHeight - 1; j++) {
    const isMax = assessTreeVisibilityHere(j, i, currentMax);
    if (isMax) {
      break;
    }
  }

}

// right to left
for (let i = 1; i < forestHeight - 1; i++) {
  let currentMax = { value: parseInt(lines[i][forestWidth - 1]) };
  for (let j = 1; j < forestWidth - 1; j++) {
    const isMax = assessTreeVisibilityHere(i, forestWidth - 1 - j, currentMax);
    if (isMax) {
      break;
    }
  }

}

// bottom to top
for (let i = 1; i < forestWidth - 1; i++) {
  let currentMax = { value: parseInt(lines[forestHeight - 1][i]) };
  for (let j = 1; j < forestHeight - 1; j++) {
    const isMax = assessTreeVisibilityHere(forestHeight - 1 - j, i, currentMax);
    if (isMax) {
      break;
    }
  }

}

console.timeEnd('runtime');
console.log(totalVisible);
console.time('runtime pt2');

let bestScenicScore = 0;

const assessTreeScenicScore = (x: number, y: number): number => {
  let visibleToTop = 0;
  let visibleToRight = 0;
  let visibleToBottom = 0;
  let visibleToLeft = 0;

  const heightHere = forest.get(`${x} ${y}`);

  for (let i = 0; i < x; i++) {
    const currentHeight = forest.get(`${x - i - 1} ${y}`);
    visibleToTop += 1;
    if (currentHeight >= heightHere) {
      break;
    }
  }

  for (let i = 0; i < forestWidth - y - 1; i++) {
    const currentHeight = forest.get(`${x} ${y + i + 1}`);
    visibleToRight += 1;
    if (currentHeight >= heightHere) {
      break;
    }
  }

  for (let i = 0; i < forestHeight - x - 1; i++) {
    const currentHeight = forest.get(`${x + i + 1} ${y}`);
    visibleToBottom += 1;
    if (currentHeight >= heightHere) {
      break;
    }
  }

  for (let i = 0; i < y; i++) {
    const currentHeight = forest.get(`${x} ${y - i - 1}`);
    visibleToLeft += 1;
    if (currentHeight >= heightHere) {
      break;
    }
  }
  return visibleToTop * visibleToRight * visibleToBottom * visibleToLeft;
}

for (let i = 0; i < forestHeight; i++) {
  for (let j = 0; j < forestWidth; j++) {
    const scsc = assessTreeScenicScore(i, j);
    if (scsc > bestScenicScore) {
      bestScenicScore = scsc;
    }
  }
}

console.timeEnd('runtime pt2');
console.log(bestScenicScore);
