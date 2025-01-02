import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day01';
export const testsPart1 = [
  { input: '(())', result: 0 },
  { input: '()()', result: 0 },
  { input: '(((', result: 3 },
  { input: '(()(()(', result: 3 },
  { input: '))(((((', result: 3 },
  { input: '())', result: -1 },
  { input: '))(', result: -1 },
  { input: ')))', result: -3 },
  { input: ')())())', result: -3 },
];

export const testsPart2 = [
  { input: ')', result: 1 },
  { input: '()())', result: 5 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const part1 = (input: string): number => {
  return input.replaceAll(')', '').length - input.replaceAll('(', '').length;
};

export const part2 = (input: string): number => {
  for (let i = 0; i <= input.length; i += 1) {
    const floor =
      input.slice(0, i).replaceAll(')', '').length -
      input.slice(0, i).replaceAll('(', '').length;
    if (floor === -1) {
      return i;
    }
  }

  return 0;
};
