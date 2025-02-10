import fs from 'fs';
import { init as initZ3Solver } from 'z3-solver';

type HailStone = {
  p1: Vector3;
  p2: Vector3;
  v: Vector3;
};

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

const input = fs.readFileSync(`../input.txt`).toString().trim().split('\n');

const subtract = (p1: Vector3, p2: Vector3): Vector3 => {
  return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z };
};

const getHailStones = (input: string[], ignoreZ: boolean): HailStone[] => {
  const hailStones: HailStone[] = [];

  input.forEach((line) => {
    const parts = line.split(' @ ');
    const p1: Vector3 = {
      x: parseInt(parts[0].split(',')[0]),
      y: parseInt(parts[0].split(',')[1]),
      z: ignoreZ ? 0 : parseInt(parts[0].split(',')[2]),
    };
    const v = {
      x: parseInt(parts[1].split(',')[0]),
      y: parseInt(parts[1].split(',')[1]),
      z: ignoreZ ? 0 : parseInt(parts[1].split(',')[2]),
    };
    const p2 = subtract(p1, v);
    hailStones.push({ p1, p2, v });
  });
  return hailStones;
};

export const part2 = async (): Promise<number> => {
  const hailStones = getHailStones(input, false);
  const { Context } = await initZ3Solver();
  const { Real, Solver } = Context('main');

  const x = Real.const('x');
  const y = Real.const('y');
  const z = Real.const('z');

  const vx = Real.const('vx');
  const vy = Real.const('vy');
  const vz = Real.const('vz');

  const solver = new Solver();

  for (let i = 0; i < hailStones.length; i++) {
    const t = Real.const(`t${i}`);

    const { p1, v } = hailStones[i];

    solver.add(t.ge(0));
    solver.add(x.add(vx.mul(t)).eq(t.mul(v.x).add(p1.x)));
    solver.add(y.add(vy.mul(t)).eq(t.mul(v.y).add(p1.y)));
    solver.add(z.add(vz.mul(t)).eq(t.mul(v.z).add(p1.z)));
  }

  await solver.check();

  const model = solver.model();

  return [model.eval(x), model.eval(y), model.eval(z)]
    .map(Number)
    .reduce((acc, n) => acc + n, 0);
};

(async () => {
  console.log(`⛄️ part 2: ` + (await part2()));
})();
