import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day8';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 12 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 19 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

export const part1 = (input: string[]): number =>
  input.reduce((acc, line) => acc + line.length - eval(line).length, 0);

export const part2 = (input: string[]): number =>
  input.reduce(
    (acc, line) =>
      acc + JSON.stringify(line).length - eval(JSON.stringify(line)).length,
    0,
  );
