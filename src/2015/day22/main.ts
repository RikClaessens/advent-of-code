import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day22';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const magicMissile = {
  c: 53,
  dmg: 4,
};

const drain = {
  c: 73,
  dmg: 2,
  h: 2,
};

const shield = {
  c: 113,
  a: 7,
  t: 6,
};

const poison = {
  c: 173,
  dmg: 3,
  t: 6,
};

const recharge = {
  c: 229,
  m: 101,
  t: 5,
};

type MyStats = {
  hp: number;
  mana: number;
  manaSpent: number;
  shield: number;
  poison: number;
  recharge: number;
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

  let myArmor = 0;
  if (newMe.poison > 0) {
    newBoss.hp -= poison.dmg;
    newMe.poison -= 1;
  }
  if (newMe.shield > 0) {
    myArmor += shield.a;
    newMe.shield -= 1;
  }
  if (newMe.recharge > 0) {
    newMe.mana += recharge.m;
    newMe.recharge -= 1;
  }

  if (newBoss.hp <= 0) {
    minMana = Math.min(minMana, newMe.manaSpent);
    return;
  }

  if (!myTurn) {
    newMe.hp -= Math.max(boss.dmg - myArmor, 1);
    fight(newMe, newBoss, !myTurn);
  }

  if (myTurn) {
    if (newMe.mana >= magicMissile.c) {
      fight(
        {
          ...newMe,
          mana: newMe.mana - magicMissile.c,
          manaSpent: newMe.manaSpent + magicMissile.c,
        },
        {
          ...newBoss,
          hp: newBoss.hp - magicMissile.dmg,
        },
        !myTurn,
      );
    }
    if (newMe.mana >= drain.c) {
      fight(
        {
          ...newMe,
          hp: newMe.hp + drain.h,
          mana: newMe.mana - drain.c,
          manaSpent: newMe.manaSpent + drain.c,
        },
        {
          ...newBoss,
          hp: newBoss.hp - drain.dmg,
        },
        !myTurn,
      );
    }
    if (newMe.mana >= shield.c && newMe.shield === 0) {
      fight(
        {
          ...newMe,
          shield: shield.t,
          mana: newMe.mana - shield.c,
          manaSpent: newMe.manaSpent + shield.c,
        },
        newBoss,
        !myTurn,
      );
    }
    if (newMe.mana >= poison.c && newMe.poison === 0) {
      fight(
        {
          ...newMe,
          mana: newMe.mana - poison.c,
          manaSpent: newMe.manaSpent + poison.c,
          poison: poison.t,
        },
        newBoss,
        !myTurn,
      );
    }
    if (newMe.mana >= recharge.c && newMe.recharge === 0) {
      fight(
        {
          ...newMe,
          mana: newMe.mana - recharge.c,
          manaSpent: newMe.manaSpent + recharge.c,
          recharge: recharge.t,
        },
        newBoss,
        !myTurn,
      );
    }
  }
};

let minMana = Infinity;
let lose1hp = false;

const me: MyStats = {
  hp: 50,
  mana: 500,
  manaSpent: 0,
  shield: 0,
  poison: 0,
  recharge: 0,
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
