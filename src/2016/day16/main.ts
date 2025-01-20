import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day16';
export const testsPart1 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    extraProps: 20,
    result: '01100',
  },
];

export const testsPart2 = [];

export const extraPropsPart1 = 272;
export const extraPropsPart2 = 35651584;
export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const dragonCurve = (a: string): string =>
  `${a}0${a
    .split('')
    .reverse()
    .map((c) => (c === '1' ? '0' : '1'))
    .join('')}`;

const checkSum = (s: string): string => {
  let c = '';
  for (let i = 0; i < s.length; i += 2) {
    c += s[i] === s[i + 1] ? '1' : 0;
  }
  return c;
};

const getRandomData = (input: string, minLength: number): string => {
  let data = input;
  while (data.length < minLength) {
    data = dragonCurve(data);
  }
  data = data.substring(0, minLength);
  let c = checkSum(data);
  while (c.length % 2 === 0) {
    c = checkSum(c);
  }
  return c;
};

export const part1 = (input: string, minLength: number): string =>
  getRandomData(input, minLength);

export const part2 = (input: string, minLength: number): string =>
  getRandomData(input, minLength);
