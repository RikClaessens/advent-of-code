import { getInput } from '../../getInput.ts';
import { Arith, init as initZ3Solver } from 'z3-solver';

export const year = '2025';
export const day = 'day10';
export const testsPart1 = [
  { input: [`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}`], result: 2 },
  {
    input: [`[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}`],
    result: 3,
  },
  {
    input: [`[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`],
    result: 2,
  },
  { input: getInput(`src/${year}/${day}/test.txt`), result: 7 },
];

export const testsPart2 = [
  {
    input: [`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}`],
    result: 10,
  },
  {
    input: [`[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}`],
    result: 12,
  },
  {
    input: [`[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`],
    result: 11,
  },
  { input: getInput(`src/${year}/${day}/test.txt`), result: 33 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Machine = {
  lightDiagram: number[];
  buttons: number[][];
  joltage: number[];
  state: number[];
  buttonPressCount: number;
};

const getMachines = (input: string[]): Machine[] => {
  const machines: Machine[] = [];
  for (const line of input) {
    const lightDiagram = line
      .substring(1, line.indexOf(']'))
      .split('')
      .map((c) => (c === '#' ? 1 : 0));
    const buttons: number[][] = line
      .substring(line.indexOf(']') + 3, line.indexOf('{') - 1)
      .split('(')
      .map((b) => b.trim())
      .map((b) => b.substring(0, b.length - 1))
      .map((b) => b.split(',').map((n) => parseInt(n)));
    const joltage = line
      .substring(line.indexOf('{') + 1, line.length - 1)
      .split(',')
      .map((n) => parseInt(n));
    machines.push({
      lightDiagram,
      buttons,
      joltage,
      state: Array(lightDiagram.length).fill(0),
      buttonPressCount: 0,
    });
  }
  return machines;
};

const pressButton = (state: number[], buttons: number[]): number[] => {
  const result = [...state];
  for (const b of buttons) {
    result[b] ^= 1;
  }
  return result;
};

const pressButtonPart2 = (state: number[], buttons: number[]): number[] => {
  const result = [...state];
  for (const b of buttons) {
    result[b] += 1;
  }
  return result;
};

const stateEquals = (s1: number[], s2: number[]): boolean =>
  s1.every((s, i) => s === s2[i]);

const findFewestNumberOfButtonPresses = (machine: Machine): number => {
  const queue: [number[], number][] = [[machine.state, 0]];
  const explored = new Set<string>(machine.state.join(''));
  const target = machine.lightDiagram;
  const buttons = machine.buttons;
  let current: [number[], number] | undefined = undefined;
  while ((current = queue.shift())) {
    if (stateEquals(current[0], target)) {
      break;
    }

    for (const buttonsToPress of buttons) {
      const newState = pressButton(current[0], buttonsToPress);
      if (!explored.has(newState.join(''))) {
        explored.add(newState.join(''));
        queue.push([newState, current[1] + 1]);
      }
    }
  }

  return current?.[1] || -1;
};

const findFewestNumberOfButtonPressesPart2 = (machine: Machine): number => {
  const queue: [number[], number][] = [[machine.state, 0]];
  const explored = new Set<string>(machine.state.join(''));
  const target = machine.joltage;
  const buttons = machine.buttons;
  let current: [number[], number] | undefined = undefined;
  while ((current = queue.shift())) {
    if (stateEquals(current[0], target)) {
      break;
    }

    for (const buttonsToPress of buttons) {
      const newState = pressButtonPart2(current[0], buttonsToPress);
      if (!explored.has(newState.join(''))) {
        explored.add(newState.join(''));
        if (newState.every((n, i) => n <= target[i])) {
          queue.push([newState, current[1] + 1]);
        }
      }
    }
  }

  return current?.[1] || -1;
};

export const part1 = (input: string[]): number =>
  getMachines(input).reduce(
    (sum, m) => sum + findFewestNumberOfButtonPresses(m),
    0,
  );

export const part2 = (input: string[]): number => {
  if (input.length <= 3) {
    return getMachines(input).reduce(
      (sum, m) => sum + findFewestNumberOfButtonPressesPart2(m),
      0,
    );
  }
  console.warn(
    '🔔 Use `pn start` in folder advent-of-code/2025-day10-part2 for part 2 as Deno was giving troubles with the z3-solver',
  );
  return 0;
};
