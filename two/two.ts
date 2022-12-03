// npx tsc -w -p one.ts

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines = input.split('\n');

type play = 'A' | 'B' | 'C' | 'X' | 'Y' | 'Z';

console.log('lines: ', lines.length);

const ourPoints = {
  'X': 1,
  'Y': 2,
  'Z': 3,
  'A': 1,
  'B': 2,
  'C': 3,
}

const getScore = (their: play, our: play): number => {
  if (their === 'A' && our === 'X' || their === 'B' && our === 'Y' || their === 'C' && our === 'Z') {
    return 3;
  }

  if (their === 'A' && our === 'Y' || their === 'B' && our === 'Z' || their === 'C' && our === 'X') {
    return 6;
  }

  return 0;
}

const getScore_pt2 = (their: play, outcome: play): number | undefined => {
  switch (outcome) {
    case 'X':
      console.log(outcome, 0, (ourPoints[their] - 1) || 3);
      return 0 + ((ourPoints[their] - 1) || 3);
    case 'Y':
      console.log(outcome, 3, ourPoints[their]);
      return 3 + ourPoints[their];
    case 'Z':
      console.log(outcome, 6, ((ourPoints[their] + 1) % 4) || 1);
      return 6 + (((ourPoints[their] + 1) % 4) || 1);
  }
}

let total = 0;

lines.forEach((line: string) => {
  const plays: string[] = line.split(' ');
  const their = plays[0] as play;
  const our = plays[1] as play;
  const outcome = plays[1] as play;

  //const score = getScore(their, our) + ourPoints[our];
  const score_2 = getScore_pt2(their, outcome);
  console.log(score_2);

  total += score_2;
});

console.log('total: ', total);
