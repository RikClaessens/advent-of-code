import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day24';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { intersectionMin: 7, intersectionMax: 27 },
    result: 2,
  },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);
export const extraPropsPart1 = {
  intersectionMin: 200000000000000,
  intersectionMax: 400000000000000,
};

type HailStone = {
  p1: Vector3;
  p2: Vector3;
  v: Vector3;
};

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

const eps = Number.EPSILON;

const subtract = (p1: Vector3, p2: Vector3): Vector3 => {
  return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z };
};

const dot = (p1: Vector3, p2: Vector3): number => {
  return p1.x * p2.x + p1.y * p2.y + p1.z * p2.z;
};

const length = (p: Vector3): number => {
  return Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
};

const isIntersectionForwards = (hailstone: HailStone, p: Vector3): boolean =>
  (p.x - hailstone.p1.x) * hailstone.v.x >= 0;

const decimals = (n: number) => Number.parseFloat(n.toFixed(3));

// https://paulbourke.net/geometry/pointlineplane/
// I was assuming part 2 involved  intersections of 3d lines, but turned out not to be the case, so this is way over-engineered!
const getIntersection = (h1: HailStone, h2: HailStone): Vector3 | null => {
  const p1 = h1.p1;
  const p2 = h1.p2;
  const p3 = h2.p1;
  const p4 = h2.p2;

  const p13 = subtract(p1, p3);
  const p43 = subtract(p4, p3);

  if (length(p43) < eps) {
    return null;
  }
  const p21 = subtract(p2, p1);

  if (length(p21) < eps) {
    return null;
  }

  const d1343 = dot(p13, p43);
  const d4321 = dot(p43, p21);
  const d1321 = dot(p13, p21);
  const d4343 = dot(p43, p43);
  const d2121 = dot(p21, p21);

  const denom = d2121 * d4343 - d4321 * d4321;
  if (Math.abs(denom) < eps) {
    return null;
  }
  const numer = d1343 * d4321 - d1321 * d4343;

  const mua = numer / denom;

  return {
    x: decimals(p1.x + mua * p21.x),
    y: decimals(p1.y + mua * p21.y),
    z: decimals(p1.z + mua * p21.z),
  };
};

const getHailStones = (input: string[], ignoreZ: boolean): HailStone[] => {
  const hailStones: HailStone[] = [];

  input.forEach((line) => {
    const parts = line.split(' @ ');
    const p1: Vector3 = {
      x: parseInt(parts[0].split(',')[0]),
      y: parseInt(parts[0].split(',')[1]),
      z: ignoreZ ? 0 : parseInt(parts[0].split(',')[2]),
    };
    const v = {
      x: parseInt(parts[1].split(',')[0]),
      y: parseInt(parts[1].split(',')[1]),
      z: ignoreZ ? 0 : parseInt(parts[1].split(',')[2]),
    };
    const p2 = subtract(p1, v);
    hailStones.push({ p1, p2, v });
  });
  return hailStones;
};

type Range = [number, number];

const inRange = (n: number, range: Range): boolean =>
  n >= range[0] && n <= range[1];

const intersectionIsWithinBounds = (
  p: Vector3,
  intersectionMin: number,
  intersectionMax: number,
  ignoreZ: boolean,
) => {
  return (
    inRange(p.x, [intersectionMin, intersectionMax]) &&
    inRange(p.y, [intersectionMin, intersectionMax]) &&
    (ignoreZ || inRange(p.z, [intersectionMin, intersectionMax]))
  );
};

const solve = (
  input: string[],
  ignoreZ: boolean,
  {
    intersectionMin,
    intersectionMax,
  }: { intersectionMin: number; intersectionMax: number },
) => {
  const hailStones = getHailStones(input, ignoreZ);

  let numberOfIntersections = 0;

  for (let i = 0; i < hailStones.length; i++) {
    for (let j = i + 1; j < hailStones.length; j++) {
      const intersection = getIntersection(hailStones[i], hailStones[j]);
      if (
        intersection &&
        intersectionIsWithinBounds(
          intersection,
          intersectionMin,
          intersectionMax,
          ignoreZ,
        ) &&
        isIntersectionForwards(hailStones[i], intersection) &&
        isIntersectionForwards(hailStones[j], intersection)
      ) {
        numberOfIntersections++;
      }
    }
  }
  return numberOfIntersections;
};

export const part1 = (
  input: string[],
  {
    intersectionMin,
    intersectionMax,
  }: { intersectionMin: number; intersectionMax: number },
): number => {
  return solve(input, true, {
    intersectionMin,
    intersectionMax,
  });
};

export const part2 = (): number => {
  // run main.ts in the part2 folder to get the answer
  return 566373506408017;
};
