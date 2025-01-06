import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day7';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const isInt = Number.isInteger;

const runInstructions = (input: string[]): { [key: string]: number } => {
  const wires: { [key: string]: number } = {};

  const queue = input.map((i) => i);

  while (queue.length > 0) {
    const instruction = queue.shift()!;
    const [operation, output] = instruction.split(' -> ');
    let done = false;

    const ops = operation.split(' ');

    const getVal = (op: string): number => {
      if (isNaN(parseInt(op))) {
        return wires[op];
      } else {
        return parseInt(op);
      }
    };

    if (ops.length === 1 && !isNaN(parseInt(ops[0]))) {
      wires[output] = parseInt(operation);
      done = true;
    } else if (
      ops.length === 1 &&
      isNaN(parseInt(ops[0])) &&
      wires[operation]
    ) {
      wires[output] = wires[operation];
      done = true;
    } else if (
      ops[1] === 'AND' &&
      isInt(getVal(ops[0])) &&
      isInt(getVal(ops[2]))
    ) {
      wires[output] = getVal(ops[0]) & getVal(ops[2]);
      done = true;
    } else if (
      ops[1] === 'OR' &&
      isInt(getVal(ops[0])) &&
      isInt(getVal(ops[2]))
    ) {
      wires[output] = getVal(ops[0]) | getVal(ops[2]);
      done = true;
    } else if (ops[1] === 'LSHIFT' && isInt(wires[ops[0]])) {
      wires[output] = wires[ops[0]] << parseInt(ops[2]);
      done = true;
    } else if (ops[1] === 'RSHIFT' && isInt(wires[ops[0]])) {
      wires[output] = wires[ops[0]] >> parseInt(ops[2]);
      done = true;
    } else if (ops[0] === 'NOT' && isInt(wires[ops[1]])) {
      wires[output] = ~wires[ops[1]] & 0xffff;
      done = true;
    }

    if (!done) {
      queue.push(instruction);
    }
  }

  return wires;
};

export const part1 = (input: string[]): number => {
  return runInstructions(input)['a'];
};

export const part2 = (input: string[]): number => {
  const wires = runInstructions(input);
  const newInstructions = input.map((i) =>
    i.endsWith(' -> b') ? `${wires['a']} -> b` : i,
  );
  return runInstructions(newInstructions)['a'];
};
