import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day10';

export const testsPart1 = [
  { input: '1', extraProps: { times: 1 }, result: 2 },
  { input: '11', extraProps: { times: 1 }, result: 2 },
  { input: '21', extraProps: { times: 1 }, result: 4 },
  { input: '1211', extraProps: { times: 1 }, result: 6 },
  { input: '111221', extraProps: { times: 1 }, result: 6 },
];

export const extraPropsPart1 = { times: 40 };
export const extraPropsPart2 = { times: 50 };

export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const lookAndSay = (input: string): string => {
  let result = '';
  let count = 1;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[i + 1]) {
      count++;
    } else {
      result += `${count}${input[i]}`;
      count = 1;
    }
  }
  return result;
};

const doLookAndSayTimes = (input: string, times: number) => {
  let result = input;
  for (let i = 0; i < times; i++) {
    result = lookAndSay(result);
  }
  return result;
};

export const part1 = (input: string, { times }: { times: number }): number =>
  doLookAndSayTimes(input, times).length;

export const part2 = (input: string, { times }: { times: number }): number =>
  doLookAndSayTimes(input, times).length;
