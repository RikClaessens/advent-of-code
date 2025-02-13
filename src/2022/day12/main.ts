import { getInputAsString } from '../../getInput.ts';

export const year = '2022';
export const day = 'day12';

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 31 },
];
export const testsPart2 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 29 },
];

const run = (input: string): number => {
  const map = input.split('\n').map((line) => line.split(''));
  return aStar(map);
};

const run2 = (input: string): number => {
  const map = input.split('\n').map((line) => line.split(''));

  let goalPos: Position = { x: 0, y: 0 };

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === 'S') map[y][x] = 'a';
      else if (map[y][x] === 'E') {
        goalPos = { x, y };
      }
    }
  }
  const mapCopy = input
    .split('\n')
    .map((line) => line.split('').map((entry) => entry));
  const outcomes = [];
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === 'a') {
        mapCopy[y][x] = 'S';
        outcomes.push(aStar(mapCopy));
        mapCopy[y][x] = 'a';
        mapCopy[goalPos.y][goalPos.x] = 'E';
      }
    }
  }

  return outcomes.filter((outcome) => outcome !== 0).sort((a, b) => a - b)[0];
};

interface Position {
  x: number;
  y: number;
}

interface Node {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  children: Node[];
}

const heuristic = (x: number, y: number, goalX: number, goalY: number) =>
  Math.abs(goalX - x) + Math.abs(goalY - y);

const deltas: Position[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const elevationOk = (current: string, next: string) =>
  next.charCodeAt(0) - current.charCodeAt(0) <= 1;

const aStar = (map: string[][]): number => {
  const openList: Node[] = [];
  const closedList: Node[] = [];
  const checkMap = map.map((line) => line.map((entry) => entry));

  let goalPos: Position = { x: 0, y: 0 };

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === 'E') {
        goalPos = { x, y };
        map[y][x] = 'z';
      }
    }
  }

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === 'S') {
        openList.push({
          x,
          y,
          f: 0,
          g: 0,
          h: heuristic(x, y, goalPos.x, goalPos.y),
          children: [],
        });
        map[y][x] = 'a';
      }
    }
  }

  while (openList.length > 0) {
    let currentNode: Node = {
      x: 0,
      y: 0,
      f: Infinity,
      g: 0,
      h: 0,
      children: [],
    };
    let nodeIndexToRemove = -1;
    openList.forEach((node, nodeIndex) => {
      if (node.f < currentNode.f) {
        currentNode = node;
        nodeIndexToRemove = nodeIndex;
      }
    });
    openList.splice(nodeIndexToRemove, 1);
    closedList.push(currentNode);
    checkMap[currentNode.y][currentNode.x] = '.';
    if (currentNode.x === goalPos.x && currentNode.y === goalPos.y) {
      return currentNode.f;
    }
    deltas.forEach((delta) => {
      const newX = currentNode.x + delta.x;
      const newY = currentNode.y + delta.y;
      if (newX < map[0].length && newY < map.length && newX >= 0 && newY >= 0) {
        if (elevationOk(map[currentNode.y][currentNode.x], map[newY][newX])) {
          currentNode.children.push({
            x: newX,
            y: newY,
            f: 0,
            g: 0,
            h: 0,
            children: [],
          });
        }
      }
    });

    currentNode.children.forEach((child) => {
      const isInClosedList = !!closedList.find(
        (closedChild) => closedChild.x === child.x && closedChild.y === child.y,
      );
      if (!isInClosedList) {
        child.g = currentNode.g + 1;
        child.h = heuristic(child.x, child.y, goalPos.x, goalPos.y);
        child.f = child.g + child.h;
        const openListNode = openList.find(
          (openChild) => openChild.x === child.x && openChild.y === child.y,
        );
        if (!openListNode || child.g < openListNode.g) {
          openList.push(child);
        }
      }
    });
  }
  return 0;
};

export const part1 = (input: string) => run(input);
export const part2 = (input: string) => run2(input);
