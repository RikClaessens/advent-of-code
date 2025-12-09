import { getInput } from '../../getInput.ts';

export const year = '2025';
export const day = 'day9';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 50 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 24 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Pos = [number, number];

const getRedTiles = (input: string[]): Pos[] =>
  input.map((line) => [
    parseInt(line.split(',')[0]),
    parseInt(line.split(',')[1]),
  ]);

const getLines = (redTiles: Pos[]): Pos[][] =>
  redTiles.map((tile, i) => [tile, redTiles[(i + 1) % redTiles.length]]);

const getArea = (p1: Pos, p2: Pos): number =>
  (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs(p1[1] - p2[1]) + 1);

const getAllRectangleSortedByArea = (redTiles: Pos[]): [number, Pos, Pos][] =>
  redTiles
    .flatMap<[number, Pos, Pos]>((a, i) =>
      redTiles.slice(i + 1).map((b) => [getArea(a, b), a, b]),
    )
    .toSorted((a, b) => (b[0] as number) - (a[0] as number));

const inRange = (a1: number, a2: number, b1: number, b2: number) =>
  !(a1 <= b1 && a1 <= b2 && a2 <= b1 && a2 <= b2) &&
  !(a1 >= b1 && a1 >= b2 && a2 >= b1 && a2 >= b2);

const doesRectangleIntersect = (
  sides: Pos[][],
  [[x1, y1], [x2, y2]]: [number[], number[]],
) =>
  sides.some(
    ([[sx1, sy1], [sx2, sy2]]) =>
      inRange(sy1, sy2, y1, y2) && inRange(sx1, sx2, x1, x2),
  );

export const part1 = (input: string[]): number =>
  getAllRectangleSortedByArea(getRedTiles(input))[0][0];

export const part2 = (input: string[]): number => {
  const redTiles = getRedTiles(input);
  const redTilePairsSortedOnArea = getAllRectangleSortedByArea(redTiles);
  const lines = getLines(redTiles);
  return redTilePairsSortedOnArea.find(
    (pair) => !doesRectangleIntersect(lines, [pair[1], pair[2]]),
  )![0] as number;
};
