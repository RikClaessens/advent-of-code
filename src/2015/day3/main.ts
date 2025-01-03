import { getInputAsString } from '../../getInput.ts';

export const year = '2015';
export const day = 'day3';
export const testsPart1 = [
  { input: '>', result: 2 },
  { input: '^>v<', result: 4 },
  { input: '^v^v^v^v^v', result: 2 },
];

export const testsPart2 = [
  { input: '^v', result: 3 },
  { input: '^>v<', result: 3 },
  { input: '^v^v^v^v^v', result: 11 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const part1 = (input: string): number => {
  const pos = [0, 0];
  const houses = new Set<string>();
  houses.add(pos.join(','));
  input.split('').forEach((c) => {
    switch (c) {
      case '^':
        pos[1]++;
        break;
      case 'v':
        pos[1]--;
        break;
      case '>':
        pos[0]++;
        break;
      case '<':
        pos[0]--;
        break;
    }
    houses.add(pos.join(','));
  });
  return houses.size;
};

export const part2 = (input: string): number => {
  const pos = [
    [0, 0],
    [0, 0],
  ];
  const houses = new Set<string>();
  houses.add(pos[0].join(','));
  input.split('').forEach((c, cIndex) => {
    switch (c) {
      case '^':
        pos[cIndex % 2][1]++;
        break;
      case 'v':
        pos[cIndex % 2][1]--;
        break;
      case '>':
        pos[cIndex % 2][0]++;
        break;
      case '<':
        pos[cIndex % 2][0]--;
        break;
    }
    houses.add(pos[cIndex % 2].join(','));
  });
  return houses.size;
};
