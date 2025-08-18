import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day9';
export const testsPart1 = [
  { input: '{}', result: 1 },
  { input: '{{{}}}', result: 6 },
  { input: '{{},{}}', result: 5 },
  { input: '{{{},{},{{}}}}', result: 16 },
  { input: '{<a>,<a>,<a>,<a>}', result: 1 },
  { input: '{{<ab>},{<ab>},{<ab>},{<ab>}}', result: 9 },
  { input: '{{<!!>},{<!!>},{<!!>},{<!!>}}', result: 9 },
  { input: '{{<a!>},{<a!>},{<a!>},{<ab>}}', result: 3 },
];

export const testsPart2 = [
  { input: '<>', result: 0 },
  { input: '<random characters>', result: 17 },
  { input: '<<<<>', result: 3 },
  { input: '<{!>}>', result: 2 },
  { input: '<!!>', result: 0 },
  { input: '<!!!>>', result: 0 },
  { input: '<{o"i!a,<{i<a>', result: 10 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const parseGroup = (group: string) => {
  let score = 0;
  let groupScore = 0;

  let index = 0;
  let isGarbage = false;
  let garbage = 0;
  while (index < group.length) {
    if (!isGarbage) {
      switch (group[index]) {
        case '{':
          groupScore += 1;
          break;
        case '}':
          score += groupScore;
          groupScore -= 1;
          break;
        case '!':
          index += 1;
          break;
        case '<':
          isGarbage = true;
          break;
      }
      index += 1;
    } else {
      switch (group[index]) {
        case '!':
          index += 1;
          break;
        case '>':
          isGarbage = false;
          break;
        default:
          garbage += 1;
      }
      index += 1;
    }
  }
  return { score, garbage };
};

export const part1 = (input: string): number => {
  return parseGroup(input).score;
};

export const part2 = (input: string): number => {
  return parseGroup(input).garbage;
};
