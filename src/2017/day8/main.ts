import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day8';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 1 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 10 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const runInstructions = (input: string[]): [number, number] => {
  const registers: Record<string, number> = {};
  let maxAtEnd = -Infinity;
  let maxDuringProcess = -Infinity;

  const initReg = (reg: string) => {
    if (!registers[reg]) {
      registers[reg] = 0;
    }
  };

  const inc = (reg: string, delta: number) => {
    initReg(reg);
    registers[reg] += delta;
  };

  const dec = (reg: string, delta: number) => inc(reg, -delta);

  const doOperation = (reg: string, delta: number, operation: string) => {
    if (operation === 'inc') {
      inc(reg, delta);
    } else if (operation === 'dec') {
      dec(reg, delta);
    }
  };

  input.forEach((instruction) => {
    const match = instruction.match(
      /^(\w+) (inc|dec) (-?\d+) if (\w+) ([!<>=]+) (-?\d+)$/,
    )!;
    const [, reg, operation, delta, regCondition, condition, conditionNumber] =
      match;

    const regNum = registers[regCondition] || 0;
    const num = parseInt(conditionNumber);

    if (
      (condition === '>' && regNum > num) ||
      (condition === '>=' && regNum >= num) ||
      (condition === '<' && regNum < num) ||
      (condition === '<=' && regNum <= num) ||
      (condition === '==' && regNum == num) ||
      (condition === '!=' && regNum !== num)
    ) {
      doOperation(reg, parseInt(delta), operation);
      Object.values(registers).forEach(
        (v) => (maxDuringProcess = Math.max(v, maxDuringProcess)),
      );
    }
  });

  Object.values(registers).forEach((v) => (maxAtEnd = Math.max(v, maxAtEnd)));

  return [maxAtEnd, maxDuringProcess];
};

export const part1 = (input: string[]): number => runInstructions(input)[0];

export const part2 = (input: string[]): number => runInstructions(input)[1];
