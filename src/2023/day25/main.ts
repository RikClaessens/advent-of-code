import { instance } from '@viz-js/viz';
import { getInput, writeToFile } from '../../getInput.ts';

export const year = '2023';
export const day = 'day25';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const printGraph = (input: string[]) => {
  instance().then((viz) => {
    let graph = '';
    input.forEach((line) => {
      const [s, edges] = line.split(':');
      edges
        .trim()
        .split(' ')
        .forEach((e) => {
          graph += `${s} -- ${e};\n`;
        });
    });

    const svg = viz.render(`graph { ${graph} }`, {
      format: 'svg',
      engine: 'neato',
    });
    svg.output && writeToFile(`src/${year}/${day}/graph.svg`, svg.output);
  });
};

type Graph = { [key: string]: string[] };
const getGraph = (
  input: string[],
  wiresToDelete: [string, string][],
): Graph => {
  const graph: Graph = {};
  input.forEach((line) => {
    const [s, edges] = line.split(':');
    if (!graph[s]) {
      graph[s] = [];
    }
    edges
      .trim()
      .split(' ')
      .forEach((e) => {
        if (!graph[e]) {
          graph[e] = [];
        }
        if (
          !wiresToDelete.some(
            ([s1, e1]) => (s === s1 && e === e1) || (s === e1 && e === s1),
          )
        ) {
          graph[s].push(e);
          graph[e].push(s);
        }
      });
  });
  return graph;
};

const multiplyGroupSizes = (
  graph: Graph,
  wiresToDelete: [string, string][],
): number => {
  const group1 = new Set<string>();
  const group2 = new Set<string>();

  wiresToDelete.forEach(([s, e]) => {
    group1.add(s);
    group2.add(e);
  });

  const queue1 = [...Array.from(group1.values())];
  const queue2 = [...Array.from(group2.values())];

  const group1Visited = new Set<string>();
  const group2Visited = new Set<string>();

  while (queue1.length > 0) {
    const current = queue1.shift()!;
    if (!group1Visited.has(current)) {
      group1Visited.add(current);
      graph[current].forEach((node) => {
        queue1.push(node);
        group1.add(node);
      });
    }
  }

  while (queue2.length > 0) {
    const current = queue2.shift()!;
    if (!group2Visited.has(current)) {
      group2Visited.add(current);
      graph[current].forEach((node) => {
        queue2.push(node);
        group2.add(node);
      });
    }
  }

  return group1.size * group2.size;
};

export const part1 = (input: string[]): number => {
  printGraph(input);
  console.log('Graph printed');
  const wiresToDelete: [string, string][] = [
    ['clb', 'brd'],
    ['glz', 'mxd'],
    ['jxd', 'bbz'],
  ];
  const graph = getGraph(input, wiresToDelete);
  return multiplyGroupSizes(graph, wiresToDelete);
};

export const part2 = (): number => {
  return 0;
};
