import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day20';
export const testsPart1 = [];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

export const part1 = (input: string[]): number => {
  const blacklist = input
    .map((i) => i.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]);

  let lowestIp = 0;
  let blacklistRule = 0;

  while (
    lowestIp >= blacklist[blacklistRule][0] &&
    lowestIp <= blacklist[blacklistRule][1]
  ) {
    lowestIp = blacklist[blacklistRule][1] + 1;
    blacklistRule++;
    while (lowestIp >= blacklist[blacklistRule][1]) {
      blacklistRule++;
    }
  }
  return lowestIp;
};

export const part2 = (input: string[]): number => {
  const blacklist = input
    .map((i) => i.split('-').map(Number))
    .sort((a, b) => a[0] - b[0]);

  let numberOfIps = 0;
  const max = 4294967295;
  let maxBlocked = 0;

  for (let b = 1; b < blacklist.length; b++) {
    const prevBlacklisted = blacklist[b - 1];
    const blacklisted = blacklist[b];

    maxBlocked = Math.max(maxBlocked, prevBlacklisted[1]);

    if (
      prevBlacklisted[1] < blacklisted[0] &&
      blacklisted[0] > maxBlocked + 1
    ) {
      numberOfIps += blacklisted[0] - maxBlocked - 1;
    }
  }
  maxBlocked = Math.max(maxBlocked, blacklist[blacklist.length - 1][1]);
  if (maxBlocked < max) {
    numberOfIps += max - maxBlocked;
  }

  return numberOfIps;
};
