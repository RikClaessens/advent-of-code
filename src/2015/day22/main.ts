import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day22';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

// cost, damage, effect damage, armor, heal, mana, timer
const spells = [
  { c: 53, d: 4, e: 0, a: 0, h: 0, m: 0, t: 0 }, // Magic Missile
  { c: 73, d: 2, e: 0, a: 0, h: 2, m: 0, t: 0 }, // Drain
  { c: 113, d: 0, e: 0, a: 7, h: 0, m: 0, t: 6 }, // Shield
  { c: 173, d: 0, e: 3, a: 0, h: 0, m: 0, t: 6 }, // Poison
  { c: 229, d: 0, e: 0, a: 0, h: 0, m: 101, t: 5 }, // Recharge
];

type MyStats = {
  hp: number;
  armor: number;
  mana: number;
  manaSpent: number;
  timers: number[];
};

type BossStats = {
  hp: number;
  dmg: number;
};

const fight = (me: MyStats, boss: BossStats, myTurn: boolean) => {
  const newBoss = { ...boss };
  const newMe = { ...me };

  if (myTurn && lose1hp) {
    newMe.hp -= 1;
  }

  if (newMe.hp <= 0) {
    return;
  }

  newMe.armor = 0;

  spells.forEach((spell, spellIndex) => {
    if (newMe.timers[spellIndex] > 0) {
      newMe.timers[spellIndex] -= 1;
      newBoss.hp -= spell.e;
      newMe.armor += spell.a;
      newMe.mana += spell.m;
    }
  });

  if (newBoss.hp <= 0) {
    minMana = Math.min(minMana, newMe.manaSpent);
    return;
  }

  if (!myTurn) {
    newMe.hp -= Math.max(boss.dmg - newMe.armor, 1);
    fight(newMe, newBoss, !myTurn);
  }

  if (myTurn) {
    spells.forEach((spell, spellIndex) => {
      if (newMe.mana >= spell.c && newMe.timers[spellIndex] === 0) {
        fight(
          {
            ...newMe,
            hp: newMe.hp + spell.h,
            mana: newMe.mana - spell.c,
            manaSpent: newMe.manaSpent + spell.c,
            timers: newMe.timers.map((t, i) =>
              i === spellIndex ? spell.t : t,
            ),
          },
          {
            ...newBoss,
            hp: newBoss.hp - spell.d,
          },
          !myTurn,
        );
      }
    });
  }
};

let minMana = Infinity;
let lose1hp = false;

const me: MyStats = {
  hp: 50,
  armor: 0,
  mana: 500,
  manaSpent: 0,
  timers: Array(spells.length).fill(0),
};

const boss: BossStats = {
  hp: parseInt(input[0].split(': ')[1]),
  dmg: parseInt(input[1].split(': ')[1]),
};

export const part1 = (): number => {
  minMana = Infinity;
  lose1hp = false;
  fight(me, boss, true);
  return minMana;
};

export const part2 = (): number => {
  minMana = Infinity;
  lose1hp = true;
  fight(me, boss, true);
  return minMana;
};
