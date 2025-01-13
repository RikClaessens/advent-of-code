import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day24';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 99 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 44 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getCombinations = (
  arr: number[],
  target: number,
  n: number,
): number[][] => {
  const result: number[][] = [];
  const f = (arr: number[], target: number, n: number, prefix: number[]) => {
    if (n === 0) {
      if (target === 0) {
        result.push(prefix);
      }
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      f(arr.slice(i + 1), target - arr[i], n - 1, [...prefix, arr[i]]);
    }
  };
  f(arr, target, n, []);
  return result;
};

const getMinQE = (input: string[], numberOfCompartments: number): number => {
  const packages = input.map(Number);
  const totalWeight = packages.reduce((a, b) => a + b, 0);
  const targetWeight = totalWeight / numberOfCompartments;
  let minComboQE = Infinity;

  for (let i = 1; i < packages.length; i++) {
    const combos = getCombinations(packages, targetWeight, i);
    for (const combo of combos) {
      minComboQE = Math.min(
        minComboQE,
        combo.reduce((a, b) => a * b, 1),
      );
    }
    if (combos.length) {
      break;
    }
  }

  return minComboQE;
};

export const part1 = (input: string[]): number => getMinQE(input, 3);

export const part2 = (input: string[]): number => getMinQE(input, 4);
