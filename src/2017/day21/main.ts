import { assertEquals } from '@std/assert';
import { getInput, writeToFile } from '../../getInput.ts';

export const year = '2017';
export const day = 'day21';
export const testsPart1 = [
  {
    input: ['../.# => ##./#../...', '.#./..#/### => #..#/..../..../#..#'],
    extraProps: { iterations: 2 },
    result: 12,
  },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getStartingPattern = () => ['.#.', '..#', '###'];

type Rules = Map<string, string>;

const getAllRotations = (grid: string): string[] => {
  const allRotations = [grid];
  let gridToRotate = grid;
  for (let i = 0; i < 3; i += 1) {
    let right90Key = '';
    const keyCharArray = gridToRotate.split('/').map((l) => l.split(''));
    const s = keyCharArray.length - 1;
    for (let i = 0; i <= s; i += 1) {
      for (let j = 0; j <= s; j += 1) {
        right90Key += keyCharArray[s - j][i];
      }
      if (i < s) {
        right90Key += '/';
      }
    }
    allRotations.push(right90Key);
    gridToRotate = right90Key;
  }
  return allRotations;
};

const getAllFlipsAndRotations = (grid: string): string[] => {
  const allFlipsAndRotations: string[] = [];
  allFlipsAndRotations.push(...getAllRotations(grid));
  allFlipsAndRotations.push(
    ...getAllRotations(
      grid
        .split('/')
        .map((p) => p.split('').reverse().join(''))
        .join('/'),
    ),
  );

  return allFlipsAndRotations;
};

const getRules = (input: string[]): Rules => {
  const rules: Map<string, string> = new Map();
  input.forEach((line) => {
    const [key, value] = line.split(' => ');
    getAllFlipsAndRotations(key).forEach((k) => rules.set(k, value));
  });
  return rules;
};

const doIterationSize = (
  grid: string[],
  rules: Rules,
  size: number,
  enhanceSize: number,
) => {
  const numberOfSubGrids = grid.length / size;
  const newGrid = Array.from({ length: numberOfSubGrids * enhanceSize }).fill(
    '',
  ) as string[];

  for (let i = 0; i < numberOfSubGrids; i += 1) {
    for (let j = 0; j < numberOfSubGrids; j += 1) {
      const subGrid = Array.from({ length: size }).fill('') as string[];
      for (let k = 0; k < size; k += 1) {
        for (let l = 0; l < size; l += 1) {
          subGrid[k] += grid[i * size + k][j * size + l];
        }
      }

      const replaceWithGrid = rules
        .get(subGrid.join('/'))
        ?.split('/')
        .map((l) => l.split(''));
      for (let k = 0; k < enhanceSize; k += 1) {
        for (let l = 0; l < enhanceSize; l += 1) {
          newGrid[i * enhanceSize + k] += replaceWithGrid![k][l];
        }
      }
    }
  }

  return newGrid;
};

const doIteration = (grid: string[], rules: Rules) => {
  const size = grid.length;
  if (size % 2 === 0) {
    return doIterationSize(grid, rules, 2, 3);
  } else {
    return doIterationSize(grid, rules, 3, 4);
  }
};

const runIterations = (input: string[], iterations: number) => {
  let grid = getStartingPattern();
  const rules = getRules(input);
  for (let i = 0; i < iterations; i += 1) {
    grid = doIteration(grid, rules);
  }
  return grid
    .join('')
    .split('')
    .filter((c) => c === '#').length;
};

export const part1 = (
  input: string[],
  { iterations = 5 }: { iterations: number },
): number => runIterations(input, iterations);

export const part2 = (input: string[]): number => runIterations(input, 18);

Deno.test('Generating all rotations for each rule', () => {
  assertEquals(getAllFlipsAndRotations('123/456/789'), [
    '123/456/789',
    '741/852/963',
    '987/654/321',
    '369/258/147',
    '321/654/987',
    '963/852/741',
    '789/456/123',
    '147/258/369',
  ]);

  assertEquals(getAllFlipsAndRotations('12/34'), [
    '12/34',
    '31/42',
    '43/21',
    '24/13',
    '21/43',
    '42/31',
    '34/12',
    '13/24',
  ]);
});
