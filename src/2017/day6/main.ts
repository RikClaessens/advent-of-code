import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day6';
export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 5 },
];

export const testsPart2 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 4 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const getRedistributions = (banks: number[], lastSeen = false): number => {
  const key = (b: number[]) => b.map((n) => n.toString()).join(',');
  const redistributions: string[] = [];
  redistributions.push(key(banks));
  let loop = false;
  let lastSeenIndex = 0;
  while (!loop) {
    let maxValue = 0;
    let maxIndex = 0;
    banks.forEach((b, i) => {
      if (b > maxValue) {
        maxValue = b;
        maxIndex = i;
      }
    });
    banks[maxIndex] = 0;
    for (let i = 1; i <= maxValue; i += 1) {
      banks[(maxIndex + i) % banks.length] += 1;
    }
    const k = key(banks);
    if (redistributions.indexOf(k) !== -1) {
      loop = true;
      lastSeenIndex = redistributions.indexOf(k);
    } else {
      redistributions.push(k);
    }
  }
  return lastSeen
    ? redistributions.length - lastSeenIndex
    : redistributions.length;
};

export const part1 = (input: string): number => {
  const banks = input.split('\t').map((n) => parseInt(n));
  return getRedistributions(banks);
};

export const part2 = (input: string): number => {
  const banks = input.split('\t').map((n) => parseInt(n));
  return getRedistributions(banks, true);
};
