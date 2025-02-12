import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day05';

export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 'CMZ' },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 'MCD' },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const parseInputToStacks = (input: string[]): string[][] => {
  const numberOfStacks = Number.parseInt(
    input
      .find((line) => line.startsWith(' 1'))
      ?.split(' ')
      .filter((x) => x)
      .reverse()[0] as string,
  );

  const crates: string[][] = [];
  let line = 0;
  while (!input[line].startsWith(' 1')) {
    for (let i = 0; i < numberOfStacks; i += 1) {
      const crate = input[line][1 + i * 4];
      if (crate !== ' ') {
        if (!crates[i]) {
          crates[i] = [];
        }
        crates[i].unshift(crate);
      }
    }

    line += 1;
  }
  return crates;
};

type Move = {
  move: number;
  from: number;
  to: number;
};

const parseInputToMoves = (input: string[]): Move[] =>
  input
    .filter((line) => line.startsWith('move'))
    .map((line) => ({
      move: Number.parseInt(line.match(/move ([0-9]*)/)?.[1] || ''),
      from: Number.parseInt(line.match(/from ([0-9]*)/)?.[1] || ''),
      to: Number.parseInt(line.match(/to ([0-9]*)/)?.[1] || ''),
    }));

const doMoves = (
  stacks: string[][],
  moves: Move[],
  moveSingleStack?: boolean,
): string[][] => {
  moves.forEach(({ move, from, to }) => {
    const cratesToMove = [];
    for (let i = 0; i < move; i += 1) {
      cratesToMove.push(stacks[from - 1].pop());
    }
    if (moveSingleStack) cratesToMove.reverse();
    cratesToMove.forEach(
      (crateToMove) => crateToMove && stacks[to - 1].push(crateToMove),
    );
  });
  return stacks;
};

export const part1 = (input: string[]): string =>
  doMoves(parseInputToStacks(input), parseInputToMoves(input)).reduce(
    (outcome, stack) => outcome + stack.pop(),
    '',
  );

export const part2 = (input: string[]): string =>
  doMoves(parseInputToStacks(input), parseInputToMoves(input), true).reduce(
    (outcome, stack) => outcome + stack.pop(),
    '',
  );
