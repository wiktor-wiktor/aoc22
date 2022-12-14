// npx tsc -w

export const x = '';

const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8');
const lines: string[] = input.split('\n');

console.time('runtime');

const packetsInTheRightOrder: number[] = [];

type packetPair = {
  leftPacket: Array<any> | number;
  rightPacket: Array<any> | number;
};

const comparePackets = (pp: packetPair, depth: number): number => {
  const leftSide = pp.leftPacket;
  const rightSide = pp.rightPacket;

  const tab = new Array(depth * 2).fill(' ').join('');

  if (leftSide === undefined) {
    return -1;
  } else if (rightSide === undefined) {
    return 1;
  }

  if (typeof leftSide === 'number' && typeof rightSide === 'number') {
    if (leftSide < rightSide) { return 1; }
    if (leftSide === rightSide) { return 0; }
    if (leftSide > rightSide) { return -1; }
  } else if (typeof leftSide === 'object' && typeof rightSide === 'number') {
    return comparePackets({ leftPacket: leftSide, rightPacket: [rightSide] }, depth + 1);
  } else if (typeof leftSide === 'number' && typeof rightSide === 'object') {
    return comparePackets({ leftPacket: [leftSide], rightPacket: rightSide }, depth + 1);
  } else if (typeof leftSide === 'object' && typeof rightSide === 'object') {
    for (let i = 0; i < Math.max(leftSide.length, rightSide.length); i++) {
      if (leftSide[i] === undefined) {
        return 1;
      }
      if (rightSide[i] === undefined) {
        return -1;
      }

      const comparison = comparePackets({ leftPacket: leftSide[i], rightPacket: rightSide[i] }, depth + 1);
      if (comparison !== 0) {
        return comparison;
      }
    }

    return 0;
  }
}

const allPackets = [];
lines.forEach((line: string, idx: number) => {
  if (line.length > 0) {
    allPackets.push(JSON.parse(line));
  }
});

let tmp: Array<any> | number;
lines.forEach((line: string, idx: number) => {
  if (idx % 3 === 0) {
    tmp = JSON.parse(line);
  } else if (idx % 3 === 1) {
    if (comparePackets({
      leftPacket: tmp,
      rightPacket: JSON.parse(line)
    }, 0) === 1) {
      packetsInTheRightOrder.push((idx - 1) / 3 + 1);
    }
  }
});

console.log(packetsInTheRightOrder.reduce((p, c) => p + c, 0));

allPackets.push([[2]]);
allPackets.push([[6]]);
allPackets.sort((ap, bp) => { return comparePackets({ leftPacket: bp, rightPacket: ap}, 0); });

let decoderKey;
for (let i = 0; i < allPackets.length; i++) {
  if (allPackets[i].length === 1 && allPackets[i][0].length === 1 && allPackets[i][0][0] === 2) {
    decoderKey = i + 1;
  }
  if (allPackets[i].length === 1 && allPackets[i][0].length === 1 && allPackets[i][0][0] === 6) {
    decoderKey *= i + 1;
  }
}

console.log(decoderKey);

console.timeEnd('runtime');
