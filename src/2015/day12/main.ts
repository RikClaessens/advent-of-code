import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day12';
export const testsPart1 = [
  { input: ['[1,2,3]'], result: 6 },
  { input: ['{"a":2,"b":4}'], result: 6 },
  { input: ['[[[3]]]'], result: 3 },
  { input: ['{"a":{"b":4},"c":-1}'], result: 3 },
  { input: ['{"a":[-1,1]}'], result: 0 },
  { input: ['[-1,{"a":1}]'], result: 0 },
  { input: ['[]'], result: 0 },
  { input: ['{}'], result: 0 },
];

export const testsPart2 = [
  { input: ['[1,2,3]'], result: 6 },
  { input: ['[1,{"c":"red","b":2},3]'], result: 4 },
  { input: ['{"d":"red","e":[1,2,3,4],"f":5}'], result: 0 },
  { input: ['[1,"red",5]'], result: 6 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

// deno-lint-ignore no-explicit-any
const sum = (obj: any, ignoreRed = false): number => {
  if (typeof obj === 'number') {
    return obj;
  }
  if (typeof obj === 'string') {
    return 0;
  }
  if (Array.isArray(obj)) {
    return obj.reduce((acc, val) => acc + sum(val, ignoreRed), 0);
  }
  if (typeof obj === 'object') {
    if (ignoreRed && Object.values(obj).includes('red')) {
      return 0;
    }
    return Object.values(obj).reduce(
      (acc: number, val) => acc + sum(val, ignoreRed),
      0,
    );
  }
  return 0;
};

export const part1 = (input: string[]): number =>
  input.reduce((acc, line) => acc + sum(JSON.parse(line)), 0);

export const part2 = (input: string[]): number =>
  input.reduce((acc, line) => acc + sum(JSON.parse(line), true), 0);
