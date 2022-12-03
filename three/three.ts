// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

const theAlphabet = new Map<string, number>([
    ['a', 1], ['A', 27],
    ['b', 2], ['B', 28],
    ['c', 3], ['C', 29],
    ['d', 4], ['D', 30],
    ['e', 5], ['E', 31],
    ['f', 6], ['F', 32],
    ['g', 7], ['G', 33],
    ['h', 8], ['H', 34],
    ['i', 9], ['I', 35],
    ['j', 10], ['J', 36],
    ['k', 11], ['K', 37],
    ['l', 12], ['L', 38],
    ['m', 13], ['M', 39],
    ['n', 14], ['N', 40],
    ['o', 15], ['O', 41],
    ['p', 16], ['P', 42],
    ['q', 17], ['Q', 43],
    ['r', 18], ['R', 44],
    ['s', 19], ['S', 45],
    ['t', 20], ['T', 46],
    ['u', 21], ['U', 47],
    ['v', 22], ['V', 48],
    ['w', 23], ['W', 49],
    ['x', 24], ['X', 50],
    ['y', 25], ['Y', 51],
    ['z', 26], ['Z', 52]
  ]
);

let total = 0;

lines.forEach((line: string) => {
  const first: string = line.substring(0, line.length / 2);
  const second: string = line.substring(line.length / 2);

  let theLetter = '';

  first.split('').some(letter => {
    theLetter = letter;
    return second.indexOf(letter) !== -1;
  });

  total += theAlphabet.get(theLetter) || 0;
});

console.log('total: ', total);

const threes: [string, string, string][] = lines.flatMap((line, idx) => {
  if (idx % 3 !== 0) {
    return [];
  }

  return [[line, lines[idx + 1], lines[idx + 2]]];

});

let total_2 = 0;

threes.forEach(three => {
  let commonOfTwo = '';
  three[0].split('').forEach(letter => {
    if (three[1].indexOf(letter) !== -1) {
      commonOfTwo += letter;
    };
  });

  let commonOfThree = '---';
  commonOfTwo.split('').some(letter => {
    commonOfThree = letter;
    return three[2].indexOf(letter) !== -1;
  });

  console.log(commonOfThree);
  total_2 += theAlphabet.get(commonOfThree) || 0;
});

console.log('total_2: ', total_2);
