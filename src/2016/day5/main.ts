import { md5 } from '@takker/md5';
import { encodeHex } from '@std/encoding';
import { getInputAsString } from '../../getInput.ts';
import { memoize } from '../../utils.ts';

export const year = '2016';
export const day = 'day5';
export const testsPart1 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: '18f47a30',
  },
];

export const testsPart2 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: '05ace8e3',
  },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const findHashWithLeadingZeros = memoize(
  (input: string, start: number, zeros: number): [string, number] => {
    let i = start;
    const leadingZeros = '0'.repeat(zeros);
    let hash = '';
    while (true) {
      hash = encodeHex(md5(`${input}${i}`));
      if (hash.startsWith(leadingZeros)) {
        break;
      }
      i++;
    }
    return [hash, i];
  },
);

export const part1 = (input: string): string => {
  let password = '';
  let start = 0;
  for (let i = 0; i < 8; i++) {
    const [hash, index] = findHashWithLeadingZeros(input, start, 5);
    start = index + 1;
    password += hash.split('')[5];
  }
  return password;
};

export const part2 = (input: string): string => {
  const password = Array(8).fill('.');
  let start = 0;
  while (password.some((c) => c === '.')) {
    const [hash, index] = findHashWithLeadingZeros(input, start, 5);
    start = index + 1;
    if (
      parseInt(hash.split('')[5]) < password.length &&
      password[parseInt(hash.split('')[5])] === '.'
    ) {
      password[parseInt(hash.split('')[5])] = hash.split('')[6];
    }
  }
  return password.join('');
};
