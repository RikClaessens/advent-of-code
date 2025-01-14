import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day3';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const isValidTriangle = (t: number[]) =>
  t[0] + t[1] > t[2] && t[0] + t[2] > t[1] && t[1] + t[2] > t[0];

const getTriangles = (input: string[]): number[][] =>
  input.map((i) => i.trim().split(/\s+/).map(Number));

const transpose = (triangles: number[][]) => {
  const transposed: number[][] = [];
  let i = 0;
  while (i < triangles.length) {
    const newTriangles: number[][] = [[], [], []];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        newTriangles[col].push(triangles[i + row][col]);
      }
    }
    transposed.push(...newTriangles);
    i += 3;
  }
  return transposed;
};

export const part1 = (input: string[]): number =>
  getTriangles(input).filter(isValidTriangle).length;

export const part2 = (input: string[]): number =>
  transpose(getTriangles(input)).filter(isValidTriangle).length;
