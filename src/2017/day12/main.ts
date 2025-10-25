import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day12';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 6 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 2 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getPipes = (input: string[]) => {
  const pipes: Record<number, number[]> = {};
  input.forEach((pipe) => {
    const source = Number.parseInt(pipe.split(' <-> ')[0]);
    const connectedPipes = pipe
      .split(' <-> ')[1]
      .split(',')
      .map((n) => n.trim())
      .map((n) => Number.parseInt(n));
    pipes[source] = connectedPipes;
  });
  return pipes;
};

const getNodesConnectedToNode = (
  pipes: Record<number, number[]>,
  node: number,
) => {
  const nodes = new Set<number>();
  const nodesToCheck = [node];
  const nodesChecked = new Set<number>();

  while (nodesToCheck.length > 0) {
    const nodeToCheck = nodesToCheck.pop();
    if (nodeToCheck !== undefined) {
      pipes[nodeToCheck].forEach((n) => {
        nodes.add(n);
        if (!nodesChecked.has(n)) {
          nodesToCheck.push(n);
        }
      });
      nodesChecked.add(nodeToCheck);
    }
  }

  return nodes;
};

export const part1 = (input: string[]): number => {
  const pipes = getPipes(input);
  const nodes = getNodesConnectedToNode(pipes, 0);

  return nodes.size;
};

export const part2 = (input: string[]): number => {
  const pipes = getPipes(input);
  let groups = 0;
  while (Object.keys(pipes).length > 0) {
    const nodes = getNodesConnectedToNode(
      pipes,
      Number.parseInt(Object.keys(pipes)[0]),
    );
    for (const node of nodes) {
      delete pipes[node];
    }
    groups += 1;
  }

  return groups;
};
