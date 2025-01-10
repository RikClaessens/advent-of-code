import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day18';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), extraProps: 6, result: 4 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), extraProps: 5, result: 17 },
];

export const extraPropsPart1 = 100;
export const extraPropsPart2 = 100;

export const input = getInput(`src/${year}/${day}/input.txt`);

const getGrid = (input: string[]): string[][] => {
  return input.map((line) => line.split(''));
};

const neighbours = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const runGameOfLife = (
  input: string[],
  steps: number,
  keepOn: [number, number][],
) => {
  const grid = getGrid(input);

  keepOn.forEach((pos) => {
    grid[pos[0]][pos[1]] = '#';
  });
  for (let step = 0; step < steps; step++) {
    const oldGrid = grid.map((row) => [...row]);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        let onNeighbours = 0;
        neighbours.forEach((n) => {
          if (
            i + n[0] >= 0 &&
            i + n[0] < oldGrid.length &&
            j + n[1] >= 0 &&
            j + n[1] < oldGrid[i].length &&
            oldGrid[i + n[0]][j + n[1]] === '#'
          ) {
            onNeighbours++;
          }
        });
        if (grid[i][j] === '#' && onNeighbours !== 2 && onNeighbours !== 3) {
          grid[i][j] = '.';
        } else if (grid[i][j] === '.' && onNeighbours === 3) {
          grid[i][j] = '#';
        }
        keepOn.forEach((pos) => {
          grid[pos[0]][pos[1]] = '#';
        });
      }
    }
  }
  return grid
    .map((row) => row.join(''))
    .join('')
    .replaceAll('.', '').length;
};

export const part1 = (input: string[], steps: number): number =>
  runGameOfLife(input, steps, []);

export const part2 = (input: string[], steps: number): number =>
  runGameOfLife(input, steps, [
    [0, 0],
    [0, input[0].length - 1],
    [input.length - 1, 0],
    [input.length - 1, input[0].length - 1],
  ]);
