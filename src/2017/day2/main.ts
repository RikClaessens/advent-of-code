import { getInput } from '../../getInput.ts';
import { sum } from '../../utils.ts';

export const year = '2017';
export const day = 'day2';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 18 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test2.txt`), result: 9 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

export const part1 = (input: string[]): number =>
  input
    .map((row) => {
      let min = Infinity,
        max = -Infinity;
      row
        .split('\t')
        .map((n) => parseInt(n))
        .forEach((d) => {
          max = Math.max(max, d);
          min = Math.min(min, d);
        });
      return max - min;
    })
    .reduce(sum);

export const part2 = (input: string[]): number =>
  input
    .map((row) => {
      const numbers = row.split('\t').map((n) => parseInt(n));

      let result = 0;
      for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
          if (i !== j) {
            const n1 = numbers[i];
            const n2 = numbers[j];
            const div = Math.max(n1, n2) / Math.min(n1, n2);
            if (div % 1 === 0) {
              result = div;
            }
          }
        }
      }

      return result;
    })
    .reduce(sum);
