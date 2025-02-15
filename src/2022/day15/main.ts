import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day15';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: 10,
    result: 26,
  },
];

export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: 20,
    result: 56000011,
  },
];

export const extraPropsPart1 = 2000000;
export const extraPropsPart2 = 4000000;
export const input = getInput(`src/${year}/${day}/input.txt`);

type SensorScan = [number, number, number, number, number];
type XY = [number, number];

const isInRange = (n: number, range: [number, number]): boolean =>
  n >= range[0] && n <= range[1];

const getDistance = (p1: XY, p2: XY) =>
  Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1]);

const getSensorScans = (input: string[]): SensorScan[] => {
  const sensorScans: SensorScan[] = [];
  input.forEach((line) => {
    const [_, sx, sy, bx, by] = (
      line.match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/,
      ) as string[]
    ).map(Number);
    const distance = getDistance([sx, sy], [bx, by]);
    sensorScans.push([sx, sy, bx, by, distance]);
  });

  return sensorScans;
};

const countBlocked = (
  sensorScans: SensorScan[],
  blockedRow: number,
): number => {
  const blockedXs = new Set<number>();
  const beaconsInRow = new Set<string>();

  sensorScans.forEach((sensorScan) => {
    const [sx, sy, bx, by] = sensorScan;
    if (by === blockedRow) {
      beaconsInRow.add(`${bx},${by}`);
    }
    const distance = getDistance([sx, sy], [bx, by]);
    const distanceToBlockedRow = Math.abs(sy - blockedRow);
    let blockedXDist = 0;
    while (distanceToBlockedRow + blockedXDist <= distance) {
      blockedXs.add(sx + blockedXDist);
      blockedXs.add(sx - blockedXDist);
      blockedXDist++;
    }
  });

  return blockedXs.size - beaconsInRow.size;
};

export const part1 = (input: string[], blockedRow: number): number => {
  const sensorScans = getSensorScans(input);
  return countBlocked(sensorScans, blockedRow);
};

const isOutsideOfAllSensorRanges = (sensorScans: SensorScan[], p: XY) => {
  const [x, y] = p;
  for (let j = 0; j < sensorScans.length; j++) {
    const [checkSx, checkSy, _bx, _by, checkD] = sensorScans[j];

    if (getDistance([x, y], [checkSx, checkSy]) <= checkD) {
      return false;
    }
  }
  return true;
};
const getBeaconLocation = (sensorScans: SensorScan[], maxXY: number) => {
  const range: [number, number] = [0, maxXY - 1];

  for (let s = 0; s < sensorScans.length; s++) {
    const [sx, sy, _bx, _by, d] = sensorScans[s];

    const distance = d + 1;

    for (let x = 0; x <= distance; x++) {
      const y = distance - x;
      for (const signX of [-1, 1]) {
        for (const signY of [-1, 1]) {
          const dbx = sx + x * signX;
          const dby = sy + y * signY;
          if (
            isInRange(dby, range) &&
            isInRange(dbx, range) &&
            isOutsideOfAllSensorRanges(sensorScans, [dbx, dby])
          ) {
            return [dbx, dby];
          }
        }
      }
    }
  }

  return [0, 0];
};

export const part2 = (input: string[], maxXY: number): number => {
  const sensorScans = getSensorScans(input);
  const [x, y] = getBeaconLocation(sensorScans, maxXY);
  return x * 4000000 + y;
};
