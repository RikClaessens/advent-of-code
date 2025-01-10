import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day20';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const part1 = (input: string): number => {
  const goal = parseInt(input) / 10;
  const presents: number[] = [];
  for (let elf = 1; elf < goal; elf++) {
    for (let house = elf; house < goal; house += elf) {
      if (!presents[house]) presents[house] = 0;
      presents[house] = presents[house] + elf;
    }
  }

  return presents.reduce(
    (firstHouseWithGoal, noOfPresents, index) =>
      firstHouseWithGoal === 0 && noOfPresents >= goal
        ? (firstHouseWithGoal = index)
        : firstHouseWithGoal,
    0,
  );
};

export const part2 = (input: string): number => {
  const goal = parseInt(input) / 10;
  const presents: number[] = [];
  for (let elf = 1; elf < goal; elf++) {
    let visits = 0;
    for (let house = elf; house < goal; house += elf) {
      if (!presents[house]) presents[house] = 0;
      if (visits < 50) {
        presents[house] = presents[house] + elf * 1.1;
        visits++;
      }
    }
  }

  return presents.reduce(
    (min, current, index) =>
      min === 0 && current >= goal ? (min = index) : min,
    0,
  );
};
