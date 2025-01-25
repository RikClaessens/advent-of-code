import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day23';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 3 },
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

  const instructions = input.map((i) => [i, false] as [string, boolean]);
  while (i < instructions.length) {
    const ins = instructions[i][0].split(' ');
    const isToggled = instructions[i][1];
    let command = ins[0];
    if (isToggled) {
      if (command === 'inc') {
        command = 'dec';
      } else if (['tgl', 'dec'].includes(command)) {
        command = 'inc';
      } else if (command === 'jnz') {
        command = 'cpy';
      } else if (command === 'cpy') {
        command = 'jnz';
      }
    }

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
      if (registers[ins[1] as keyof Registers] !== 0) {
        i += getVal(ins[2], registers);
      } else {
        i++;
      }
    } else if (command === 'tgl') {
      const val = i + getVal(ins[1], registers);
      if (val >= 0 && val < instructions.length) {
        instructions[val][1] = !instructions[val][1];
      }
      i++;
    }
  }

  return registers.a;
};

const f: number[] = [];
const factorial = (n: number): number => {
  if (n == 0 || n == 1) return 1;
  if (f[n] > 0) return f[n];
  return (f[n] = factorial(n - 1) * n);
};

export const part1 = (input: string[]): number =>
  runProgram(input, { a: 7, b: 0, c: 0, d: 0 });

export const part2 = (input: string[]): number => {
  const cpy = input.find((i) => {
    const n = parseInt(i.split(' ')[1]);
    return i.startsWith('cpy') && !isNaN(n) && n > 0;
  });
  const jnz = input.find((i) => {
    const n = parseInt(i.split(' ')[1]);
    return i.startsWith('jnz') && !isNaN(n) && n > 1;
  });
  return (
    factorial(12) +
    parseInt((jnz || '')?.split(' ')[1]) * parseInt((cpy || '')?.split(' ')[1])
  );
  // runProgram(input, { a: 12, b: 0, c: 0, d: 0 }); also works, but super slow
};
