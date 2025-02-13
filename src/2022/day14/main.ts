import { getInput, writeToFile } from '../../getInput.ts';

export const year = '2022';
export const day = 'day14';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 24 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 93 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type XY = [number, number];

const start: XY = [500, 0];

const getCave = (input: string[]): { cave: string[][]; maxY: number } => {
  let maxY = 0;
  const cave = Array(520)
    .fill('.')
    .map(() => Array(1000).fill('.'));

  const placeRock = (x: number, y: number) => {
    cave[y][x] = '#';
    maxY = Math.max(maxY, y);
  };

  input.forEach((line) => {
    let previousXY = [0, 0];
    line.split('->').forEach((part, index) => {
      const [x, y] = part.split(',').map(Number);
      if (index > 0) {
        let dx = 0,
          dy = 0;
        if (previousXY[0] < x) {
          dx = -1;
        } else if (previousXY[0] > x) {
          dx = 1;
        } else if (previousXY[1] < y) {
          dy = -1;
        } else if (previousXY[1] > y) {
          dy = 1;
        }

        let cx = x;
        let cy = y;

        placeRock(cx, cy);

        while (cx !== previousXY[0] || cy !== previousXY[1]) {
          cx += dx;
          cy += dy;
          placeRock(cx, cy);
        }
      }
      previousXY = [x, y];
    });
  });
  cave[start[1]][start[0]] = '+';
  return { cave, maxY };
};

const dropSand = (cave: string[][], done: (xy: XY) => boolean) => {
  let sandIsFalling = true;
  let numberOfSandUnitsRested = 0;

  while (sandIsFalling) {
    let x = start[0],
      y = start[1];
    let sandUnitIsFalling = true;

    while (sandUnitIsFalling) {
      if (cave[y + 1][x] === '.') {
        y += 1;
      } else if (cave[y + 1][x - 1] === '.') {
        y += 1;
        x -= 1;
      } else if (cave[y + 1][x + 1] === '.') {
        y += 1;
        x += 1;
      } else {
        cave[y][x] = 'o';
        sandUnitIsFalling = false;
        numberOfSandUnitsRested++;
      }

      if (done([x, y])) {
        sandIsFalling = false;
        sandUnitIsFalling = false;
      }
    }
  }
  saveCave(cave, `${numberOfSandUnitsRested}`);
  return numberOfSandUnitsRested;
};

const saveCave = (cave: string[][], name: string) =>
  writeToFile(
    `src/${year}/${day}/cave${name}.txt`,
    cave.map((c) => c.join('') + '\n').join(''),
  );

export const part1 = (input: string[]): number => {
  const { cave, maxY } = getCave(input);
  return dropSand(cave, (xy: XY) => xy[1] >= maxY);
};

export const part2 = (input: string[]): number => {
  const { cave, maxY } = getCave(input);
  const floorY = maxY + 2;
  for (let x = 0; x < cave[floorY].length; x++) {
    cave[floorY][x] = '#';
  }
  return dropSand(cave, (xy: XY) => xy[0] === start[0] && xy[1] === start[1]);
};

// 16986 too low
