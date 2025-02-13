import test from 'node:test';
import { getInputAsString } from '../../getInput.ts';

export const year = '2022';
export const day = 'day13';

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 13 },
];
export const testsPart2 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 140 },
];

type PacketElement = number | [] | number[] | PacketElement[];
type Pairs = { left: PacketElement; right: PacketElement }[];

const compare = (left: PacketElement, right: PacketElement): number => {
  if (typeof left === 'number' && typeof right === 'number') {
    return left === right ? 0 : left < right ? -1 : 1;
  } else if (typeof left === 'number') {
    return compare([left], right as PacketElement);
  } else if (typeof right === 'number') {
    return compare(left as PacketElement, [right]);
  } else {
    const minLengthLists = Math.min(left.length, right.length);
    for (let i = 0; i < minLengthLists; i += 1) {
      const isInOrderResult = compare(left[i], right[i]);
      if (isInOrderResult !== 0) return isInOrderResult;
    }
    return left.length < right.length ? -1 : right.length < left.length ? 1 : 0;
  }
};

export const part1 = (input: string): number => {
  const pairs: Pairs = input.split('\n\n').map((pair) => ({
    left: JSON.parse(pair.split('\n')[0]) as PacketElement,
    right: JSON.parse(pair.split('\n')[1]) as PacketElement,
  }));
  const inOrderPairs: number[] = [];
  pairs.forEach((pair, pairIndex) => {
    const pairIsInOrder = compare(pair.left, pair.right);
    if (pairIsInOrder === -1) {
      inOrderPairs.push(pairIndex + 1);
    }
  });
  const sumOfInOrderPairsIndexes = inOrderPairs.reduce(
    (total, index) => total + index,
    0,
  );
  return sumOfInOrderPairsIndexes;
};

export const part2 = (input: string): number => {
  const packets: PacketElement[] = input
    .split('\n\n')
    .map((pair) => [
      JSON.parse(pair.split('\n')[0]) as PacketElement,
      JSON.parse(pair.split('\n')[1]) as PacketElement,
    ]);
  const divider1 = [[2]];
  const divider2 = [[6]];
  const sortedPackets = [...packets.flat(), divider1, divider2].sort(compare);
  let indexOfDivider1 = -1;
  let indexOfDivider2 = -1;

  for (let i = 0; i < sortedPackets.length; i += 1) {
    if (JSON.stringify(divider1) === JSON.stringify(sortedPackets[i])) {
      indexOfDivider1 = i + 1;
    }
    if (JSON.stringify(divider2) === JSON.stringify(sortedPackets[i])) {
      indexOfDivider2 = i + 1;
    }
  }

  return indexOfDivider1 * indexOfDivider2;
};
