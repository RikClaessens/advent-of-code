import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day13';
export const testsPart1 = [
  {
    input: '10',
    extraProps: { x: 7, y: 4 },
    result: 11,
  },
];

export const testsPart2 = [];

export const extraPropsPart1 = { x: 31, y: 39 };
export const input = getInputAsString(`src/${year}/${day}/input.txt`);

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
  path: Position[];
}

const heuristic = (
  x: number,
  y: number,
  goalX: number,
  goalY: number,
): number => Math.abs(goalX - x) + Math.abs(goalY - y);

const directions: Position[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

let officeDesignersFavoriteNnumber = 0;
const mapCache: { [key: string]: boolean } = {};
let noOfNodesWithin50Steps = 0;

const canMove = (x: number, y: number) => {
  const cacheKey = [officeDesignersFavoriteNnumber, x, y].join(',');
  if (!mapCache[cacheKey]) {
    const isSpace =
      Number(
        x * x + 3 * x + 2 * x * y + y + y * y + officeDesignersFavoriteNnumber,
      )
        .toString(2)
        .replaceAll('0', '').length %
        2 ===
      0;
    mapCache[cacheKey] = isSpace;
  }

  return mapCache[cacheKey];
};

const aStar = (
  map: string[][],
  goalPos: Position,
): { result: number; nodes: Node[] } => {
  const openList: Node[] = [];
  const closedList: Node[] = [];

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
          path: [{ x, y }],
        });
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
      path: [{ x: 0, y: 0 }],
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
    if (currentNode.x === goalPos.x && currentNode.y === goalPos.y) {
      return { result: currentNode.f, nodes: closedList };
    }
    directions.forEach((direction) => {
      const newX = currentNode.x + direction.x;
      const newY = currentNode.y + direction.y;
      if (newX < map[0].length && newY < map.length && newX >= 0 && newY >= 0) {
        if (canMove(newX, newY)) {
          currentNode.children.push({
            x: newX,
            y: newY,
            f: 0,
            g: 0,
            h: 0,
            children: [],
            path: [...currentNode.path, { x: currentNode.x, y: currentNode.y }],
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
          if (child.g <= 50) {
            noOfNodesWithin50Steps++;
          }
        }
      }
    });
  }
  return { result: 0, nodes: [] };
};

export const part1 = (input: string, end: Position): number => {
  officeDesignersFavoriteNnumber = parseInt(input);

  const map = Array.from({ length: end.y * 3 }).map((_) =>
    Array.from({ length: end.x * 3 }).map((_) => '?'),
  );
  map[end.y][end.x] = 'E';
  map[1][1] = 'S';

  return aStar(map, end).result;
};

export const part2 = (input: string): number => {
  officeDesignersFavoriteNnumber = parseInt(input);
  noOfNodesWithin50Steps = 0;

  const map = Array.from({ length: 51 }).map((_) =>
    Array.from({ length: 51 }).map((_) => '?'),
  );
  map[1][1] = 'S';
  aStar(map, { x: 52, y: 52 });
  return noOfNodesWithin50Steps;
};
