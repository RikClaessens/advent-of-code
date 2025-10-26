import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day14';
export const testsPart1 = [{ input: 'flqrgnkx', result: 8108 }];

export const testsPart2 = [{ input: 'flqrgnkx', result: 1242 }];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const hexToBinary = (hex: string): string => {
  return hex
    .split('')
    .map((c) => parseInt(c, 16).toString(2).padStart(4, '0'))
    .join('');
};

const runRound = (
  inputLengths: number[],
  list: number[],
  currentPosition: number = 0,
  skipSize: number = 0,
): [number[], number, number] => {
  const length = list.length;

  for (const n of inputLengths) {
    const sublist: number[] = [];
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

const knotHash = (numbers: number[]) => {
  let currentPosition = 0;
  let skipSize = 0;
  let list = Array.from({ length: 256 }, (_, i) => i);

  const inputLengths = [...numbers, 17, 31, 73, 47, 23];

  for (let round = 0; round < 64; round++) {
    [list, currentPosition, skipSize] = runRound(
      inputLengths,
      list,
      currentPosition,
      skipSize,
    );
  }

  const denseHash: number[] = [];
  for (let i = 0; i < 16; i++) {
    let xor = list[i * 16];
    for (let j = 1; j < 16; j++) {
      xor ^= list[i * 16 + j];
    }
    denseHash.push(xor);
  }

  return denseHash.map((n) => n.toString(16).padStart(2, '0')).join('');
};

export const part1 = (input: string): number => {
  const noOfBits = 128;
  let n = 0;
  for (let i = 0; i < noOfBits; i += 1) {
    const rowInput = `${input}-${i}`;
    const numbers = rowInput.split('').map((c) => c.charCodeAt(0));
    const hash = knotHash(numbers);
    const bits = hexToBinary(hash);
    n += bits.split('').reduce((sum, bit) => sum + Number.parseInt(bit), 0);
  }
  return n;
};

export const part2 = (input: string): number => {
  const noOfBits = 128;
  const grid: number[][] = [];
  for (let i = 0; i < noOfBits; i += 1) {
    const rowInput = `${input}-${i}`;
    const numbers = rowInput.split('').map((c) => c.charCodeAt(0));
    const hash = knotHash(numbers);
    const bits = hexToBinary(hash);
    grid.push(bits.split('').map((b) => Number.parseInt(b)));
  }

  const visited = new Set<string>();
  let regions = 0;

  const dfs = (x: number, y: number) => {
    const key = `${x},${y}`;
    if (visited.has(key) || grid[y][x] === 0) return;
    visited.add(key);
    if (x > 0) dfs(x - 1, y);
    if (x < noOfBits - 1) dfs(x + 1, y);
    if (y > 0) dfs(x, y - 1);
    if (y < noOfBits - 1) dfs(x, y + 1);
  };

  for (let y = 0; y < noOfBits; y += 1) {
    for (let x = 0; x < noOfBits; x += 1) {
      if (grid[y][x] === 1 && !visited.has(`${x},${y}`)) {
        dfs(x, y);
        regions += 1;
      }
    }
  }

  return regions;
};
