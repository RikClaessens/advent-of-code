import { getInput } from '../../getInput.ts';
import { sum } from '../../utils.ts';

export const year = '2023';
export const day = 'day09';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 114 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 2 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

const last = (numbers: number[]) => numbers[numbers.length - 1];
const first = (numbers: number[]) => numbers[0];

const getNextInSequence = (numbers: number[]) => {
  const diffs: number[][] = [[...numbers]];
  do {
    diffs[diffs.length] = [];
    for (let i = 0; i < diffs[diffs.length - 2].length - 1; i += 1) {
      diffs[diffs.length - 1].push(
        diffs[diffs.length - 2][i + 1] - diffs[diffs.length - 2][i],
      );
    }
  } while (diffs[diffs.length - 1].find((d) => d !== 0));
  diffs[diffs.length - 1].push(0);
  for (let i = diffs.length - 2; i >= 0; i -= 1) {
    diffs[i].push(last(diffs[i + 1]) + last(diffs[i]));
  }
  return last(diffs[0]);
};

const getPreviousInSequence = (numbers: number[]) => {
  const diffs: number[][] = [[...numbers]];
  do {
    diffs[diffs.length] = [];
    for (let i = 0; i < diffs[diffs.length - 2].length - 1; i += 1) {
      diffs[diffs.length - 1].push(
        diffs[diffs.length - 2][i + 1] - diffs[diffs.length - 2][i],
      );
    }
  } while (diffs[diffs.length - 1].find((d) => d !== 0));
  diffs[diffs.length - 1].push(0);

  for (let i = diffs.length - 2; i >= 0; i -= 1) {
    diffs[i] = [first(diffs[i]) - first(diffs[i + 1]), ...diffs[i]];
  }
  return first(diffs[0]);
};

export const part1 = (input: string[]): number => {
  const results = input
    .map((l) => l.split(' ').map((n) => Number.parseInt(n)))
    .map(getNextInSequence);
  return results.reduce(sum);
};

export const part2 = (input: string[]): number => {
  const results = input
    .map((l) => l.split(' ').map((n) => Number.parseInt(n)))
    .map(getPreviousInSequence);
  return results.reduce(sum);
};
