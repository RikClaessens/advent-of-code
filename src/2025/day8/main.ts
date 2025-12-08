import { getInput } from '../../getInput.ts';

export const year = '2025';
export const day = 'day8';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { numberOfConnections: 10 },
    result: 40,
  },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 25272 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Light = [number, number, number];
type Distances = number[][];

const getLights = (input: string[]): Light[] =>
  input.map((line) => line.split(',').map((n) => parseInt(n))) as Light[];

const distance = (l1: Light, l2: Light) =>
  Math.sqrt(
    (l1[0] - l2[0]) * (l1[0] - l2[0]) +
      (l1[1] - l2[1]) * (l1[1] - l2[1]) +
      (l1[2] - l2[2]) * (l1[2] - l2[2]),
  );

const computeDistances = (lights: Light[]): Distances => {
  const distances: Distances = [];

  for (let i = 0; i < lights.length; i += 1) {
    for (let j = i + 1; j < lights.length; j += 1) {
      const l1 = lights[i];
      const l2 = lights[j];
      const d = distance(l1, l2);
      distances.push([i, j, d, l1[0] * l2[0]]);
    }
  }
  return distances;
};

const sortDistances = (distances: Distances): Distances => {
  distances.sort((a, b) => a[2] - b[2]);
  return distances;
};

const connectJunctionBoxes = (
  numberOfLights: number,
  distances: Distances,
): number => {
  const circuits: number[][] = Array.from({ length: numberOfLights })
    .fill(0)
    .map((_, idx) => [idx]);
  for (let i = 1; i < distances.length; i += 1) {
    const l1Key = distances[i][0];
    const l2Key = distances[i][1];

    const c1Idx = circuits.findIndex((circuit) => circuit.includes(l1Key));
    const c1 = circuits[c1Idx];
    const c2Idx = circuits.findIndex((circuit) => circuit.includes(l2Key));
    if (c1Idx !== c2Idx) {
      const c2Merge = circuits.splice(c2Idx, 1);
      c1.push(...c2Merge[0]);
    }
  }
  return circuits
    .map((c) => c.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc * val, 1);
};

const connectJunctionBoxesInOneCircuit = (
  numberOfLights: number,
  distances: Distances,
): number => {
  const circuits: number[][] = Array.from({ length: numberOfLights })
    .fill(0)
    .map((_, idx) => [idx]);
  let result = 0;
  while (circuits.length > 1) {
    const d = distances.shift()!;
    const l1Key = d[0];
    const l2Key = d[1];

    const c1Idx = circuits.findIndex((circuit) => circuit.includes(l1Key));
    const c1 = circuits[c1Idx];
    const c2Idx = circuits.findIndex((circuit) => circuit.includes(l2Key));
    if (c1Idx !== c2Idx) {
      const c2Merge = circuits.splice(c2Idx, 1);
      c1.push(...c2Merge[0]);
      if (circuits.length === 1) {
        result = d[3];
      }
    }
  }
  return result;
};

export const part1 = (
  input: string[],
  { numberOfConnections = 1000 },
): number =>
  connectJunctionBoxes(
    input.length,
    sortDistances(computeDistances(getLights(input))).slice(
      0,
      numberOfConnections,
    ),
  );

export const part2 = (input: string[]): number =>
  connectJunctionBoxesInOneCircuit(
    input.length,
    sortDistances(computeDistances(getLights(input))),
  );
