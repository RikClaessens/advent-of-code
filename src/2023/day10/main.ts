import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day10';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 4 },
  { input: getInput(`src/${year}/${day}/test2.txt`), result: 8 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test3.txt`), result: 4 },
  { input: getInput(`src/${year}/${day}/test4.txt`), result: 4 },
  { input: getInput(`src/${year}/${day}/test5.txt`), result: 8 },
  { input: getInput(`src/${year}/${day}/test6.txt`), result: 10 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

type Coord = {
  x: number;
  y: number;
};

type Neighbor = {
  coord: Coord;
  direction: Direction;
};

enum Direction {
  N,
  S,
  E,
  W,
}

type Map = string[][];
type DistanceMap = number[][];

const getMap = (input: string[]): Map => input.map((i) => i.split(''));

const neighbors: Neighbor[] = [
  { coord: { x: -1, y: 0 }, direction: Direction.W },
  { coord: { x: 1, y: 0 }, direction: Direction.E },
  { coord: { x: 0, y: -1 }, direction: Direction.N },
  { coord: { x: 0, y: 1 }, direction: Direction.S },
];

const getStartingPoint = (map: Map): { c: Coord; tile: string } => {
  let c: Coord = { x: -1, y: -1 };
  let tile = '';
  const connections: Direction[] = [];

  A: for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === 'S') {
        c = { x, y };
        break A;
      }
    }
  }
  neighbors.forEach((n) => {
    const end = map?.[c.y + n.coord.y]?.[c.x + n.coord.x];
    if (canConnect(map[c.y][c.x], end, n.direction)) {
      connections.push(n.direction);
    }
  });
  if (connections.includes(Direction.N)) {
    if (connections.includes(Direction.S)) {
      tile = '|';
    } else if (connections.includes(Direction.W)) {
      tile = 'J';
    } else if (connections.includes(Direction.E)) {
      tile = 'L';
    }
  } else if (connections.includes(Direction.S)) {
    if (connections.includes(Direction.W)) {
      tile = '7';
    } else if (connections.includes(Direction.E)) {
      tile = 'F';
    }
  }

  return { c, tile };
};

const canConnect = (start: string, end: string, d: Direction): boolean => {
  const can =
    (d === Direction.N &&
      ['S', '|', 'J', 'L'].includes(start) &&
      ['|', 'F', '7'].includes(end)) ||
    (d === Direction.S &&
      ['S', '|', 'F', '7'].includes(start) &&
      ['|', 'J', 'L'].includes(end)) ||
    (d === Direction.E &&
      ['S', '-', 'F', 'L'].includes(start) &&
      ['-', 'J', '7'].includes(end)) ||
    (d === Direction.W &&
      ['S', '-', 'J', '7'].includes(start) &&
      ['-', 'F', 'L'].includes(end));
  return can;
};

const fillDistanceMap = (map: Map) => {
  const start = getStartingPoint(map);
  const distanceMap: DistanceMap = map.map((m) => new Array(m.length).fill(-1));
  distanceMap[start.c.y][start.c.x] = 0;
  let distance = 1;
  let openCoords: Coord[] = [start.c];
  do {
    const newOpenCoords: Coord[] = [];
    openCoords.forEach((openCoord) => {
      neighbors.forEach((n) => {
        const end = map?.[openCoord.y + n.coord.y]?.[openCoord.x + n.coord.x];
        if (
          end &&
          canConnect(map[openCoord.y][openCoord.x], end, n.direction) &&
          distanceMap[openCoord.y + n.coord.y][openCoord.x + n.coord.x] === -1
        ) {
          distanceMap[openCoord.y + n.coord.y][openCoord.x + n.coord.x] =
            distance;
          newOpenCoords.push({
            x: openCoord.x + n.coord.x,
            y: openCoord.y + n.coord.y,
          });
        }
      });
    });
    distance += 1;
    openCoords = [...newOpenCoords];
  } while (openCoords.length > 0);
  return distance - 2;
};

const getDistanceMap = (map: Map): { map: Map; distanceMap: DistanceMap } => {
  const start = getStartingPoint(map);
  const distanceMap: DistanceMap = map.map((m) => new Array(m.length).fill(-1));
  distanceMap[start.c.y][start.c.x] = 0;
  map[start.c.y][start.c.x] = start.tile;
  let distance = 1;
  let openCoords: Coord[] = [start.c];
  do {
    const newOpenCoords: Coord[] = [];
    openCoords.forEach((openCoord) => {
      neighbors.forEach((n) => {
        const end = map?.[openCoord.y + n.coord.y]?.[openCoord.x + n.coord.x];
        if (
          end &&
          canConnect(map[openCoord.y][openCoord.x], end, n.direction) &&
          distanceMap[openCoord.y + n.coord.y][openCoord.x + n.coord.x] === -1
        ) {
          distanceMap[openCoord.y + n.coord.y][openCoord.x + n.coord.x] =
            distance;
          newOpenCoords.push({
            x: openCoord.x + n.coord.x,
            y: openCoord.y + n.coord.y,
          });
        }
      });
    });
    distance += 1;
    openCoords = [...newOpenCoords];
  } while (openCoords.length > 0);
  return { map, distanceMap };
};

export const part1 = (input: string[]): number => {
  const map = getMap(input);
  return fillDistanceMap(map);
};

export const part2 = (input: string[]): number => {
  const originalMap = getMap(input);
  const { map, distanceMap } = getDistanceMap(originalMap);

  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (distanceMap[y][x] === -1) {
        map[y][x] = '.';
      }
    }
  }

  let count = 0;
  map.forEach((line, lineIndex) => {
    const l = line
      .join('')
      .replaceAll(/F(-)*J/g, 'X')
      .replaceAll(/L(-)*7/g, 'X')
      .replaceAll('|', 'X');
    let inside = false;
    l.split('').forEach((cell, cellIndex) => {
      if (inside && cell === '.') {
        count += 1;
        map[lineIndex][cellIndex] = 'I';
      } else if (cell === 'X') {
        inside = !inside;
      }
    });
  });

  return count;
};
