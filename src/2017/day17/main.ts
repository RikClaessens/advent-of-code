import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day17';
export const testsPart1 = [{ input: '3', result: 638 }];

export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const spinlock = (n: number, step: number) => {
  let buffer = [0];
  let pos = 0;
  for (var i = 1; i <= n; i += 1) {
    pos = (pos + (step % buffer.length)) % buffer.length;
    buffer = [...buffer.slice(0, pos + 1), i, ...buffer.slice(pos + 1)];
    pos += 1;
  }
  return buffer[buffer.indexOf(n) + (1 % buffer.length)];
};

const spinlockPart2 = (n: number, step: number) => {
  let pos = 0;
  let bufferLength = 1;
  let neighbor = 0;
  for (var i = 1; i <= n; i += 1) {
    pos = ((pos + (step % bufferLength)) % bufferLength) + 1;
    if (pos === 1) {
      neighbor = i;
    }
    bufferLength += 1;
  }
  return neighbor;
};

export const part1 = (input: string): number =>
  spinlock(2017, Number.parseInt(input));

export const part2 = (input: string): number =>
  spinlockPart2(50000000, Number.parseInt(input));
