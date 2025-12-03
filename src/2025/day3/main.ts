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

const getHighestJoltageInRange = (
  bank: number[],
  from: number,
  to: number,
): [number, number] => {
  let highestJoltage = 0;
  let minIndex = from;
  for (let j = from; j < to; j += 1) {
    if (bank[j] > highestJoltage) {
      highestJoltage = bank[j];
      minIndex = j;
    }
  }
  return [highestJoltage, minIndex];
};

const getHighestJoltageInBank = (bank: number[], noOfBatteries: number): number => {
  const joltages: number[] = Array.from({ length: noOfBatteries }, () => 0);
  let minIndex = 0;

  for (let i = 0; i < noOfBatteries; i += 1) {
    const [highestJoltage, newMinIndex] = getHighestJoltageInRange(
      bank,
      minIndex,
      bank.length - (noOfBatteries - i - 1),
    );
    joltages[i] = highestJoltage;
    minIndex = newMinIndex + 1;
  }
  return parseInt(joltages.join(""));
};

const sum = (total: number, joltage: number) => total + joltage;

export const part1 = (input: string[]): number =>
  getBanks(input)
    .map((b) => getHighestJoltageInBank(b, 2))
    .reduce(sum);

export const part2 = (input: string[]): number =>
  getBanks(input)
    .map((b) => getHighestJoltageInBank(b, 12))
    .reduce(sum);
