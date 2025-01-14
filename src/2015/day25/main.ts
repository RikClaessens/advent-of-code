import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day25';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const parseInput = (input: string): [number, number] => {
  const [_, row, column] = input.match(
    /To continue, please consult the code grid in the manual.\s+Enter the code at row (\d+), column (\d+)./,
  ) as string[];
  return [parseInt(row), parseInt(column)];
};

const getNextCode = (code: number): number => (code * 252533) % 33554393;

export const part1 = (input: string): number => {
  const [row, column] = parseInput(input);

  let r = 1;
  let c = 1;
  let nextR = 1;
  let code = 20151125;
  while (row !== r || column !== c) {
    code = getNextCode(code);
    if (r === 1) {
      nextR++;
      r = nextR;
      c = 1;
    } else {
      r--;
      c++;
    }
  }

  return code;
};

export const part2 = (): number => {
  return 0;
};
