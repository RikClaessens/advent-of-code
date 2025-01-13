import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day23';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const runProgram = (input: string[], registers: { a: number; b: number }) => {
  let i = 0;

  while (i < input.length) {
    const ins = input[i]
      .split(', ')
      .map((s) => s.split(' '))
      .flat();

    let di = 1;

    if (ins[0] === 'hlf') {
      registers[ins[1] as 'a' | 'b'] /= 2;
    } else if (ins[0] === 'tpl') {
      registers[ins[1] as 'a' | 'b'] *= 3;
    } else if (ins[0] === 'inc') {
      registers[ins[1] as 'a' | 'b'] += 1;
    } else if (ins[0] === 'jmp') {
      di = parseInt(ins[1]);
    } else if (ins[0] === 'jie' && registers[ins[1] as 'a' | 'b'] % 2 === 0) {
      di = parseInt(ins[2]);
    } else if (ins[0] === 'jio' && registers[ins[1] as 'a' | 'b'] === 1) {
      di = parseInt(ins[2]);
    }
    i += di;
  }

  return registers.b;
};

export const part1 = (input: string[]): number =>
  runProgram(input, { a: 0, b: 0 });

export const part2 = (input: string[]): number =>
  runProgram(input, { a: 1, b: 0 });
