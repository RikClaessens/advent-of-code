import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day17';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 102 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 94 },
  { input: getInput(`src/${year}/${day}/test2.txt`), result: 71 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

type Direction = -1 | 0 | 1 | 2 | 3;

type Vertex = {
  x: number;
  y: number;
  heatLoss: number;
  direction: Direction;
  steps: number;
};

type Pos = {
  x: number;
  y: number;
};

const isValidPos = (map: number[][], x: number, y: number) =>
  y >= 0 && y < map.length && x >= 0 && x < map[y].length;

const minHeatLoss = (
  map: number[][],
  start: Pos,
  end: Pos,
  minSteps: number,
  maxSteps: number,
): number => {
  const queue: Vertex[] = [];
  const visited = new Set<string>();

  queue.push({
    x: start.x,
    y: start.y,
    heatLoss: 0,
    direction: -1 as Direction,
    steps: 0,
  });

  while (queue.length) {
    queue.sort((a, b) => a.heatLoss - b.heatLoss);

    const { x, y, heatLoss, direction, steps } = queue.shift()!;
    const key = `${x},${y},${direction},${steps}`;
    if (x === end.x && y === end.y && steps >= minSteps) {
      return heatLoss;
    }
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    dirs.forEach((newDir, newDirId) => {
      const [dx, dy] = newDir;
      let nx = x + dx;
      let ny = y + dy;

      if (!isValidPos(map, nx, ny)) {
        return;
      }
      if (newDirId === direction && steps < maxSteps) {
        queue.push({
          heatLoss: heatLoss + map[ny][nx],
          x: nx,
          y: ny,
          direction,
          steps: steps + 1,
        });
      } else if (
        direction === -1 ||
        (newDirId !== direction &&
          newDirId !== (direction + 2) % 4 &&
          steps >= minSteps)
      ) {
        let newX = x,
          newY = y,
          newHeatLoss = heatLoss;
        for (let i = 0; i < minSteps; i++) {
          newX += dx;
          newY += dy;
          if (!isValidPos(map, newX, newY)) {
            return;
          }
          newHeatLoss += map[newY][newX];
        }
        queue.push({
          heatLoss: newHeatLoss,
          x: newX,
          y: newY,
          direction: newDirId as Direction,
          steps: minSteps,
        });
      }
    });
  }
  return -1;
};

export const part1 = (input: string[]): number => {
  const map = input.map((row) => row.split('').map(Number));
  const heatLoss = minHeatLoss(
    map,
    { x: 0, y: 0 },
    { x: map[0].length - 1, y: map.length - 1 },
    1,
    3,
  );
  return heatLoss;
};

export const part2 = (input: string[]): number => {
  const map = input.map((row) => row.split('').map(Number));
  const heatLoss = minHeatLoss(
    map,
    { x: 0, y: 0 },
    { x: map[0].length - 1, y: map.length - 1 },
    4,
    10,
  );
  return heatLoss;
};
