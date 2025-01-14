import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day1';
export const testsPart1 = [
  { input: 'R2, L3', result: 5 },
  { input: 'R2, R2, R2', result: 2 },
  { input: 'R5, L5, R5, R3', result: 12 },
];

export const testsPart2 = [{ input: 'R8, R4, R4, R8', result: 4 }];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const findDistanceToEasterBunnyHQ = (
  steps: string[],
  returnOnSecondVisit = false,
): number => {
  let x = 0,
    y = 0,
    d = 0;

  const visits = new Set<string>();

  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    d = (d + (s.startsWith('R') ? 1 : 3)) % 4;
    for (let m = 0; m < parseInt(s.substring(1)); m++) {
      x += dirs[d][0];
      y += dirs[d][1];
      if (returnOnSecondVisit && visits.has(`${x},${y}`)) {
        return Math.abs(x) + Math.abs(y);
      }
      visits.add(`${x},${y}`);
    }
  }
  return Math.abs(x) + Math.abs(y);
};

export const part1 = (input: string): number =>
  findDistanceToEasterBunnyHQ(input.split(', '));

export const part2 = (input: string): number =>
  findDistanceToEasterBunnyHQ(input.split(', '), true);
