import { getInput } from "../../getInput.ts";

export const year = "2025";
export const day = "day3";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 357 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 3121910778619 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getBanks = (input: string[]): number[][] =>
  input.map((line) => line.split("").map((n) => parseInt(n)));

const getHighestJoltage = (bank: number[], noOfBatteries: number): number => {
  const joltages: number[] = Array.from({ length: noOfBatteries }, () => 0);
  let minIndex = 0;

  for (let i = 0; i < noOfBatteries; i += 1) {
    for (let j = minIndex; j < bank.length - (noOfBatteries - i - 1); j += 1) {
      if (bank[j] > joltages[i]) {
        joltages[i] = bank[j];
        minIndex = j;
      }
    }
    minIndex += 1;
  }
  return parseInt(joltages.join(""));
};

export const part1 = (input: string[]): number =>
  getBanks(input)
    .map((b) => getHighestJoltage(b, 2))
    .reduce((total, joltage) => total + joltage);

export const part2 = (input: string[]): number =>
  getBanks(input)
    .map((b) => getHighestJoltage(b, 12))
    .reduce((total, joltage) => total + joltage);
