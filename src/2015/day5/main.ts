import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day5';
export const testsPart1 = [
  { input: ['ugknbfddgicrmopn'], result: 1 },
  { input: ['aaa'], result: 1 },
  { input: ['jchzalrnumimnmhp'], result: 0 },
  { input: ['haegwjzuvuyypxyu'], result: 0 },
  { input: ['dvszwmarrgswjxmb'], result: 0 },
];

export const testsPart2 = [
  { input: ['qjhvhtzxzqqjkmpb'], result: 1 },
  { input: ['xxyxx'], result: 1 },
  { input: ['uurcxstgmygtbstg'], result: 0 },
  { input: ['ieodomkazucvgmuy'], result: 0 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const isNice = (input: string): boolean => {
  if ((input.match(/[aeiou]/g)?.length || 0) < 3) return false;
  if (!input.match(/(.)\1/)) return false;
  for (const combo of ['ab', 'cd', 'pq', 'xy']) {
    if (input.includes(combo)) {
      return false;
    }
  }
  return true;
};

const isNicePart2 = (input: string): boolean => {
  if (!input.match(/(..).*\1/)) return false;
  if (!input.match(/(.).\1/)) return false;
  return true;
};

export const part1 = (input: string[]): number => {
  return input.reduce((acc, curr) => {
    return acc + (isNice(curr) ? 1 : 0);
  }, 0);
};

export const part2 = (input: string[]): number => {
  return input.reduce((acc, curr) => {
    return acc + (isNicePart2(curr) ? 1 : 0);
  }, 0);
};
