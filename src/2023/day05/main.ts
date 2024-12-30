import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day05';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 35 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 46 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

const fillMap = (input: string[], startIndex: number) => {
  let index = startIndex + 2;
  const map = [];
  while (input[index]) {
    map.push(input[index].split(' ').map((n) => Number.parseInt(n)));
    index += 1;
  }
  return { map, endIndex: index };
};

const getSeeds = (input: string[]): number[] =>
  input[0]
    .substring(7)
    .split(' ')
    .map((n) => Number.parseInt(n));

const getMaps = (input: string[]): number[][][] => {
  let index = 1;
  const maps = new Array(7).fill({}).map(() => {
    const { map, endIndex } = fillMap(input, index);
    index = endIndex;
    return map;
  });
  return maps;
};

const getMinLocation = (seeds: number[], maps: number[][][]): number => {
  let minLocation = Number.MAX_VALUE;

  seeds.forEach((seed) => {
    let location = seed;

    maps.forEach((map) => {
      map.every((range) => {
        const destRangeStart = range[0];
        const sourceRangeStart = range[1];
        const rangeLength = range[2];
        if (
          location >= sourceRangeStart &&
          location <= sourceRangeStart + rangeLength - 1
        ) {
          location = location - sourceRangeStart + destRangeStart;

          return false;
        }
        return true;
      });
    });

    minLocation = Math.min(minLocation, location);
  });
  return minLocation;
};

export const part1 = (input: string[]): number => {
  const seeds = getSeeds(input);
  const maps = getMaps(input);
  return getMinLocation(seeds, maps);
};

export const part2 = (input: string[]): number => {
  const maps = getMaps(input);
  const part2Maps = maps.reverse();

  const seeds = getSeeds(input);
  let lookForMinLocation = 0;
  let minLocationFound = false;

  while (!minLocationFound) {
    lookForMinLocation += 1;
    let minLocation = lookForMinLocation;
    part2Maps.forEach((map) => {
      map.every((range) => {
        const destRangeStart = range[0];
        const sourceRangeStart = range[1];
        const rangeLength = range[2];
        if (
          minLocation >= destRangeStart &&
          minLocation <= destRangeStart + rangeLength - 1
        ) {
          minLocation = minLocation - destRangeStart + sourceRangeStart;
          return false;
        }
        return true;
      });
    });
    let index = 0;
    while (index < seeds.length) {
      const rangeStart = seeds[index];
      const rangeLength = seeds[index + 1];
      index += 2;
      if (minLocation >= rangeStart && minLocation < rangeStart + rangeLength) {
        minLocationFound = true;
      }
    }
  }
  return lookForMinLocation;
};
