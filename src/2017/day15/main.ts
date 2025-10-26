import { getInput } from "../../getInput.ts";

export const year = "2017";
export const day = "day15";
export const testsPart1 = [
  // {
  //   input: getInput(`src/${year}/${day}/test.txt`),
  //   result: 588,
  // },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 309 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getNextValuePart1 = (
  value: number,
  factor: number,
  divider: number,
): number => (value * factor) % divider;

const getNextValuePart2 = (
  value: number,
  factor: number,
  divider: number,
  multipleOf: number,
): number => {
  let nextValue = (value * factor) % divider;
  while (nextValue % multipleOf !== 0) {
    nextValue = (nextValue * factor) % divider;
  }
  return nextValue;
};

const getStartingValues = (
  input: string[],
): {
  startValueA: number;
  startValueB: number;
} => ({
  startValueA: Number.parseInt(input[0].split(" ")[4]),
  startValueB: Number.parseInt(input[1].split(" ")[4]),
});

const factorA = 16807;
const factorB = 48271;
const divider = 2147483647;

export const part1 = (input: string[]): number => {
  const { startValueA, startValueB } = getStartingValues(input);
  let valueA = startValueA;
  let valueB = startValueB;

  let matches = 0;

  for (let i = 0; i < 40000000; i += 1) {
    valueA = getNextValuePart1(valueA, factorA, divider);
    valueB = getNextValuePart1(valueB, factorB, divider);

    if ((valueA & 0xffff) === (valueB & 0xffff)) {
      matches += 1;
    }
  }

  return matches;
};

export const part2 = (input: string[]): number => {
  const { startValueA, startValueB } = getStartingValues(input);
  let valueA = startValueA;
  let valueB = startValueB;

  let matches = 0;

  for (let i = 0; i < 5000000; i += 1) {
    valueA = getNextValuePart2(valueA, factorA, divider, 4);
    valueB = getNextValuePart2(valueB, factorB, divider, 8);

    if ((valueA & 0xffff) === (valueB & 0xffff)) {
      matches += 1;
    }
  }

  return matches;
};
