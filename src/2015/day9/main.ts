import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day9';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 605 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 982 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getPermutations = <T>(list: T[], size = list.length): T[][] => {
  if (size > list.length) {
    return [];
  } else if (size == 1) {
    return list.map((x) => [x]);
  }
  return list.flatMap((x) =>
    getPermutations(
      list.filter((y) => y !== x),
      size - 1,
    ).map((y) => [x, ...y]),
  );
};

const getDistance = (input: string[]): [number, number] => {
  const nodes = new Set<string>();
  const edges = new Map<string, number>();
  input.map((line) => {
    const [_, from, to, distance] = line.match(
      /(\w+) to (\w+) = (\d+)/,
    ) as string[];
    nodes.add(from);
    nodes.add(to);
    edges.set(`${from},${to}`, parseInt(distance));
    edges.set(`${to},${from}`, parseInt(distance));
  });

  const permutations = getPermutations(Array.from(nodes));

  let minDistance = Infinity;
  let maxDistance = -Infinity;

  permutations.forEach((permutation) => {
    let distance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
      distance += edges.get(
        `${permutation[i]},${permutation[i + 1]}`,
      ) as number;
    }
    minDistance = Math.min(minDistance, distance);
    maxDistance = Math.max(maxDistance, distance);
  });

  return [minDistance, maxDistance];
};

export const part1 = (input: string[]): number => getDistance(input)[0];

export const part2 = (input: string[]): number => getDistance(input)[1];
