import { getInput } from '../../getInput.ts';
import { sum } from '../../utils.ts';

export const year = '2023';
export const day = 'day11';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { expand: 2 },
    result: 374,
  },
];
export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { expand: 10 },
    result: 1030,
  },
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { expand: 100 },
    result: 8410,
  },
];
export const input = getInput(`src/${year}/${day}/input.txt`);
export const extraPropsPart2 = { expand: 1000000 };

type Map = string[][];
type Coord = {
  x: number;
  y: number;
};

const getMap = (input: string[]): Map => input.map((i) => i.split(''));

const getExpandedRowsAndCols = (
  map: Map,
): { rows: number[]; cols: number[] } => {
  const rows: number[] = [];
  const cols: number[] = [];
  map.forEach((_, rowIndex) => {
    if (!map[rowIndex].join('').includes('#')) {
      rows.push(rowIndex);
    }
  });
  map[0].forEach((_, colIndex) => {
    if (
      !map
        .map((row) => row[colIndex])
        .join('')
        .includes('#')
    ) {
      cols.push(colIndex);
    }
  });

  return { rows, cols };
};

const getGalaxies = (map: Map): Coord[] => {
  const galaxies: Coord[] = [];
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === '#') {
        galaxies.push({ x, y });
      }
    }
  }
  return galaxies;
};

export const getDistance = (
  c1: Coord,
  c2: Coord,
  numberOfExpandedRows: number,
  numberOfExpandedCols: number,
  expand: number,
): number =>
  Math.abs(c1.x - c2.x) +
  numberOfExpandedCols * (expand - 1) +
  Math.abs(c1.y - c2.y) +
  numberOfExpandedRows * (expand - 1);

const getDistances = (
  galaxies: Coord[],
  rows: number[],
  cols: number[],
  expand: number = 1,
) => {
  const distances: number[] = [];

  for (let i = 0; i < galaxies.length; i += 1) {
    for (let j = i + 1; j < galaxies.length; j += 1) {
      distances.push(
        getDistance(
          galaxies[i],
          galaxies[j],
          rows.filter(
            (r) =>
              r > Math.min(galaxies[i].y, galaxies[j].y) &&
              r < Math.max(galaxies[i].y, galaxies[j].y),
          ).length,
          cols.filter(
            (r) =>
              r > Math.min(galaxies[i].x, galaxies[j].x) &&
              r < Math.max(galaxies[i].x, galaxies[j].x),
          ).length,
          expand,
        ),
      );
    }
  }

  return distances;
};

export const part1 = (
  input: string[],
  { expand }: { expand: number },
): number => {
  const map = getMap(input);
  const { rows, cols } = getExpandedRowsAndCols(map);

  return getDistances(getGalaxies(map), rows, cols, expand).reduce(sum);
};

export const part2 = (
  input: string[],
  { expand }: { expand: number },
): number => {
  const map = getMap(input);
  const { rows, cols } = getExpandedRowsAndCols(map);
  return getDistances(getGalaxies(map), rows, cols, expand).reduce(sum);
};
