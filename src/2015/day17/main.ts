import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day17';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), extraProps: 25, result: 4 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), extraProps: 25, result: 3 },
];

export const extraPropsPart1 = 150;
export const extraPropsPart2 = 150;

export const input = getInput(`src/${year}/${day}/input.txt`);

const getContainers = (input: string[]) =>
  input.map((n) => parseInt(n)).sort((a, b) => b - a);

const findCombinations = (
  current: number[],
  target: number,
  list: number[],
  combinations: number[][],
): void => {
  const currentTotal = current.reduce((a, b) => a + b, 0);
  if (currentTotal === target) {
    combinations.push([...current]);
    return;
  }
  if (currentTotal > target) {
    return;
  }
  list.forEach((n, i) => {
    findCombinations([...current, n], target, list.slice(i + 1), combinations);
  });
};

export const part1 = (input: string[], liters = 150): number => {
  const combinations: number[][] = [];
  findCombinations([], liters, getContainers(input), combinations);
  return combinations.length;
};

export const part2 = (input: string[], liters = 150): number => {
  const combinations: number[][] = [];
  findCombinations([], liters, getContainers(input), combinations);

  const minCombinationSize = combinations.reduce(
    (a, b) => (b.length < a ? b.length : a),
    Infinity,
  );

  return combinations.filter((c) => c.length === minCombinationSize).length;
};
