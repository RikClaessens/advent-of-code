import { getInput } from "../../getInput.ts";

export const year = "2025";
export const day = "day7";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 21 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 40 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Pos = [number, number];

const parseGrid = (input: string[]): string[][] =>
  input.map((line) => line.split(""));

const getStart = (grid: string[][]): Pos => [0, grid[0].indexOf("S")];

const getSplitBeamsCount = (grid: string[][]): number => {
  const start = getStart(grid);
  const beams = new Set<number>();
  beams.add(start[1]);
  let splitCount = 0;

  for (let i = 1; i < grid.length; i += 1) {
    const newlySplittedBeams = new Set<number>();
    for (const beam of Array.from(beams)) {
      if (grid[i][beam] === ".") {
        grid[i][beam] = "|";
      } else {
        beams.delete(beam);
        splitCount += 1;
        if (beam - 1 >= 0) {
          newlySplittedBeams.add(beam - 1);
        }
        if (beam + 1 < grid[0].length) {
          newlySplittedBeams.add(beam + 1);
        }
      }
    }
    Array.from(newlySplittedBeams).forEach((beam) => {
      beams.add(beam);
    });
  }

  return splitCount;
};

const cacheKey = (pos: Pos) => `${pos[0]},${pos[1]}`;

const getNumberOfTimelines = (grid: string[][]): number => {
  const start = getStart(grid);
  const cache: Record<string, number> = {};

  const dfs = (pos: Pos): number => {
    if (cache[cacheKey(pos)]) {
      return cache[cacheKey(pos)];
    }
    const nextStep = pos[0] + 1;
    let timelineCount = 0;
    if (pos[0] === grid.length - 1) {
      return 1;
    } else if (grid[nextStep][pos[1]] === ".") {
      timelineCount = dfs([nextStep, pos[1]]);
    } else {
      // found a splitter ^
      if (pos[1] - 1 >= 0) {
        timelineCount += dfs([nextStep, pos[1] - 1]);
      }
      if (pos[1] < grid[0].length) {
        timelineCount += dfs([nextStep, pos[1] + 1]);
      }
    }
    cache[cacheKey(pos)] = timelineCount;
    return timelineCount;
  };

  const timelineCount = dfs(start);

  return timelineCount;
};

export const part1 = (input: string[]): number =>
  getSplitBeamsCount(parseGrid(input));

export const part2 = (input: string[]): number =>
  getNumberOfTimelines(parseGrid(input));
