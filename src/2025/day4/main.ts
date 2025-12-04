import { getInput } from "../../getInput.ts";

export const year = "2025";
export const day = "day4";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 13 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 43 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const parseGrid = (input: string[]): string[][] =>
  input.map((line) => line.split(""));

const numberOfOccupiedAdjacentLocations = (
  grid: string[][],
  row: number,
  col: number,
) => {
  const adjacentLocations = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let occupiedCount = 0;
  adjacentLocations.forEach((loc) => {
    const r = row + loc[0];
    const c = col + loc[1];
    if (
      r >= 0 &&
      r < grid.length &&
      c >= 0 &&
      c < grid[row].length &&
      grid[r][c] === "@"
    ) {
      occupiedCount += 1;
    }
  });
  return occupiedCount;
};

const countAccessibleRollsOfPaper = (grid: string[][]): number => {
  let accessibleCount = 0;
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      if (
        grid[row][col] === "@" &&
        numberOfOccupiedAdjacentLocations(grid, row, col) < 4
      ) {
        accessibleCount += 1;
      }
    }
  }
  return accessibleCount;
};

const removeAccessibleRollsOfPaperIteration = (
  grid: string[][],
): { removedCount: number; newGrid: string[][] } => {
  let removedCount = 0;
  let newGrid = Array.from({ length: grid.length }, () =>
    Array.from({ length: grid[0].length }, () => "."),
  );
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[row].length; col += 1) {
      if (
        grid[row][col] === "@" &&
        numberOfOccupiedAdjacentLocations(grid, row, col) < 4
      ) {
        removedCount += 1;
        newGrid[row][col] = ".";
      } else {
        newGrid[row][col] = grid[row][col];
      }
    }
  }
  return { removedCount, newGrid };
};

const removeAllAccessibleRollsOfPaper = (grid: string[][]): number => {
  let removedCount = 0;
  while (true) {
    const iteration = removeAccessibleRollsOfPaperIteration(grid);
    grid = iteration.newGrid;
    removedCount += iteration.removedCount;
    if (iteration.removedCount === 0) {
      break;
    }
  }
  return removedCount;
};

export const part1 = (input: string[]): number =>
  countAccessibleRollsOfPaper(parseGrid(input));

export const part2 = (input: string[]): number =>
  removeAllAccessibleRollsOfPaper(parseGrid(input));
