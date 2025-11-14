import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day19';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 'ABCDEF' },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 38 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

enum Dir {
  N,
  E,
  S,
  W,
}

const dirDeltas = {
  [Dir.N]: [-1, 0],
  [Dir.E]: [0, 1],
  [Dir.S]: [1, 0],
  [Dir.W]: [0, -1],
};

const travelMaze = (input: string[]): [string, number] => {
  const maze = input.map((l) => l.split(''));
  let dir: Dir = Dir.S;
  let pos = [0, maze[0].indexOf('|')];
  const letters: string[] = [];
  let steps = 1;

  const getNextPos = (dirToGo: Dir): [number, number] => [
    pos[0] + dirDeltas[dirToGo][0],
    pos[1] + dirDeltas[dirToGo][1],
  ];

  while (true) {
    pos = getNextPos(dir);

    if (pos[0] < 0 || pos[1] < 0 || maze[pos[0]][pos[1]] === ' ') {
      break;
    }
    steps += 1;
    const symbol = maze[pos[0]][pos[1]];
    if (symbol !== '|' && symbol !== '-') {
      if (symbol === '+') {
        A: for (const nextDir of [Dir.N, Dir.S, Dir.E, Dir.W].filter(
          (d) => d === (dir + 1) % 4 || d === (dir + 3) % 4,
        )) {
          const nextPos = getNextPos(nextDir);
          if (
            nextPos[0] >= 0 &&
            nextPos[1] >= 0 &&
            maze[nextPos[0]][nextPos[1]] !== ' '
          ) {
            dir = nextDir;
            break A;
          }
        }
      } else {
        letters.push(symbol);
      }
    }
  }

  return [letters.join(''), steps];
};

export const part1 = (input: string[]): string => travelMaze(input)[0];

export const part2 = (input: string[]): number => travelMaze(input)[1];
