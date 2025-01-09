import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day16';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Sue = {
  children?: number;
  cats?: number;
  samoyeds?: number;
  pomeranians?: number;
  akitas?: number;
  vizslas?: number;
  goldfish?: number;
  trees?: number;
  cars?: number;
  perfumes?: number;
};

const getSues = (input: string[]): Sue[] => {
  const sues: Sue[] = [];
  input.forEach((line) => {
    const matches = Array.from(line.matchAll(/(\w+: \d+)/g)).reduce(
      (acc, match) => ({
        ...acc,
        [match[0].split(': ')[0]]: parseInt(match[0].split(': ')[1]),
      }),
      {},
    );
    sues.push(matches);
  });
  return sues;
};

const auntSue = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
} as const;

export const part1 = (input: string[]): number =>
  getSues(input).findIndex((sue) =>
    Object.entries(sue).every(
      ([key, value]) => auntSue[key as keyof typeof auntSue] === value,
    ),
  ) + 1;

export const part2 = (input: string[]): number =>
  getSues(input).findIndex((sue) =>
    Object.entries(sue).every(([key, value]) => {
      const testValue = auntSue[key as keyof typeof auntSue];
      if (['cats', 'trees'].includes(key)) {
        return testValue < value;
      }
      if (['pomeranians', 'goldfish'].includes(key)) {
        return testValue > value;
      }
      return testValue === value;
    }),
  ) + 1;
