import { getInput } from '../../getInput.ts';

export const year = '2024';
export const day = 'day01';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 11 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 31 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getRows = (input: string[]): number[][] => {
  const row1: number[] = [];
  const row2: number[] = [];
  input.forEach((line) => {
    const digits = line.split('   ');
    row1.push(Number.parseInt(digits[0]));
    row2.push(Number.parseInt(digits[1]));
  });
  row1.sort((a, b) => a - b);
  row2.sort((a, b) => a - b);

  return [row1, row2];
};

export const part1 = (input: string[]): number => {
  const [row1, row2] = getRows(input);

  let distance = 0;
  row1.forEach((_, index) => {
    distance += Math.abs(row1[index] - row2[index]);
  });
  return distance;
};

export const part2 = (input: string[]): number => {
  const [row1, row2] = getRows(input);

  let similarityScore = 0;
  row1.forEach((_, index) => {
    const x = row1[index];
    const count = row2.filter((y) => y === x).length;

    similarityScore += count * x;
  });
  return similarityScore;
};
