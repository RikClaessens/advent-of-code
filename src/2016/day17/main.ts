import { md5 } from '@takker/md5';
import { encodeHex } from '@std/encoding';
import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day17';
export const testsPart1 = [
  { input: 'ihgpwlah', result: 'DDRRRD' },
  { input: 'kglvqrro', result: 'DDUDRLRRUDRD' },
  { input: 'ulqzkmiv', result: 'DRURDRUDDLLDLUURRDULRLDUUDDDRR' },
];

export const testsPart2 = [
  { input: 'ihgpwlah', result: 370 },
  { input: 'kglvqrro', result: 492 },
  { input: 'ulqzkmiv', result: 830 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

interface Position {
  x: number;
  y: number;
}

interface Direction extends Position {
  p: string;
}

const directions: Direction[] = [
  { x: 0, y: -1, p: 'U' },
  { x: 0, y: 1, p: 'D' },
  { x: -1, y: 0, p: 'L' },
  { x: 1, y: 0, p: 'R' },
];

const getNeighbors = (passcode: string) =>
  encodeHex(md5(passcode))
    .substring(0, 4)
    .split('')
    .map((c) => ['b', 'c', 'd', 'e', 'f'].includes(c));

const findAllPaths = (
  mapWidth: number,
  mapHeight: number,
  pos: Position,
  goalPos: Position,
  path: string,
  paths: string[],
): void => {
  if (pos.x === goalPos.x && pos.y === goalPos.y) {
    paths.push(path);
    return;
  }
  const neighbors = getNeighbors(path);
  directions.forEach((d, di) => {
    if (neighbors[di]) {
      const newX = pos.x + d.x;
      const newY = pos.y + d.y;
      if (newX < mapWidth && newY < mapHeight && newX >= 0 && newY >= 0) {
        findAllPaths(
          mapWidth,
          mapHeight,
          { x: newX, y: newY },
          goalPos,
          path + d.p,
          paths,
        );
      }
    }
  });
};

export const part1 = (input: string): string => {
  const paths: string[] = [];
  findAllPaths(4, 4, { x: 0, y: 0 }, { x: 3, y: 3 }, input, paths);
  let path = '';
  paths
    .map((p) => p.replace(input, ''))
    .forEach((p) => {
      if (!path || p.length < path.length) {
        path = p;
      }
    });
  return path;
};

export const part2 = (input: string): number => {
  const paths: string[] = [];
  findAllPaths(4, 4, { x: 0, y: 0 }, { x: 3, y: 3 }, input, paths);
  let path = '';
  paths
    .map((p) => p.replace(input, ''))
    .forEach((p) => {
      if (!path || p.length > path.length) {
        path = p;
      }
    });
  return path.length;
};
