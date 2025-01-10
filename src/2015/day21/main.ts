import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day21';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Stats = [number, number, number];
const weapons: Stats[] = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
];

const armors: Stats[] = [
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
];

const rings: Stats[] = [
  [25, 1, 0],
  [50, 2, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3],
];

const getStats = (gear: Stats[], gearIndex: number) => {
  if (gearIndex === -1) {
    return [0, 0, 0];
  } else {
    return gear[gearIndex];
  }
};

const fight = (me: Stats, boss: Stats): boolean =>
  Math.ceil(boss[0] / Math.max(me[1] - boss[2], 1)) <=
  Math.ceil(me[0] / Math.max(boss[1] - me[2], 1));

const boss: Stats = input
  .map((i) => i.split(': ')[1])
  .map((i) => parseInt(i)) as [number, number, number];

let minGoldSpent = Infinity;
let maxGoldSpent = 0;

for (let w = 0; w < weapons.length; w++) {
  for (let a = -1; a < armors.length; a++) {
    for (let r1 = -1; r1 < rings.length; r1++) {
      for (let r2 = -1; r2 < rings.length; r2++) {
        if (r1 === -1 || r2 === -1 || r1 !== r2) {
          const myGear = [
            getStats(weapons, w),
            getStats(armors, a),
            getStats(rings, r1),
            getStats(rings, r2),
          ];
          const myStats: Stats = [
            100,
            myGear.reduce((total, stat) => total + stat[1], 0),
            myGear.reduce((total, stat) => total + stat[2], 0),
          ];
          if (fight(myStats, [...boss])) {
            const goldSpent = myGear.reduce((gold, g) => gold + g[0], 0);
            minGoldSpent = Math.min(minGoldSpent, goldSpent);
          } else {
            const goldSpent = myGear.reduce((gold, g) => gold + g[0], 0);
            maxGoldSpent = Math.max(maxGoldSpent, goldSpent);
          }
        }
      }
    }
  }
}

export const part1 = (): number => minGoldSpent;

export const part2 = (): number => maxGoldSpent;
