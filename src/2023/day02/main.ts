import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day02';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 8 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 2286 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

export const maxGrabPart1 = { r: 12, g: 13, b: 14 };

type Grab = {
  r: number;
  g: number;
  b: number;
};

type Game = {
  id: number;
  grabs: Grab[];
};

const parseGame = (line: string, id: number): Game => {
  const grabs = line
    .substring(line.indexOf(':') + 2)
    .split(';')
    .map((grabSubstring) => {
      return {
        r: Number.parseInt(grabSubstring.match(/(\d+) red/g)?.[0] || '0'),
        g: Number.parseInt(grabSubstring.match(/(\d+) green/g)?.[0] || '0'),
        b: Number.parseInt(grabSubstring.match(/(\d+) blue/g)?.[0] || '0'),
      };
    });

  return { id, grabs };
};

const getMaxGrab = (game: Game): Grab => {
  const maxGrab: Grab = { r: 0, g: 0, b: 0 };
  game.grabs.forEach((grab) => {
    maxGrab.r = Math.max(maxGrab.r, grab.r);
    maxGrab.g = Math.max(maxGrab.g, grab.g);
    maxGrab.b = Math.max(maxGrab.b, grab.b);
  });
  return maxGrab;
};

export const part1 = (input: string[], maxGrab: Grab): number => {
  const games = input.map((line, id) => parseGame(line, id + 1));
  let sum = 0;
  games.forEach((game) => {
    const maxGrab = getMaxGrab(game);
    if (
      maxGrab.r <= maxGrabPart1.r &&
      maxGrab.g <= maxGrabPart1.g &&
      maxGrab.b <= maxGrabPart1.b
    ) {
      sum += game.id;
    }
  });
  return sum;
};

export const part2 = (input: string[]): number => {
  const games = input.map((line, id) => parseGame(line, id + 1));
  let sum = 0;
  games.forEach((game) => {
    const maxGrab = getMaxGrab(game);
    sum += maxGrab.r * maxGrab.g * maxGrab.b;
  });
  return sum;
};
