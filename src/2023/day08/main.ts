import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day08';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 2 },
  { input: getInput(`src/${year}/${day}/test2.txt`), result: 6 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test3.txt`), result: 6 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

const getInstructions = (input: string[]): string[] => input[0].split('');

type Direction = { L: string; R: string };
type Map = { [key: string]: Direction };

const getMap = (input: string[]): Map => {
  let index = 2;

  const map: Map = {};
  while (input[index]) {
    map[input[index].substring(0, 3)] = {
      L: input[index].substring(7, 10),
      R: input[index].substring(12, 15),
    };
    index += 1;
  }
  return map;
};

const findNumberOfSteps = (
  instructions: string[],
  map: Map,
  startingLoc: string,
  goalReached: (loc: string) => boolean,
): number => {
  let currentLoc = startingLoc;
  let numberOfSteps = 0;
  while (!goalReached(currentLoc)) {
    instructions.forEach((instruction) => {
      currentLoc = instruction === 'L' ? map[currentLoc].L : map[currentLoc].R;
    });
    numberOfSteps += instructions.length;
  }
  return numberOfSteps;
};

export const part1 = (input: string[]): number => {
  const instructions = getInstructions(input);
  const map = getMap(input);
  const numberOfSteps = findNumberOfSteps(
    instructions,
    map,
    'AAA',
    (loc) => loc === 'ZZZ',
  );

  return numberOfSteps;
};

// To calculate the least common multiple, we need the greatest common divisor
// https://stackoverflow.com/a/61352020
const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

export const part2 = (input: string[]): number => {
  const instructions = getInstructions(input);
  const map = getMap(input);
  const startingLocs = Object.keys(map).filter((key) => key.endsWith('A'));

  const numberOfSteps = startingLocs.map((startingLoc) =>
    findNumberOfSteps(instructions, map, startingLoc, (loc) =>
      loc.endsWith('Z'),
    ),
  );

  return lcmAll(numberOfSteps);
};
