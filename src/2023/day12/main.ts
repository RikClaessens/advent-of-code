import { getInput } from '../../getInput.ts';
import { memoize, sum } from '../../utils.ts';

export const year = '2023';
export const day = 'day12';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 21 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 525152 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

type SpringRow = {
  springs: string;
  dmgCounts: number[];
};

const parseInput = (input: string[]): SpringRow[] =>
  input.map((line) => ({
    springs: line.split(' ')[0],
    dmgCounts: line
      .split(' ')[1]
      .split(',')
      .map((n) => Number.parseInt(n)),
  }));

const getNumberOfCombinations = memoize(
  (
    springs: string,
    dmgCounts: number[],
    springIndex: number,
    currentDmgCount: number,
    dmgCountsCompleted: number,
  ): number => {
    // if at end, check if we filled the last group, return 1, otherwise 0
    if (springIndex === springs.length) {
      if (dmgCountsCompleted === dmgCounts.length) return 1;
      return 0;
    }
    // if not at end, but it's a damaged spring, count the spring and continue
    // from next springIndex
    else if (springs[springIndex] === '#') {
      return getNumberOfCombinations(
        springs,
        dmgCounts,
        springIndex + 1,
        currentDmgCount + 1,
        dmgCountsCompleted,
      );
    }
    // .
    else if (springs[springIndex] === '.') {
      // check if we just filled a damageCount
      if (
        dmgCountsCompleted < dmgCounts.length &&
        currentDmgCount === dmgCounts[dmgCountsCompleted]
      ) {
        return getNumberOfCombinations(
          springs,
          dmgCounts,
          springIndex + 1,
          0,
          dmgCountsCompleted + 1,
        );
      }
      // or we didn't encounter a damaged spring or ? just yet
      else if (currentDmgCount === 0) {
        return getNumberOfCombinations(
          springs,
          dmgCounts,
          springIndex + 1,
          0,
          dmgCountsCompleted,
        );
      }
      // if not we didn't manage to fill the previous damageCount, return 0
      else {
        return 0;
      }
    }
    // ?
    else {
      // count as a damaged spring
      const count = getNumberOfCombinations(
        springs,
        dmgCounts,
        springIndex + 1,
        currentDmgCount + 1,
        dmgCountsCompleted,
      );
      let dotCount = 0;
      // count as operational spring
      // if we just finished a group of damaged springs
      if (currentDmgCount === dmgCounts[dmgCountsCompleted]) {
        dotCount = getNumberOfCombinations(
          springs,
          dmgCounts,
          springIndex + 1,
          0,
          dmgCountsCompleted + 1,
        );
      }
      // if we didn't yet encounter a damaged spring, continue search
      else if (currentDmgCount === 0) {
        dotCount = getNumberOfCombinations(
          springs,
          dmgCounts,
          springIndex + 1,
          0,
          dmgCountsCompleted,
        );
      }
      return count + dotCount;
    }
  },
);

export const part1 = (input: string[]): number => {
  const rows = parseInput(input);
  const combinations = rows.map((r) =>
    getNumberOfCombinations(`${r.springs}.`, r.dmgCounts, 0, 0, 0),
  );
  return combinations.reduce(sum);
};

export const part2 = (input: string[]): number => {
  const rows = parseInput(input);
  const unfoldedRows: SpringRow[] = rows.map((r) => ({
    springs: new Array(5)
      .fill(0)
      .map((n) => r.springs)
      .join('?'),
    dmgCounts: new Array(5)
      .fill(0)
      .map((n) => r.dmgCounts)
      .flat(),
  }));
  const combinations = unfoldedRows.map((r) =>
    getNumberOfCombinations(`${r.springs}.`, r.dmgCounts, 0, 0, 0),
  );
  return combinations.reduce(sum);
};
