import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day25';
export const testsPart1 = [];

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

const runProgram = (input: string[], registers: Registers): number[] => {
  let i = 0;

  const instructions = input.map((i) => [i, false] as [string, boolean]);
  const output: number[] = [];
  while (i < instructions.length) {
    const ins = instructions[i][0].split(' ');
    const command = ins[0];
    if (command === 'cpy') {
      registers[ins[2] as keyof Registers] = getVal(ins[1], registers);
      i++;
    } else if (command === 'inc') {
      registers[ins[1] as keyof Registers]++;
      i++;
    } else if (command === 'dec') {
      registers[ins[1] as keyof Registers]--;
      i++;
    } else if (command === 'jnz') {
      if (getVal(ins[1], registers) !== 0) {
        i += getVal(ins[2], registers);
      } else {
        i++;
      }
    } else if (command === 'out') {
      output.push(getVal(ins[1], registers));
      if (output.length === 8) {
        i = Infinity;
      }
      i++;
    }
  }

  return output;
};

export const part1 = (input: string[]): number => {
  let a = 0;
  const target = [0, 1, 0, 1, 0, 1, 0, 1];
  while (true) {
    const output = runProgram(input, { a, b: 0, c: 0, d: 0 });
    if (
      output.length === target.length &&
      output.every((o, i) => o === target[i])
    ) {
      break;
    }
    a++;
  }

  return a;
};

export const part2 = (input: string[]): number => {
  return 0;
};
