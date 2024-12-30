import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day16';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 46 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 51 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

const dirs: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const mirrors: { [key: string]: { [key: number]: number } } = {
  '/': {
    0: 3,
    1: 2,
    2: 1,
    3: 0,
  },
  '\\': {
    0: 1,
    1: 0,
    2: 3,
    3: 2,
  },
};

type Node = {
  x: number;
  y: number;
  energized: boolean;
  element: string;
  lightFrom: number[];
};

const energize = (
  map: string[][],
  beamStart: [number, number, number],
): Node[][] => {
  const nodes: Node[][] = [];
  const [startX, startY, startD] = beamStart;
  for (let y = 0; y < map.length; y++) {
    nodes.push([]);
    for (let x = 0; x < map[y].length; x++) {
      let lightFrom: number[] = [];
      if (x === startX && y === startY) {
        lightFrom = [startD];
      }
      nodes[y].push({
        x,
        y,
        energized: x === startX && y === startY,
        element: map[y][x],
        lightFrom,
      });
    }
  }

  const queue: string[] = [`${startX},${startY},${startD}`];
  const visited: Set<string> = new Set();
  let nodeKey = undefined;
  while ((nodeKey = queue.shift()!)) {
    visited.add(nodeKey);
    const [x, y, d] = nodeKey.split(',').map(Number);
    const currentNode = nodes[y][x];
    const el = currentNode.element;
    if (
      el === '.' ||
      (el === '|' && d % 2 === 0) ||
      (el === '-' && d % 2 === 1)
    ) {
      const [dx, dy] = dirs[(d + 2) % 4];
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < map[y].length && newY >= 0 && newY < map.length) {
        const newKey = `${newX},${newY},${d}`;
        if (!visited.has(newKey)) {
          queue.push(newKey);
          nodes[newY][newX].energized = true;
          nodes[newY][newX].lightFrom.push(d);
        }
      }
    }
    if ((el === '|' && d % 2 === 1) || (el === '-' && d % 2 === 0)) {
      [(d + 1) % 4, (d + 3) % 4].forEach((d) => {
        const [dx, dy] = dirs[d];
        const newX = x + dx;
        const newY = y + dy;
        if (
          newX >= 0 &&
          newX < map[y].length &&
          newY >= 0 &&
          newY < map.length
        ) {
          const newKey = `${newX},${newY},${(d + 2) % 4}`;
          if (!visited.has(newKey)) {
            queue.push(newKey);
            nodes[newY][newX].energized = true;
            nodes[newY][newX].lightFrom.push((d + 2) % 4);
          }
        }
      });
    }
    if (el === '/' || el === '\\') {
      const newD = mirrors[el][d];
      const [dx, dy] = dirs[newD];
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < map[y].length && newY >= 0 && newY < map.length) {
        const newKey = `${newX},${newY},${(newD + 2) % 4}`;
        if (!visited.has(newKey)) {
          queue.push(newKey);
          nodes[newY][newX].energized = true;
          nodes[newY][newX].lightFrom.push(newD);
        }
      }
    }
  }

  return nodes;
};

const getNoOfEnergizedNodes = (
  map: string[][],
  beamStart: [number, number, number] = [0, 0, 3],
): number => {
  return energize(map, beamStart).reduce(
    (acc, row) =>
      acc + row.reduce((rowAcc, node) => rowAcc + (node.energized ? 1 : 0), 0),
    0,
  );
};

export const part1 = (input: string[]): number => {
  const map = input.map((line) => line.split(''));
  return getNoOfEnergizedNodes(map);
};

/*
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
*/
export const part2 = (input: string[]): number => {
  const map = input.map((line) => line.split(''));
  let maxEnergized = 0;
  for (let z = 0; z < input.length; z++) {
    maxEnergized = Math.max(
      maxEnergized,
      getNoOfEnergizedNodes(map, [z, 0, 0]),
    );
    maxEnergized = Math.max(
      maxEnergized,
      getNoOfEnergizedNodes(map, [0, z, 3]),
    );
    maxEnergized = Math.max(
      maxEnergized,
      getNoOfEnergizedNodes(map, [z, map.length - 1, 2]),
    );
    maxEnergized = Math.max(
      maxEnergized,
      getNoOfEnergizedNodes(map, [map.length - 1, z, 1]),
    );
  }
  return maxEnergized;
};
