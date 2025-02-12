import { getInputAsString } from '../../getInput.ts';

export const year = '2022';
export const day = 'day01';

export const testsPart1 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    extraProps: 1,
    result: 24000,
  },
];
export const testsPart2 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    extraProps: 3,
    result: 45000,
  },
];

export const extraPropsPart1 = 1;
export const extraPropsPart2 = 3;
export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const topXTotalCalories = (foodList: string, top: number) => {
  return foodList
    .split('\n\n')
    .map((elfFoodList) =>
      elfFoodList
        .split('\n')
        .map((foodItem) => Number.parseInt(foodItem))
        .reduce((totalCal, foodItemCal) => totalCal + foodItemCal, 0),
    )
    .sort((a, b) => b - a)
    .slice(0, top)
    .reduce((total, calories) => (total += calories), 0);
};

export const part1 = (input: string, top: number): number =>
  topXTotalCalories(input, top);

export const part2 = (input: string, top: number): number =>
  topXTotalCalories(input, top);
