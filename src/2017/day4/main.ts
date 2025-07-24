import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day4';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const isValidPassphrase = (
  passphrase: string,
  anagramsAllowed = true,
): boolean => {
  let words = passphrase.split(' ');
  if (!anagramsAllowed) {
    words = words.map((w) => w.split('').sort().join(''));
  }
  const wordSet = new Set(words);
  return words.length == wordSet.size;
};

export const part1 = (input: string[]): number => {
  let count = 0;
  input.forEach((passphrase) => {
    if (isValidPassphrase(passphrase)) {
      count += 1;
    }
  });
  return count;
};

export const part2 = (input: string[]): number => {
  let count = 0;
  input.forEach((passphrase) => {
    if (isValidPassphrase(passphrase, false)) {
      count += 1;
    }
  });
  return count;
};
