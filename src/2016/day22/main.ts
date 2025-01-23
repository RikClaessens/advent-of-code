import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day22';
export const testsPart1 = [];

export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    result: 7,
  },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getNodes = (input: string[]) =>
  input.map((i) => {
    const [_, x, y, size, used, avail, usePer] = i.match(
      /\/dev\/grid\/node-x(\d+)-y(\d+)\s*(\d+)T\s*(\d+)T\s*(\d+)T\s*(\d+)%/,
    ) as string[];
    return [x, y, size, used, avail, usePer].map(Number);
  });
export const part1 = (input: string[]): number => {
  const nodes = getNodes(input.slice(2));

  let numberOfViablePairs = 0;
  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      if (
        (nodes[a][3] > 0 && nodes[a][3] < nodes[b][4]) ||
        (nodes[b][3] > 0 && nodes[b][3] < nodes[a][4])
      ) {
        numberOfViablePairs++;
      }
    }
  }
  return numberOfViablePairs;
};

export const part2 = (input: string[]): number => {
  const nodes = getNodes(input.slice(2));

  const maxX = Math.max(...nodes.map((n) => n[0]));

  const emptyNode = nodes.find((n) => n[3] === 0)!;
  const emptyNodeX = emptyNode[0];
  const emptyNodeY = emptyNode[1];

  const lowestXUnmovableBlocks =
    Math.min(...nodes.filter((n) => n[2] > 200).map((n) => n[0])) - 1;
  let additionalStepsAroundUnmovableBlocks = 0;
  if (isFinite(lowestXUnmovableBlocks)) {
    additionalStepsAroundUnmovableBlocks =
      2 * (emptyNodeX - lowestXUnmovableBlocks);
  }

  return (
    emptyNodeY + // move up your y position worth of moces
    (maxX - emptyNodeX - 1) + // move right to left of the rightmost block
    (maxX - 1) * 5 + // slide the goal block left and the open space left of it in 5 steps, the number of times of where the goal block is -1
    1 + // now the goal block is right next to the left most top right block, with an open space to the left, so add 1
    additionalStepsAroundUnmovableBlocks // move around the unmovable blocks
  );
};
