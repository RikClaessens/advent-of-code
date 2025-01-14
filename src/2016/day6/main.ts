import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day6';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 'easter' },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 'advent' },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Counts = { [key: string]: number }[];

const findMessage = (
  input: string[],
  sorting: (a: [string, number], b: [string, number]) => number,
) => {
  const counts: Counts = Array(input[0].length)
    .fill(0)
    .map((_) => ({}));
  input.forEach((line) => {
    line.split('').forEach((c, ci) => {
      if (!counts[ci][c]) {
        counts[ci][c] = 0;
      }
      counts[ci][c]++;
    });
  });

  return Object.values(counts)
    .map((c) => Object.entries(c))
    .map((c) => c.sort(sorting))
    .map((c) => c[0][0])
    .join('');
};

export const part1 = (input: string[]): string =>
  findMessage(input, (a, b) => b[1] - a[1]);

export const part2 = (input: string[]): string =>
  findMessage(input, (a, b) => a[1] - b[1]);
