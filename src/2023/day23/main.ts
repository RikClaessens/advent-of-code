import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day23';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 94 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 154 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type XY = [number, number];

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const slopes = ['^', '>', 'v', '<'];

const getNeighbors = (
  map: string[][],
  pos: XY,
  slipperySlopes: boolean = true,
): XY[] => {
  const [x, y] = pos;
  const neighbors: XY[] = [];

  if (slipperySlopes) {
    if (slopes.includes(map[y][x])) {
      const [dx, dy] = dirs[slopes.indexOf(map[y][x])];
      return [[x + dx, y + dy]];
    }
  }

  dirs.forEach(([dx, dy]) => {
    if (map[y + dy] && [...slopes, '.'].includes(map[y + dy][x + dx])) {
      neighbors.push([x + dx, y + dy]);
    }
  });
  return neighbors;
};

const getKey = (pos: XY) => [pos[0], pos[1]].join(',');

const getStartAndGoal = (map: string[][]): { start: XY; goal: XY } => {
  return {
    start: [map[0].indexOf('.'), 0],
    goal: [map[map.length - 1].indexOf('.'), map.length - 1],
  };
};

type Graph = { [key: string]: Vertex };

type Neighbor = {
  pos: XY;
  d: number;
};
type Vertex = {
  key: string;
  neighbors: Neighbor[];
  id: number;
};

const getGraph = (
  map: string[][],
  start: XY,
  goal: XY,
  slipperySlopes: boolean,
): Graph => {
  const graph: Graph = {};
  const junctions: XY[] = [start, goal];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '.') {
        const neighbors = getNeighbors(map, [x, y], true);
        if (neighbors.length >= 3) {
          junctions.push([x, y]);
        }
      }
    }
  }

  const junctionKeys = junctions.map(getKey);

  for (const junction of junctions) {
    const visited = new Set<string>();
    const key = getKey(junction);
    visited.add(key);
    let neighbors: Neighbor[] = [];

    const neighborsOnMap = getNeighbors(map, junction, slipperySlopes);
    neighborsOnMap.forEach((pos) => {
      let junctionReached = false;
      let d = 1;
      while (!junctionReached) {
        if (!visited.has(getKey(pos))) {
          visited.add(getKey(pos));
          if (junctionKeys.includes(getKey(pos))) {
            neighbors.push({ pos, d });
            junctionReached = true;
          } else {
            const newNeighbors = getNeighbors(map, pos, slipperySlopes).filter(
              (n) => !visited.has(getKey(n)),
            );
            d++;
            if (newNeighbors.length === 1) {
              pos = newNeighbors[0];
            } else {
              junctionReached = true;
            }
          }
        }
      }
    });

    if (neighbors.find((n) => getKey(n.pos) === getKey(goal))) {
      neighbors = neighbors.filter((n) => getKey(n.pos) === getKey(goal));
    }
    graph[key] = { key, neighbors, id: 0 };
  }

  const queue = [getKey(start)];
  const visited = new Set<string>();
  graph[getKey(start)].id = 1;
  while (queue.length) {
    const key = queue.shift()!;
    visited.add(key);
    const node = graph[key];
    if (node.id !== 0) {
      node.neighbors.forEach((n) => {
        const nKey = getKey(n.pos);
        if (graph[nKey].id === 0) {
          graph[nKey].id = Math.max(graph[nKey].id, node.id + 1);
        }

        if (!visited.has(nKey)) {
          queue.push(nKey);
        }
      });
    }
  }

  Object.keys(graph).forEach((key) => {
    const node = graph[key];
    if (node.neighbors.length <= 3) {
      node.neighbors = node.neighbors.filter((n) => {
        return (
          graph[getKey(n.pos)].id >= graph[key].id ||
          graph[getKey(n.pos)].neighbors.length === 4
        );
      });
    }
  });

  return graph;
};

const getMaxPathLength = (graph: Graph, start: XY, goal: XY): number => {
  const visitedStart: string[] = [];
  visitedStart.push(getKey(start));
  const queue: [string, number, string[]][] = [
    [getKey(start), 0, visitedStart],
  ];
  let maxPathLength = 0;

  while (queue.length > 0) {
    const [key, d, visited] = queue.shift()!;

    if (key === getKey(goal)) {
      maxPathLength = Math.max(maxPathLength, d);
    }

    graph[key].neighbors.forEach(({ pos, d: dist }) => {
      if (!visited.includes(getKey(pos))) {
        queue.push([getKey(pos), d + dist, [...visited, getKey(pos)]]);
      }
    });
  }

  return maxPathLength;
};

export const part1 = (input: string[]): number => {
  const map = input.map((line) => line.split(''));
  const { start, goal } = getStartAndGoal(map);
  const graph = getGraph(map, start, goal, true);

  return getMaxPathLength(graph, start, goal);
};

const solvePart2 = (graph: Graph, start: XY, goal: XY): number => {
  const queue = [[start[0], start[1], 0]];
  const visited = new Set<string>();
  let best = 0;
  const goalKey = getKey(goal);
  while (queue.length) {
    const [x, y, d] = queue.pop()!;
    const key = getKey([x, y]);
    if (d === -1) {
      visited.delete(key);
      continue;
    }
    if (key === goalKey) {
      best = Math.max(best, d);
      continue;
    }
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);
    queue.push([x, y, -1]);
    for (const neighborIndex in graph[key].neighbors) {
      const neighbor = graph[key].neighbors[neighborIndex];
      queue.push([neighbor.pos[0], neighbor.pos[1], d + neighbor.d]);
    }
  }
  return best;
};

export const part2 = (input: string[]): number => {
  const map = input.map((line) => line.split(''));
  const { start, goal } = getStartAndGoal(map);
  const graph = getGraph(map, start, goal, false);

  return solvePart2(graph, start, goal);
};
