import { getInputAsString } from "../../getInput.ts";

export const year = "2025";
export const day = "day5";
export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 3 },
];

export const testsPart2 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 14 },
  { input: "3-5\n3-7\n8-10\n\n1", result: 8 },
  { input: "3-5\n3-4\n4-5\n8-10\n20-20\n19-21\n\n1", result: 9 },
];

type Range = [number, number];

const getRangesAndIngredients = (
  input: string,
): { ranges: Range[]; ingredients: number[] } => {
  const ranges: Range[] = [];
  const ingredients: number[] = [];
  input
    .split("\n\n")[0]
    .split("\n")
    .forEach((line) => {
      ranges.push([parseInt(line.split("-")[0]), parseInt(line.split("-")[1])]);
    });
  input
    .split("\n\n")[1]
    .split("\n")
    .forEach((line) => {
      ingredients.push(parseInt(line));
    });
  return { ranges, ingredients };
};

const countFreshIngredientsInInventory = ({
  ranges,
  ingredients,
}: {
  ranges: Range[];
  ingredients: number[];
}): number => {
  let freshCount = 0;
  for (const ingredient of ingredients) {
    if (
      ranges.find((range) => range[0] <= ingredient && range[1] >= ingredient)
    ) {
      freshCount += 1;
    }
  }
  return freshCount;
};

const countFreshIngredientsInRanges = ({
  ranges,
}: {
  ranges: Range[];
}): number => {
  let freshIngredients = 0;
  for (const range of ranges) {
    freshIngredients += range[1] - range[0] + 1;
  }
  return freshIngredients;
};

const combineOverlappingRanges = ({
  ranges,
}: {
  ranges: Range[];
}): { ranges: Range[] } => {
  const sortedRanges = ranges.sort((r1, r2) => r1[0] - r2[0]);
  const newRanges: Range[] = [];
  for (let i = 0; i < sortedRanges.length; i += 1) {
    const low = sortedRanges[i][0];
    let high = sortedRanges[i][1];
    while (i + 1 < sortedRanges.length && sortedRanges[i + 1][0] <= high) {
      i += 1;
      high = Math.max(high, sortedRanges[i][1]);
    }
    newRanges.push([low, high]);
  }
  return { ranges: newRanges };
};

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const part1 = (input: string): number => {
  const { ranges, ingredients } = getRangesAndIngredients(input);
  const { ranges: nonOverlappingRanges } = combineOverlappingRanges({ ranges });
  return countFreshIngredientsInInventory({
    ranges: nonOverlappingRanges,
    ingredients,
  });
};
countFreshIngredientsInInventory(getRangesAndIngredients(input));

export const part2 = (input: string): number =>
  countFreshIngredientsInRanges(
    combineOverlappingRanges(getRangesAndIngredients(input)),
  );

// 342018167474518 not correct
// 324078209335280 not correct
