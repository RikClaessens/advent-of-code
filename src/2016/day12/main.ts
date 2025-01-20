import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day12';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 42 },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Registers = {
  a: number;
  b: number;
  c: number;
  d: number;
};

const getVal = (val: string, registers: Registers): number => {
  if (isNaN(parseInt(val))) {
    return registers[val as keyof Registers];
  } else {
    return parseInt(val);
  }
};

const runProgram = (input: string[], registers: Registers): number => {
  let i = 0;
  while (i < input.length) {
    const ins = input[i].split(' ');
    if (ins[0] === 'cpy') {
      registers[ins[2] as keyof Registers] = getVal(ins[1], registers);
      i++;
    } else if (ins[0] === 'inc') {
      registers[ins[1] as keyof Registers]++;
      i++;
    } else if (ins[0] === 'dec') {
      registers[ins[1] as keyof Registers]--;
      i++;
    } else if (ins[0] === 'jnz') {
      if (registers[ins[1] as keyof Registers] !== 0) {
        i += parseInt(ins[2]);
      } else {
        i++;
      }
    }
  }

  return registers.a;
};

export const part1 = (input: string[]): number =>
  runProgram(input, { a: 0, b: 0, c: 0, d: 0 });

export const part2 = (input: string[]): number =>
  runProgram(input, { a: 0, b: 0, c: 1, d: 0 });
