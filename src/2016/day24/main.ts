import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day24';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 14 },
];

export const testsPart2 = [];

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

const dijkstra = (graph: Graph, startKey: string, endKey: string) => {
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

const getGoals = (map: string[][]) => {
  const goals: [number, number][] = [];
  let goal = 0;
  while (true) {
    const goalY = map.findIndex((line) => line.includes(goal.toString()));
    if (goalY === -1) {
      break;
    }
    const goalX = map[goalY].indexOf(goal.toString());
    goals.push([goalX, goalY]);
    goal++;
  }

  return goals;
};

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

const getMinSteps = (
  input: string[],
  orderModifier: (order: number[]) => number[],
): number => {
  const map = input.map((line) => line.split(''));
  const goals = getGoals(map);
  const orders = getPermutations(
    goals.map((_, i) => i).filter((i) => i !== 0),
    goals.length - 1,
  ).map(orderModifier);
  goals.forEach(([x, y]) => {
    map[y][x] = '.';
  });

  const dijkstraResults = goals.map(([x, y]) => {
    const graph = getGraph(map);
    return dijkstra(graph, `${x},${y}`, `-1,-1`);
  });

  let minSteps = Infinity;

  orders.forEach((order) => {
    let steps = 0;
    for (let i = 0; i < order.length - 1; i++) {
      const dijkstraResult = dijkstraResults[order[i]];
      const next = goals[order[i + 1]];
      steps += dijkstraResult[`${next[0]},${next[1]}`].d;
    }
    minSteps = Math.min(minSteps, steps);
  });

  return minSteps;
};

export const part1 = (input: string[]): number =>
  getMinSteps(input, (order) => [0, ...order]);

export const part2 = (input: string[]): number =>
  getMinSteps(input, (order) => [0, ...order, 0]);
