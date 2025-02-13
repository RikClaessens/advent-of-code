import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day08';

export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 21 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 8 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const scanTree = (forest: string[], x: number, y: number) => {
  const visible = {
    left: true,
    top: true,
    right: true,
    bottom: true,
  };
  const distances = {
    left: x,
    top: y,
    right: forest[x].length - x - 1,
    bottom: forest.length - y - 1,
  };
  // check left
  for (let dx = 1; dx <= x; dx += 1) {
    if (forest[y][x - dx] >= forest[y][x]) {
      visible.left = false;
      distances.left = dx;
      break;
    }
  }
  // check top
  for (let dy = 1; dy <= y; dy += 1) {
    if (forest[y - dy][x] >= forest[y][x]) {
      visible.top = false;
      distances.top = dy;
      break;
    }
  }
  // check right
  for (let dx = 1; x + dx < forest[x].length; dx += 1) {
    if (forest[y][x + dx] >= forest[y][x]) {
      visible.right = false;
      distances.right = dx;
      break;
    }
  }
  // check bottom
  for (let dy = 1; y + dy < forest.length; dy += 1) {
    if (forest[y + dy][x] >= forest[y][x]) {
      visible.bottom = false;
      distances.bottom = dy;
      break;
    }
  }
  return {
    visible: visible.left || visible.top || visible.right || visible.bottom,
    scenicScore:
      distances.left * distances.top * distances.right * distances.bottom,
  };
};

const countVisibleTrees = (forest: string[]): number => {
  let numberOfTreesVisible = 0;
  for (let y = 1; y < forest[0].length - 1; y += 1) {
    for (let x = 1; x < forest.length - 1; x += 1) {
      const tree = scanTree(forest, x, y);
      numberOfTreesVisible += tree.visible ? 1 : 0;
    }
  }
  const numberOfTreesOnTheEdge =
    2 * (forest.length - 1 + (forest[0].length - 1));
  return numberOfTreesVisible + numberOfTreesOnTheEdge;
};

const getMaxScenicScore = (forest: string[]): number => {
  let max = Number.MIN_VALUE;
  for (let y = 1; y < forest[0].length - 1; y += 1) {
    for (let x = 1; x < forest.length - 1; x += 1) {
      const tree = scanTree(forest, x, y);
      max = Math.max(tree.scenicScore, max);
    }
  }
  return max;
};

export const part1 = (input: string[]): number => countVisibleTrees(input);

export const part2 = (input: string[]): number => getMaxScenicScore(input);
