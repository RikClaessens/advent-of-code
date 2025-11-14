import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day20';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type XYZ = {
  x: number;
  y: number;
  z: number;
};

type Particle = {
  p: XYZ;
  v: XYZ;
  a: XYZ;
};

const getParticles = (input: string[]): Particle[] => {
  const particles: Particle[] = input.map((line) => {
    const [_, px, py, pz, vx, vy, vz, ax, ay, az] = line.match(
      /p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>/,
    ) as string[];
    return {
      p: { x: parseInt(px), y: parseInt(py), z: parseInt(pz) },
      v: { x: parseInt(vx), y: parseInt(vy), z: parseInt(vz) },
      a: { x: parseInt(ax), y: parseInt(ay), z: parseInt(az) },
    };
  });

  return particles;
};

const getEventuallyClosestParticleIndex = (particles: Particle[]): number => {
  let closestIndex = -1;
  let closestAcceleration = Number.MAX_SAFE_INTEGER;
  let closestVelocity = Number.MAX_SAFE_INTEGER;
  let closestPosition = Number.MAX_SAFE_INTEGER;

  particles.forEach((particle, index) => {
    const a =
      Math.abs(particle.a.x) + Math.abs(particle.a.y) + Math.abs(particle.a.z);
    const v =
      Math.abs(particle.v.x) + Math.abs(particle.v.y) + Math.abs(particle.v.z);
    const p =
      Math.abs(particle.p.x) + Math.abs(particle.p.y) + Math.abs(particle.p.z);

    if (
      a < closestAcceleration ||
      (a === closestAcceleration &&
        (v < closestVelocity || (v === closestVelocity && p < closestPosition)))
    ) {
      closestIndex = index;
      closestAcceleration = a;
      closestVelocity = v;
      closestPosition = p;
    }
  });

  return closestIndex;
};

const particlesLeftAfterCollisions = (
  particles: Particle[],
  steps: number,
): number => {
  for (let step = 0; step < steps; step++) {
    const positionsMap: Map<string, number[]> = new Map();

    particles.forEach((particle, index) => {
      particle.v.x += particle.a.x;
      particle.v.y += particle.a.y;
      particle.v.z += particle.a.z;

      particle.p.x += particle.v.x;
      particle.p.y += particle.v.y;
      particle.p.z += particle.v.z;

      const posKey = `${particle.p.x},${particle.p.y},${particle.p.z}`;
      if (!positionsMap.has(posKey)) {
        positionsMap.set(posKey, []);
      }
      positionsMap.get(posKey)?.push(index);
    });

    const collidedIndices = new Set<number>();
    positionsMap.forEach((indices) => {
      if (indices.length > 1) {
        indices.forEach((i) => collidedIndices.add(i));
      }
    });

    particles = particles.filter((_, index) => !collidedIndices.has(index));
  }

  return particles.length;
};

export const part1 = (input: string[]): number =>
  getEventuallyClosestParticleIndex(getParticles(input));

export const part2 = (input: string[]): number => {
  return particlesLeftAfterCollisions(getParticles(input), 100);
};
