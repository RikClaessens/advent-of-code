import { md5 } from '@takker/md5';
import { encodeHex } from '@std/encoding';
import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day4';
export const testsPart1 = [
  { input: 'abcdef', result: 609043 },
  { input: 'pqrstuv', result: 1048970 },
];

export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const findHashWithLeadingZeros = (input: string, zeros: number): number => {
  let i = 0;
  const leadingZeros = '0'.repeat(zeros);
  while (true) {
    const hash = encodeHex(md5(`${input}${i}`));
    if (hash.startsWith(leadingZeros)) {
      break;
    }
    i++;
  }
  return i;
};

export const part1 = (input: string): number =>
  findHashWithLeadingZeros(input, 5);

export const part2 = (input: string): number =>
  findHashWithLeadingZeros(input, 6);
