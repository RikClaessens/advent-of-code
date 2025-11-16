import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day23';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const initRegisters = (): Record<string, number> => {
  return {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  };
};

const runInstructions = (input: string[]): number => {
  let numberOfMuls = 0;
  const registers = initRegisters();

  for (let i = 0; i < input.length; i += 1) {
    const [ins, x, y] = input[i].split(' ');

    let valY = undefined;
    if (y && isNaN(parseInt(y))) {
      if (!registers[y]) {
        registers[y] = 0;
      }
      valY = registers[y];
    } else if (y) {
      valY = parseInt(y);
    }

    switch (ins) {
      case 'set':
        registers[x] = valY!;
        break;
      case 'sub':
        registers[x] -= valY!;
        break;
      case 'mul':
        registers[x] *= valY!;
        numberOfMuls += 1;
        break;
      case 'jnz':
        if (registers[x] !== 0) {
          i += valY! - 1;
        }
        break;
    }
  }

  return numberOfMuls;
};

const runEfficientLoopPart2 = (): number => {
  let b = 109900;
  const c = 126900;
  let h = 0;

  for (b = 109900; b <= c; b += 17) {
    let isComposite = false;

    const sqrtB = Math.sqrt(b);
    for (let d = 2; d <= sqrtB; d++) {
      if (b % d === 0) {
        isComposite = true;
        break;
      }
    }

    if (isComposite) {
      h++;
    }
  }

  return h;
};

export const part1 = (input: string[]): number => runInstructions(input);

export const part2 = (): number => runEfficientLoopPart2();
