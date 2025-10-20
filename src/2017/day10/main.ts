import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day10';
export const testsPart1 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: 12,
    extraProps: { length: 5 },
  },
];

export const testsPart2 = [
  { input: '', result: 'a2582a3a0e66e6e86e3812dcb672a272' },
  { input: 'AoC 2017', result: '33efeb34ea91902bb2f59c9920caa6cd' },
  { input: '1,2,3', result: '3efbe78a8d82f29979031a4aa0b16a9d' },
  { input: '1,2,4', result: '63960835bcdc130f0b66d7ff4f6a5a8e' },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const runRound = (
  inputLengths: number[],
  list: number[],
  currentPosition: number,
  skipSize: number,
): [number[], number, number] => {
  const length = list.length;

  for (const n of inputLengths) {
    const sublist = [];
    for (let i = 0; i < n; i++) {
      sublist.push(list[(currentPosition + i) % length]);
    }
    sublist.reverse();
    for (let i = 0; i < n; i++) {
      list[(currentPosition + i) % length] = sublist[i];
    }
    currentPosition = (currentPosition + n + skipSize) % length;
    skipSize++;
  }

  return [list, currentPosition, skipSize];
};

export const part1 = (
  input: string,
  { length = 256 }: { length: number },
): number => {
  const inputLengths = input.split(',').map(Number);
  const currentPosition = 0;
  const skipSize = 0;
  const list = Array.from({ length }, (_, i) => i);

  const [newList] = runRound(inputLengths, list, currentPosition, skipSize);

  return newList[0] * newList[1];
};

export const part2 = (
  input: string,
  { length = 256 }: { length: number },
): string => {
  const asciiCodes = input ? input.split('').map((c) => c.charCodeAt(0)) : [];
  const inputLengths = [...asciiCodes, 17, 31, 73, 47, 23];

  let currentPosition = 0;
  let skipSize = 0;
  let list = Array.from({ length }, (_, i) => i);

  for (let round = 0; round < 64; round++) {
    [list, currentPosition, skipSize] = runRound(
      inputLengths,
      list,
      currentPosition,
      skipSize,
    );
  }
  const denseHash = [];
  for (let i = 0; i < 16; i++) {
    let xor = list[i * 16];
    for (let j = 1; j < 16; j++) {
      xor ^= list[i * 16 + j];
    }
    denseHash.push(xor);
  }

  const hash = denseHash.map((n) => n.toString(16).padStart(2, '0')).join('');

  return hash;
};
