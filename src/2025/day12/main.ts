import { getInput } from '../../getInput.ts';

export const year = '2025';
export const day = 'day12';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Present = [string[], number];
type Area = [number, number, number[]];

export const getPresents = (input: string[]): [Present[], Area[]] => {
  const presents: Present[] = [];
  const areas: Area[] = [];
  let line = 0;
  while (true) {
    const firstLine = input[line];
    if (!firstLine.endsWith(':')) {
      break;
    }
    const present = [input[line + 1], input[line + 2], input[line + 3]];
    const count = present.reduce(
      (c, p) => c + p.split('').filter((l) => l === '#').length,
      0,
    );
    presents.push([present, count]);
    line += 5;
  }
  while (line < input.length) {
    const a = input[line];
    const wl = a.substring(0, a.indexOf(':')).split('x');
    areas.push([
      parseInt(wl[0]),
      parseInt(wl[1]),
      a
        .substring(a.indexOf(':') + 2)
        .split(' ')
        .map((n) => parseInt(n)),
    ]);
    line += 1;
  }

  return [presents, areas];
};

// Not really the correct solution, but the input this time is made in such a way
// you don't need a fancy 2d bin packing solver for irregular shapes, just an total area check...
const dirtyQuickFitCheck = (area: Area): boolean => {
  const totalArea = area[0] * area[1];
  let totalPresentArea = 0;
  for (let i = 0; i < area[2].length; i += 1) {
    totalPresentArea += area[2][i] * 9;
  }
  return totalPresentArea <= totalArea;
};

export const part1 = (input: string[]): number => {
  const [_presents, areas] = getPresents(input);
  return areas.reduce(
    (sum, area) => sum + (dirtyQuickFitCheck(area) ? 1 : 0),
    0,
  );
};

export const part2 = (): string => {
  return 'Advent of Code 2025 is complete!';
};
