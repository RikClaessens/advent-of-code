import { getInputAsString } from "../../getInput.ts";

export const year = "2025";
export const day = "day2";
export const testsPart1 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: 1227775554,
  },
];

export const testsPart2 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: 4174379265,
  },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const getRanges = (input: string): [number, number][] =>
  input
    .split(",")
    .map((line) => [
      parseInt(line.split("-")[0]),
      parseInt(line.split("-")[1]),
    ]);

const hasMatchingParts = (word: string, numberOfParts: number): boolean => {
  if (word.length % numberOfParts !== 0) {
    return false;
  }
  const parts = new Set<string>();
  const partLength = word.length / numberOfParts;
  for (let i = 0; i < numberOfParts; i += 1) {
    parts.add(word.substring(i * partLength, (i + 1) * partLength));
  }
  return parts.size === 1;
};

const sumOfInvalidIds = (
  ranges: [number, number][],
  searchAllLenghts = false,
) => {
  let sum = 0;
  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; i += 1) {
      const word = i.toString();
      for (
        let numberOfParts = 2;
        numberOfParts <= (searchAllLenghts ? word.length : 2);
        numberOfParts += 1
      ) {
        if (hasMatchingParts(word, numberOfParts)) {
          sum += i;
          break;
        }
      }
    }
  }
  return sum;
};

export const part1 = (input: string): number =>
  sumOfInvalidIds(getRanges(input));

export const part2 = (input: string): number =>
  sumOfInvalidIds(getRanges(input), true);
