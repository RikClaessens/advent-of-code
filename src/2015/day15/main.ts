import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day15';
export const testsPart1 = [
  // { input: getInput(`src/${year}/${day}/test.txt`), result: 62842880 },
];

export const testsPart2 = [
  // { input: getInput(`src/${year}/${day}/test.txt`), result: 0 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Ingredient = [number, number, number, number, number];

const getIngredients = (input: string[]): Ingredient[] =>
  input.map((line) => {
    const [_, _name, capacity, durability, flavor, texture, calories] =
      line.match(
        /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/,
      ) as string[];
    return [
      parseInt(capacity),
      parseInt(durability),
      parseInt(flavor),
      parseInt(texture),
      parseInt(calories),
    ];
  });

const getScoreAndCal = (
  ings: Ingredient[],
  i1: number,
  i2: number,
  i3: number,
  i4: number,
) => [
  Math.max(
    i1 * ings[0][0] + i2 * ings[1][0] + i3 * ings[2][0] + i4 * ings[3][0],
    0,
  ) *
    Math.max(
      i1 * ings[0][1] + i2 * ings[1][1] + i3 * ings[2][1] + i4 * ings[3][1],
      0,
    ) *
    Math.max(
      i1 * ings[0][2] + i2 * ings[1][2] + i3 * ings[2][2] + i4 * ings[3][2],
      0,
    ) *
    Math.max(
      i1 * ings[0][3] + i2 * ings[1][3] + i3 * ings[2][3] + i4 * ings[3][3],
      0,
    ),
  i1 * ings[0][4] + i2 * ings[1][4] + i3 * ings[2][4] + i4 * ings[3][4],
];

export const part1 = (input: string[]): number => {
  const ings = getIngredients(input);
  const maxTeaSpoons = 100;

  let maxScore = 0;

  for (let i1 = 0; i1 < maxTeaSpoons; i1++) {
    for (let i2 = 0; i2 < maxTeaSpoons - i1; i2++) {
      for (let i3 = 0; i3 < maxTeaSpoons - i1 - i2; i3++) {
        const i4 = maxTeaSpoons - i1 - i2 - i3;

        const score = getScoreAndCal(ings, i1, i2, i3, i4)[0];

        maxScore = Math.max(score, maxScore);
      }
    }
  }
  return maxScore;
};

export const part2 = (input: string[]): number => {
  const ings = getIngredients(input);
  const maxTeaSpoons = 100;

  let maxScore = 0;

  for (let i1 = 0; i1 < maxTeaSpoons; i1++) {
    for (let i2 = 0; i2 < maxTeaSpoons - i1; i2++) {
      for (let i3 = 0; i3 < maxTeaSpoons - i1 - i2; i3++) {
        const i4 = maxTeaSpoons - i1 - i2 - i3;
        const [score, cal] = getScoreAndCal(ings, i1, i2, i3, i4);
        if (cal === 500) {
          maxScore = Math.max(score, maxScore);
        }
      }
    }
  }
  return maxScore;
};

console.log(part1(input));
