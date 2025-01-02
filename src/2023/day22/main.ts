import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day22';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    result: 5,
  },
];
export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    result: 7,
  },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

type XYZ = [number, number, number];
type Brick = [XYZ, XYZ];

const getBricks = (input: string[]): Brick[] => {
  return input
    .map((line) => {
      const b1: XYZ = line.split('~')[0].split(',').map(Number) as XYZ;
      const b2: XYZ = line.split('~')[1].split(',').map(Number) as XYZ;
      return [b1, b2] as Brick;
    })
    .sort((a, b) => a[0][2] - b[0][2]);
};

const dropBricks = (bricks: Brick[]): [number, number] => {
  const brickGrid = new Map<string, Brick>();

  bricks.forEach((brick) => {
    for (let x = brick[0][0]; x <= brick[1][0]; x += 1) {
      for (let y = brick[0][1]; y <= brick[1][1]; y += 1) {
        for (let z = brick[0][2]; z <= brick[1][2]; z += 1) {
          const key = `${x},${y},${z}`;
          brickGrid.set(key, brick);
        }
      }
    }
  });

  let aBrickHasDropped = true;
  while (aBrickHasDropped) {
    aBrickHasDropped = false;
    bricks.forEach((brick) => {
      let brickCanDrop = true;
      for (let x = brick[0][0]; x <= brick[1][0]; x += 1) {
        for (let y = brick[0][1]; y <= brick[1][1]; y += 1) {
          for (let z = brick[0][2]; z <= brick[1][2]; z += 1) {
            if (z - 1 <= 0) {
              brickCanDrop = false;
            } else {
              const key = `${x},${y},${z - 1}`;
              if (brickGrid.has(key) && brickGrid.get(key) !== brick) {
                brickCanDrop = false;
              }
            }
          }
        }
      }
      if (brickCanDrop) {
        for (let x = brick[0][0]; x <= brick[1][0]; x += 1) {
          for (let y = brick[0][1]; y <= brick[1][1]; y += 1) {
            for (let z = brick[0][2]; z <= brick[1][2]; z += 1) {
              brickGrid.delete(`${x},${y},${z}`);
            }
          }
        }
        brick[0][2] -= 1;
        brick[1][2] -= 1;
        for (let x = brick[0][0]; x <= brick[1][0]; x += 1) {
          for (let y = brick[0][1]; y <= brick[1][1]; y += 1) {
            for (let z = brick[0][2]; z <= brick[1][2]; z += 1) {
              brickGrid.set(`${x},${y},${z}`, brick);
            }
          }
        }
        aBrickHasDropped = true;
      }
    });
  }

  const above = new Map();
  const below = new Map();
  bricks.forEach((brick) => {
    above.set(brick, new Set());
    below.set(brick, new Set());
  });
  bricks.forEach((brick) => {
    for (let x = brick[0][0]; x <= brick[1][0]; x += 1) {
      for (let y = brick[0][1]; y <= brick[1][1]; y += 1) {
        for (let z = brick[0][2]; z <= brick[1][2]; z += 1) {
          const key = `${x},${y},${z + 1}`;
          if (brickGrid.has(key)) {
            const otherBrick = brickGrid.get(key);
            if (otherBrick !== brick) {
              above.get(brick).add(otherBrick);
              below.get(otherBrick).add(brick);
            }
          }
        }
      }
    }
  });

  let noOfBricksSafeToDisintegrate = 0;
  let sumOfFallingBricks = 0;
  bricks.forEach((brick) => {
    let safeToDisintegrate = true;
    for (const brickAbove of above.get(brick)) {
      if (below.get(brickAbove).size === 1) {
        safeToDisintegrate = false;
      }
    }
    if (safeToDisintegrate) {
      noOfBricksSafeToDisintegrate++;
    }

    const fallen = new Set();
    fallen.add(brick);

    let foundNewOne = true;
    while (foundNewOne) {
      foundNewOne = false;
      for (const fallenBrick of fallen) {
        for (const otherBrick of above.get(fallenBrick)) {
          if (
            !fallen.has(otherBrick) &&
            Array.from(below.get(otherBrick)).every((x) => fallen.has(x))
          ) {
            fallen.add(otherBrick);
            foundNewOne = true;
          }
        }
      }
    }

    sumOfFallingBricks += fallen.size - 1;
  });

  return [noOfBricksSafeToDisintegrate, sumOfFallingBricks];
};

export const part1 = (input: string[]): number => {
  const bricks = getBricks(input);
  return dropBricks(bricks)[0];
};

export const part2 = (input: string[]): number => {
  const bricks = getBricks(input);
  return dropBricks(bricks)[1];
};
