import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day06';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 288 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 71503 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

type Race = {
  time: number;
  recordDistance: number;
};

type WinningTime = {
  min: number;
  max: number;
};

const getNumbers = (input: string): number[] =>
  input
    .substring(11)
    .split(' ')
    .filter((x) => x)
    .map((n) => Number.parseInt(n));

const getNumbersPart2 = (input: string): number[] => [
  Number.parseInt(input.substring(11).replaceAll(' ', '')),
];

const getRaces = (input: string[]): Race[] => {
  const times = getNumbers(input[0]);
  const distances = getNumbers(input[1]);

  return times.map((time, index) => ({
    time,
    recordDistance: distances[index],
  }));
};

const getRacesPart2 = (input: string[]): Race[] => {
  const times = getNumbersPart2(input[0]);
  const distances = getNumbersPart2(input[1]);

  return times.map((time, index) => ({
    time,
    recordDistance: distances[index],
  }));
};

const findWinningTimesToHoldButton = (race: Race): WinningTime => {
  const winningTimes = { min: -1, max: -1 };
  let minTimeToHoldButton = 0;
  let minTimeFound = false;
  while (minTimeToHoldButton <= race.time && !minTimeFound) {
    if (
      minTimeToHoldButton * (race.time - minTimeToHoldButton) >
      race.recordDistance
    ) {
      winningTimes.min = minTimeToHoldButton;
      minTimeFound = true;
    }
    minTimeToHoldButton += 1;
  }

  let maxTimeToHoldButton = race.time;
  let maxTimeFound = false;
  while (maxTimeToHoldButton >= 0 && !maxTimeFound) {
    if (
      maxTimeToHoldButton * (race.time - maxTimeToHoldButton) >
      race.recordDistance
    ) {
      winningTimes.max = maxTimeToHoldButton;
      maxTimeFound = true;
    }
    maxTimeToHoldButton -= 1;
  }
  return winningTimes;
};

export const part1 = (input: string[]): number => {
  const races = getRaces(input);
  const winningTimes = races.map(findWinningTimesToHoldButton);

  return winningTimes.reduce(
    (result, winningTime) => (winningTime.max - winningTime.min + 1) * result,
    1,
  );
};

export const part2 = (input: string[]): number => {
  const races = getRacesPart2(input);
  const winningTimes = races.map(findWinningTimesToHoldButton);

  return winningTimes.reduce(
    (result, winningTime) => (winningTime.max - winningTime.min + 1) * result,
    1,
  );
};
