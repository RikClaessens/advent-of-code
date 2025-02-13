import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day09';

export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), extraProps: 2, result: 13 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), extraProps: 10, result: 1 },
  {
    input: getInput(`src/${year}/${day}/test2.txt`),
    extraProps: 10,
    result: 36,
  },
];

export const extraPropsPart1 = 2;
export const extraPropsPart2 = 10;

export const input = getInput(`src/${year}/${day}/input.txt`);

type Move = {
  direction: string;
  steps: number;
};

type Pos = {
  x: number;
  y: number;
};

const parseInputToMoves = (input: string[]): Move[] =>
  input
    .map((line) => line.split(' '))
    .map((line) => ({ direction: line[0], steps: Number.parseInt(line[1]) }));

const posToString = (pos: Pos): string => `(${pos.x}, ${pos.y})`;

const doMoves = (moves: Move[], numberOfKnots: number): number => {
  const ropePositions = new Array(numberOfKnots)
    .fill('')
    .map((_) => ({ x: 0, y: 0 }));
  const visitedPositionsT = new Set<string>().add(posToString({ x: 0, y: 0 }));

  moves.forEach((move) => {
    new Array(move.steps).fill('').forEach((_) => {
      switch (move.direction) {
        case 'L':
          ropePositions[0].x -= 1;
          break;
        case 'U':
          ropePositions[0].y += 1;
          break;
        case 'R':
          ropePositions[0].x += 1;
          break;
        case 'D':
          ropePositions[0].y -= 1;
          break;
      }
      for (var i = 1; i < ropePositions.length; i += 1) {
        let goalPos = { x: ropePositions[i - 1].x, y: ropePositions[i - 1].y };
        if (Math.abs(goalPos.x - ropePositions[i].x) === 2) {
          ropePositions[i].x = (goalPos.x + ropePositions[i].x) / 2;
          if (Math.abs(goalPos.y - ropePositions[i].y) === 2) {
            ropePositions[i].y = (goalPos.y + ropePositions[i].y) / 2;
          } else if (goalPos.y !== ropePositions[i].y) {
            ropePositions[i].y = goalPos.y;
          }
        } else if (Math.abs(goalPos.y - ropePositions[i].y) === 2) {
          ropePositions[i].y = (goalPos.y + ropePositions[i].y) / 2;
          if (Math.abs(goalPos.x - ropePositions[i].x) === 2) {
            ropePositions[i].x = (goalPos.x + ropePositions[i].x) / 2;
          } else if (goalPos.x !== ropePositions[i].x) {
            ropePositions[i].x = goalPos.x;
          }
        }
        goalPos = { x: ropePositions[i].x, y: ropePositions[i].y };
      }

      visitedPositionsT.add(
        posToString(ropePositions[ropePositions.length - 1]),
      );
    });
  });
  return visitedPositionsT.size;
};

const solve = (input: string[], numberOfKnots: number): number => {
  const moves = parseInputToMoves(input);
  const numberOfVisitedPositions = doMoves(moves, numberOfKnots);
  return numberOfVisitedPositions;
};

export const part1 = (input: string[], extraProps: number): number =>
  solve(input, extraProps);

export const part2 = (input: string[], extraProps: number): number =>
  solve(input, extraProps);
