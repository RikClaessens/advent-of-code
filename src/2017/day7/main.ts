import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day7';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 'tknk' },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 60 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Program = {
  name: string;
  weight: number;
  programNames?: string[];
  programWeights?: number[];
};

const getWeight = (programs: Program[], programName: string): number => {
  let weight = 0;
  const program = programs.find((p) => p.name === programName)!;
  weight += program.weight;

  program.programNames?.forEach((pn) => {
    weight += getWeight(programs, pn);
  });

  return weight;
};

const parseInput = (input: string[]): Program[] => {
  const programs: Program[] = [];
  input.forEach((p) => {
    const name = p.split(' ')[0];
    const weight = parseInt(p.split(' ')[1].slice(1, -1));
    const programNames = p.split(' -> ')[1]?.split(', ') || [];
    programs.push({
      name,
      weight,
      programNames,
    });
  });
  programs.forEach((p) => {
    p.programWeights = [];
    p.programNames?.forEach((pn) => {
      p.programWeights?.push(getWeight(programs, pn));
    });
  });
  return programs;
};
export const part1 = (input: string[]): string => {
  const programs = parseInput(input);
  const base = programs.find((p1) =>
    programs.every((p2) => !p2.programNames?.includes(p1.name)),
  )?.name;
  return base || '';
};

export const part2 = (input: string[]): number => {
  const programs = parseInput(input);
  let goalProgramWeight = 0;
  let minTowerMismatchWeight = Infinity;
  programs.forEach((p) => {
    if (p.programWeights) {
      const weights: Record<number, number> = {};
      p.programWeights.forEach((pw) => {
        if (!weights[pw]) {
          weights[pw] = 0;
        }
        weights[pw] += 1;
      });
      if (Object.keys(weights).length > 1) {
        for (let i = 0; i < p.programWeights.length; i += 1) {
          if (weights[p.programWeights[i]] === 1) {
            const towerWeight = p.programWeights[i];
            const goalTowerWeight =
              p.programWeights[(i + 1) % p.programWeights.length];
            const programWeight = programs.find(
              (p2) => p2.name === p.programNames?.[i],
            )?.weight!;
            if (towerWeight < minTowerMismatchWeight) {
              minTowerMismatchWeight = towerWeight;
              goalProgramWeight =
                programWeight + (goalTowerWeight - towerWeight);
            }
          }
        }
      }
    }
  });
  return goalProgramWeight;
};
