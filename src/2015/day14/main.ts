import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day14';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: 1000,
    result: 1120,
  },
];
export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: 1000,
    result: 689,
  },
];
export const extraPropsPart1 = 2503;
export const extraPropsPart2 = 2503;

export const input = getInput(`src/${year}/${day}/input.txt`);

type Reindeer = [string, number, number, number, number, number];

const getReindeers = (input: string[]): Reindeer[] =>
  input.map((line) => {
    const [_, name, speed, time, rest] = line.match(
      /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds./,
    ) as string[];
    return [name, parseInt(speed), parseInt(time), parseInt(rest), 0, 0];
  });

const getDistance = (reindeer: Reindeer, seconds: number) => {
  const cycleTime = reindeer[2] + reindeer[3];
  const fullCycles = Math.floor(seconds / cycleTime);
  const remainingSeconds = seconds - fullCycles * cycleTime;

  return (
    fullCycles * reindeer[1] * reindeer[2] +
    Math.min(remainingSeconds, reindeer[2]) * reindeer[1]
  );
};

export const part1 = (input: string[], seconds: number): number => {
  const reindeers = getReindeers(input);
  let maxDistance = 0;
  reindeers.forEach((reindeer) => {
    maxDistance = Math.max(getDistance(reindeer, seconds), maxDistance);
  });
  return maxDistance;
};

export const part2 = (input: string[], seconds: number): number => {
  const reindeers = getReindeers(input);

  for (let i = 1; i <= seconds; i++) {
    let maxDistance = -Infinity;
    reindeers.forEach((reindeer) => {
      const distance = getDistance(reindeer, i);
      if (distance > maxDistance) {
        maxDistance = distance;
      }
      reindeer[5] = distance;
    });
    reindeers.forEach((reindeer) => {
      if (reindeer[5] === maxDistance) {
        reindeer[4]++;
      }
    });
  }

  const highestScoringReindeer = reindeers.reduce(
    (acc, reindeer) => Math.max(acc, reindeer[4]),
    0,
  );

  return highestScoringReindeer;
};
