import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day3';
export const testsPart1 = [
  { input: '1', result: 0 },
  { input: '12', result: 3 },
  { input: '23', result: 2 },
  { input: '1024', result: 31 },
];

export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const part1 = (input: string): number => {
  const goal = Number.parseInt(input);
  let n = 1;
  let square = 1;
  let d = 0;

  while (square < goal) {
    n += 2;
    square = n * n;
    d += 1;
  }
  let x = d;
  let y = d;
  // left
  let delta = Math.min(square - goal, n - 1);

  if (delta > 0) {
    x -= delta;
    square -= delta;
  }
  // up
  delta = Math.min(square - goal, n - 1);
  if (delta > 0) {
    y -= delta;
    square -= delta;
  }
  // right
  delta = Math.min(square - goal, n - 1);
  if (delta > 0) {
    x += delta;
    square -= delta;
  }
  // down
  delta = Math.min(square - goal, n - 1);
  if (delta > 0) {
    y += delta;
    square -= delta;
  }

  return Math.abs(x) + Math.abs(y);
};

export const part2 = (input: string): number => {
  const squares: { [key: string]: number } = {};
  const goal = Number.parseInt(input);
  let val = 0;
  let x = 0;
  let y = 0;
  let circle = 1;
  const getSum = (x: number, y: number) => {
    let sum = 0;
    [
      [-1, -1],
      [0, -1],
      [1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
    ].forEach(([dx, dy]) => {
      if (squares[`${x + dx},${y + dy}`]) {
        sum += squares[`${x + dx},${y + dy}`];
      }
    });
    return sum;
  };

  squares[`${x},${y}`] = 1;
  let run = true;
  while (run) {
    circle += 2;
    // go right
    x += 1;
    squares[`${x},${y}`] = getSum(x, y);
    if (run && squares[`${x},${y}`] > goal) {
      val = squares[`${x},${y}`];
      run = false;
    }
    for (let up = 1; up <= circle - 2; up += 1) {
      y -= 1;
      squares[`${x},${y}`] = getSum(x, y);
      if (run && squares[`${x},${y}`] > goal) {
        val = squares[`${x},${y}`];
        run = false;
      }
    }
    for (let left = 1; left <= circle - 1; left += 1) {
      x -= 1;
      squares[`${x},${y}`] = getSum(x, y);
      if (run && squares[`${x},${y}`] > goal) {
        val = squares[`${x},${y}`];
        run = false;
      }
    }

    for (let down = 1; down <= circle - 1; down += 1) {
      y += 1;
      squares[`${x},${y}`] = getSum(x, y);
      if (run && squares[`${x},${y}`] > goal) {
        val = squares[`${x},${y}`];
        run = false;
      }
    }

    for (let right = 1; right <= circle - 1; right += 1) {
      x += 1;
      squares[`${x},${y}`] = getSum(x, y);
      if (run && squares[`${x},${y}`] > goal) {
        val = squares[`${x},${y}`];
        run = false;
      }
    }
  }

  return val;
};
