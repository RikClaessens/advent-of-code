import { getInputAsString } from '../../getInput.ts';

export const year = '2017';
export const day = 'day11';
export const testsPart1 = [
  { input: 'ne,ne,ne', result: 3 },
  { input: 'ne,ne,sw,sw', result: 0 },
  { input: 'ne,ne,s,s', result: 2 },
  { input: 'se,sw,se,sw,sw', result: 3 },
];

export const testsPart2 = [
  { input: 'ne,ne,ne', result: 3 },
  { input: 'ne,ne,sw,sw', result: 2 },
  { input: 'ne,ne,s,s', result: 2 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const reduceDirs = (dirs: {
  nw: number;
  n: number;
  ne: number;
  se: number;
  s: number;
  sw: number;
}) => {
  const nwne = Math.min(dirs.nw, dirs.ne);
  dirs.nw -= nwne;
  dirs.ne -= nwne;
  dirs.n += nwne;
  const swse = Math.min(dirs.sw, dirs.se);
  dirs.sw -= swse;
  dirs.se -= swse;
  dirs.s += swse;
  const nesw = Math.min(dirs.ne, dirs.sw);
  dirs.ne -= nesw;
  dirs.sw -= nesw;
  const nwse = Math.min(dirs.nw, dirs.se);
  dirs.nw -= nwse;
  dirs.se -= nwse;
  const nes = Math.min(dirs.ne, dirs.s);
  dirs.ne -= nes;
  dirs.s -= nes;
  dirs.se += nes;
  const nws = Math.min(dirs.nw, dirs.s);
  dirs.nw -= nws;
  dirs.s -= nws;
  dirs.sw += nws;
  const sen = Math.min(dirs.se, dirs.n);
  dirs.se -= sen;
  dirs.n -= sen;
  dirs.ne += sen;
  const swn = Math.min(dirs.sw, dirs.n);
  dirs.sw -= swn;
  dirs.n -= swn;
  dirs.nw += swn;
  const ns = Math.min(dirs.n, dirs.s);
  dirs.n -= ns;
  dirs.s -= ns;
};

const getDistance = (input: string): number => {
  const dirs = {
    nw: 0,
    n: 0,
    ne: 0,
    se: 0,
    s: 0,
    sw: 0,
  };

  const steps = input.split(',');
  for (const step of steps) {
    dirs[step as keyof typeof dirs] += 1;
  }
  let d = Object.values(dirs).reduce((total, n) => total + n, 0);
  let newD = d;
  do {
    d = newD;
    reduceDirs(dirs);
    newD = Object.values(dirs).reduce((total, n) => total + n, 0);
  } while (newD < d);
  return d;
};

export const part1 = (input: string): number => getDistance(input);

export const part2 = (input: string): number => {
  let maxD = 0;
  const steps = input.split(',');
  for (let i = 1; i <= steps.length; i++) {
    const path = steps.slice(0, i).join(',');
    maxD = Math.max(getDistance(path), maxD);
  }
  return maxD;
};
