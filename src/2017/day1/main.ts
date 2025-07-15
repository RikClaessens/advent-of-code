import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day1';
export const testsPart1 = [
  { input: '1122', result: 3 },
  { input: '1111', result: 4 },
  { input: '1234', result: 0 },
  { input: '91212129', result: 9 },
];

export const testsPart2 = [
  { input: '1212', result: 6 },
  { input: '1221', result: 0 },
  { input: '123425', result: 4 },
  { input: '123123', result: 12 },
  { input: '12131415', result: 4 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const solve = (input: string, next: number): number =>
  input
    .split('')
    .map((c, i) => {
      return input[i] === input[(i + next) % input.length]
        ? Number.parseInt(c)
        : 0;
    })
    .reduce((sum, val) => sum + val, 0);

export const part1 = (input: string): number => solve(input, 1);

export const part2 = (input: string): number => solve(input, input.length / 2);
