import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day03';

export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 157 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 70 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getPrio = (letter: string): number =>
  letter.charCodeAt(0) - (letter.toLowerCase() === letter ? 96 : 38);

export const part1 = (rucksacks: string[]): number =>
  rucksacks
    .map((rucksack) => {
      const firstCompartment = rucksack.slice(0, rucksack.length / 2);
      const secondCompartment = rucksack.slice(rucksack.length / 2);
      const duplicateLetter = firstCompartment
        .split('')
        .find((letter) => secondCompartment.indexOf(letter) >= 0);

      return duplicateLetter ? getPrio(duplicateLetter) : 0;
    })
    .reduce((total, prio) => total + prio, 0);

export const part2 = (rucksacks: string[]): number => {
  let sumOfPrios = 0;
  for (var i = 0; i < rucksacks.length; i += 3) {
    const duplicateLetter = rucksacks[i]
      .split('')
      .find(
        (letter) =>
          rucksacks[i + 1].indexOf(letter) >= 0 &&
          rucksacks[i + 2].indexOf(letter) >= 0,
      );
    sumOfPrios += duplicateLetter ? getPrio(duplicateLetter) : 0;
  }

  return sumOfPrios;
};
