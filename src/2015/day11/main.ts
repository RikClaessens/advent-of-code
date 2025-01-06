import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day11';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const increment = (password: string) => {
  const chars = password.split('');
  for (let i = chars.length - 1; i >= 0; i--) {
    if (chars[i] === 'z') {
      chars[i] = 'a';
    } else {
      chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
      break;
    }
  }
  return chars.join('');
};

const isValid = (password: string) => {
  if (
    password.includes('i') ||
    password.includes('o') ||
    password.includes('l')
  ) {
    return false;
  }
  const pairs = password.match(/(.)\1/g);
  if (!pairs || pairs.length < 2) {
    return false;
  }
  const straight = password.match(
    /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/,
  );
  if (!straight) {
    return false;
  }
  return true;
};

const findNext = (password: string) => {
  while (!isValid(password)) {
    password = increment(password);
  }
  return password;
};

export const part1 = (input: string): string => findNext(input);

export const part2 = (input: string): string =>
  findNext(increment(findNext(input)));
