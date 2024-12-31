import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day21';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { steps: 6 },
    result: 16,
  },
];
export const testsPart2 = [];

export const extraPropsPart1 = { steps: 64 };
export const extraPropsPart2 = { steps: 26501365 };
export const input = getInput(`src/${year}/${day}/input.txt`);

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

type Graph = { [key: string]: Vertex };

type Vertex = {
  key: string;
  d: number;
  neighbors: string[];
  previous?: string;
};

const getGraph = (map: string[][]) => {
  const graph: Graph = {};
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      const key = `${x},${y}`;
      if (map[y][x] === '.') {
        graph[key] = {
          key,
          d: Infinity,
          neighbors: [],
        };
        dirs.forEach(([dx, dy]) => {
          if (map[y + dy] && map[y + dy][x + dx] === '.') {
            graph[key].neighbors.push(`${x + dx},${y + dy}`);
          }
        });
      }
    }
  }
  return graph;
};

const dijkstra = (
  graph: Graph,
  startKey: string,
  endKey: string,
  maxDistance: number = Infinity,
) => {
  graph[startKey].d = 0;
  const queue = Object.values(graph);
  const visited = new Set<string>();

  while (queue.length) {
    queue.sort((a, b) => a.d - b.d);

    const vertex = queue.shift()!;
    visited.add(vertex.key);
    if (vertex.key === endKey) {
      break;
    }
    if (vertex.d > maxDistance) {
      break;
    }
    vertex.neighbors.forEach((neighborKey) => {
      const neighbor = graph[neighborKey];
      if (!visited.has(neighbor.key)) {
        const alt = vertex.d + 1;
        if (alt < neighbor.d) {
          graph[neighbor.key].d = alt;
          graph[neighbor.key].previous = vertex.key;
        }
      }
    });
  }
  return graph;
};

export const part1 = (
  input: string[],
  { steps }: { steps: number },
): number => {
  const map = input.map((line) => line.split(''));
  const startY = map.findIndex((line) => line.includes('S'));
  const startX = map[startY].indexOf('S');
  map[startY][startX] = '.';
  const graph = getGraph(map);

  const distances = dijkstra(graph, `${startX},${startY}`, '-1,-1', steps);

  return Object.values(distances).filter((v) => v.d <= steps && v.d % 2 === 0)
    .length;
};

// inspired by https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
// this doesn't work for the test cases, only for the actual input
export const part2 = (
  input: string[],
  { steps }: { steps: number },
): number => {
  const map = input.map((line) => line.split(''));
  const halfW = (map.length - 1) / 2;
  const startY = map.findIndex((line) => line.includes('S'));
  const startX = map[startY].indexOf('S');
  map[startY][startX] = '.';
  const graph = getGraph(map);

  const distances = dijkstra(graph, `${startX},${startY}`, '-1,-1');

  const grids = Object.values(distances);
  const cornersEvenD = grids.filter((v) => v.d > halfW && v.d % 2 === 0).length;
  const cornersOddD = grids.filter((v) => v.d > halfW && v.d % 2 === 1).length;

  const gridsEvenD = grids.filter((v) => v.d % 2 === 0).length;
  const gridsOddD = grids.filter((v) => v.d % 2 === 1).length;

  const n = (steps - halfW) / map.length;

  return (
    (n + 1) * (n + 1) * gridsOddD +
    n * n * gridsEvenD -
    (n + 1) * cornersOddD +
    n * cornersEvenD
  );
};
