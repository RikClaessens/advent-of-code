import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day2';
export const testsPart1 = [
  { input: ['2x3x4'], result: 58 },
  { input: ['1x1x10'], result: 43 },
];

export const testsPart2 = [
  { input: ['2x3x4'], result: 34 },
  { input: ['1x1x10'], result: 14 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

export const part1 = (input: string[]): number => {
  return input.reduce((acc, line) => {
    const [l, w, h] = line.split('x').map(Number);
    const sides = [l * w, w * h, l * h];
    return acc + 2 * l * w + 2 * w * h + 2 * l * h + Math.min(...sides);
  }, 0);
};

export const part2 = (input: string[]): number => {
  return input.reduce((acc, line) => {
    const [l, w, h] = line.split('x').map(Number);
    const sides = [l + w, w + h, l + h];
    return acc + 2 * Math.min(...sides) + w * l * h;
  }, 0);
};
