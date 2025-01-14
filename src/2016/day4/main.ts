import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day4';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 1514 },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Room = [string, number, string];

const parseRoom = (s: string): Room => [
  s.substring(0, s.lastIndexOf('-')),
  parseInt(s.split('[')[0].substring(s.lastIndexOf('-') + 1)),
  s.split('[')[1].slice(0, -1),
];

const getChecksum = (counts: { [key: string]: number }): string =>
  Object.entries(counts)
    .sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0))
    .sort((a, b) => b[1] - a[1])
    .map((c) => c[0])
    .filter((_, i) => i < 5)
    .join('');

const isRealRoom = (r: Room): boolean => {
  const counts: { [key: string]: number } = {};

  r[0]
    .replaceAll('-', '')
    .split('')
    .forEach((c) => {
      if (!counts[c]) {
        counts[c] = 0;
      }
      counts[c]++;
    });

  return getChecksum(counts) === r[2];
};

const cc = (s: string) => s.charCodeAt(0);
const cca = cc('a');

const rotate = (s: string, n: number) =>
  String.fromCharCode(((cc(s) - cca + n) % 26) + cca);

const decryptRoom = (r: Room): string =>
  r[0]
    .split('')
    .map((c) => (c === '-' ? ' ' : rotate(c, r[1])))
    .join('');

export const part1 = (input: string[]): number =>
  input
    .map(parseRoom)
    .filter(isRealRoom)
    .reduce((acc, r) => acc + r[1], 0);

export const part2 = (input: string[]): number =>
  input
    .map(parseRoom)
    .find((r) => decryptRoom(r) === 'northpole object storage')?.[1] || -1;

// input.map(parseRoom).forEach((r) => console.log(decryptRoom(r), r[1]));
