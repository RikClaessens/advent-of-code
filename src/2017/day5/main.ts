import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day5';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 5 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 10 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

export const part1 = (input: string[]): number => {
  let current = 0;
  let jumps = 0;
  const offsets = input.map((n) => Number.parseInt(n));
  while (current < input.length) {
    jumps += 1;
    const prev = current;
    current += offsets[current];
    offsets[prev] += 1;
  }
  return jumps;
};

export const part2 = (input: string[]): number => {
  let current = 0;
  let jumps = 0;
  const offsets = input.map((n) => Number.parseInt(n));
  while (current < input.length) {
    jumps += 1;
    const prev = current;
    const offset = offsets[current];
    current += offset;
    if (offset >= 3) {
      offsets[prev] -= 1;
    } else {
      offsets[prev] += 1;
    }
  }
  return jumps;
};
