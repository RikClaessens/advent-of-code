import { getInput } from '../../getInput.ts';

export const year = '2025';
export const day = 'day11';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 5 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test2.txt`), result: 2 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Graph = Map<string, string[]>;

const getGraph = (input: string[]): Graph => {
  const graph: Graph = new Map<string, string[]>();

  input.forEach((line) => {
    const label = line.split(':')[0];
    const nodes = line.split(':')[1].split(' ').filter(Boolean);
    graph.set(label, nodes);
  });

  return graph;
};

const cacheKey = (node: string, nodesToVisit: Set<string> = new Set()) =>
  nodesToVisit ? `${node}:${[...nodesToVisit].sort().join(',')}` : node;

const findAllPaths = (
  graph: Graph,
  start: string,
  nodesToVisit: Set<string> = new Set(),
): number => {
  const cache: Record<string, number> = {};

  const dfs = (
    node: string,
    nodesToVisit: Set<string> = new Set(),
    path: Set<string> = new Set(),
  ): number => {
    if (node === 'out') {
      return nodesToVisit.size === 0 ? 1 : 0;
    }
    if (path.has(node)) {
      return 0;
    }
    const key = cacheKey(node, nodesToVisit);

    if (key in cache) {
      return cache[key];
    }

    const newNodesToVisit = new Set(nodesToVisit);
    newNodesToVisit.delete(node);

    path.add(node);

    const result = (graph.get(node) || []).reduce(
      (sum, n) => sum + dfs(n, newNodesToVisit, path),
      0,
    );

    path.delete(node);
    return (cache[key] = result);
  };

  return dfs(start, nodesToVisit);
};

export const part1 = (input: string[]): number =>
  findAllPaths(getGraph(input), 'you');

export const part2 = (input: string[]): number =>
  findAllPaths(getGraph(input), 'svr', new Set(['fft', 'dac']));
