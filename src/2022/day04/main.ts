import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day04';

export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 2 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 4 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Pair = {
  min: number;
  max: number;
};

const parseInputToPairs = (input: string[]): { pair1: Pair; pair2: Pair }[] =>
  input.map((pairs) => {
    const pairsSplit = pairs.split(',');
    const pair1 = {
      min: Number.parseInt(pairsSplit[0].split('-')[0]),
      max: Number.parseInt(pairsSplit[0].split('-')[1]),
    };
    const pair2 = {
      min: Number.parseInt(pairsSplit[1].split('-')[0]),
      max: Number.parseInt(pairsSplit[1].split('-')[1]),
    };
    return { pair1, pair2 };
  });

const doPairsFullyOverlap = (pair1: Pair, pair2: Pair): boolean =>
  (pair1.min >= pair2.min && pair1.max <= pair2.max) ||
  (pair2.min >= pair1.min && pair2.max <= pair1.max);

const doesPair1OverLapPair2 = (pair1: Pair, pair2: Pair): boolean =>
  (pair1.min >= pair2.min && pair1.min <= pair2.max) ||
  (pair1.max >= pair2.min && pair1.max <= pair2.max);

const doPairsOverlap = (pair1: Pair, pair2: Pair): boolean =>
  doesPair1OverLapPair2(pair1, pair2) || doesPair1OverLapPair2(pair2, pair1);

export const part1 = (input: string[]): number =>
  parseInputToPairs(input).reduce(
    (totalOverlappingPairs: number, pairs) =>
      totalOverlappingPairs +
      (doPairsFullyOverlap(pairs.pair1, pairs.pair2) ? 1 : 0),
    0,
  );

export const part2 = (input: string[]): number =>
  parseInputToPairs(input).reduce(
    (totalOverlappingPairs: number, pairs) =>
      totalOverlappingPairs +
      (doPairsOverlap(pairs.pair1, pairs.pair2) ? 1 : 0),
    0,
  );
