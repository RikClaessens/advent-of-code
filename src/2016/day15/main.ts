import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day15';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 5 },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Disc = { noOfPos: number; startPos: number };
const getDiscs = (input: string[]): Disc[] =>
  input
    .map((i) =>
      i.match(
        /Disc #\d has (\d+) positions; at time=0, it is at position (\d)./,
      ),
    )
    .map((i) => ({
      noOfPos: parseInt(i?.[1] || '0'),
      startPos: parseInt(i?.[2] || '0'),
    }));

const getTForCapsuleDrop = (discs: Disc[]): number => {
  let t = 0;
  while (discs.some((d, di) => (d.startPos + di + t + 1) % d.noOfPos !== 0)) {
    t++;
  }
  return t;
};

export const part1 = (input: string[]): number =>
  getTForCapsuleDrop(getDiscs(input));

export const part2 = (input: string[]): number =>
  getTForCapsuleDrop([...getDiscs(input), { noOfPos: 11, startPos: 0 }]);
