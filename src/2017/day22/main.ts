import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day22';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { bursts: 7 },
    result: 5,
  },
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { bursts: 70 },
    result: 41,
  },
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { bursts: 10000 },
    result: 5587,
  },
];

export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { bursts: 100 },
    result: 26,
  },
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { bursts: 10000000 },
    result: 2511944,
  },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Pos = [number, number];
const posToKey = (pos: Pos): string => `${pos[0]}/${pos[1]}`;

const dirDeltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const move = (pos: Pos, dir: number): Pos => [
  pos[0] + dirDeltas[dir][0],
  pos[1] + dirDeltas[dir][1],
];

const runVirusCarrierPart1 = (input: string[], bursts: number): number => {
  let pos: Pos = [(input.length - 1) / 2, (input.length - 1) / 2];
  const infectedCells = new Set<string>();
  let numberOfInfections = 0;
  let dir = 0; // up

  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c === '#') {
        infectedCells.add(posToKey([y, x]));
      }
    });
  });

  for (let i = 0; i < bursts; i += 1) {
    const posKey = posToKey(pos);
    if (infectedCells.has(posKey)) {
      dir = (dir + 1) % 4;
      infectedCells.delete(posKey);
    } else {
      dir = (dir + 3) % 4;
      infectedCells.add(posKey);
      numberOfInfections += 1;
    }
    pos = move(pos, dir);
  }

  return numberOfInfections;
};

const runVirusCarrierPart2 = (input: string[], bursts: number): number => {
  let pos: Pos = [(input.length - 1) / 2, (input.length - 1) / 2];
  const cells = new Map<string, string>();
  let numberOfInfections = 0;
  let dir = 0; // up

  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c === '#') {
        cells.set(posToKey([y, x]), 'I');
      }
    });
  });

  for (let i = 0; i < bursts; i += 1) {
    const posKey = posToKey(pos);
    const cell = cells.get(posKey);
    if (!cell) {
      dir = (dir + 3) % 4;
      cells.set(posKey, 'W');
    } else if (cell === 'W') {
      cells.set(posKey, 'I');
      numberOfInfections += 1;
    } else if (cell === 'I') {
      dir = (dir + 1) % 4;
      cells.set(posKey, 'F');
    } else if (cell === 'F') {
      dir = (dir + 2) % 4;
      cells.delete(posKey);
    }
    pos = move(pos, dir);
  }

  return numberOfInfections;
};

export const part1 = (
  input: string[],
  { bursts = 10000 }: { bursts: number },
): number => runVirusCarrierPart1(input, bursts);

export const part2 = (
  input: string[],
  { bursts = 10000000 }: { bursts: number },
): number => runVirusCarrierPart2(input, bursts);
