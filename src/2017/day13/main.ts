import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day13';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 24 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 10 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Firewall = Record<number, number>;

const getFirewall = (input: string[]) => {
  const firewall: Firewall = {};
  for (const line of input) {
    firewall[Number.parseInt(line.split(':')[0])] = Number.parseInt(
      line.split(':')[1],
    );
  }
  return firewall;
};

const getScannerPos = (depth: number, time: number) => {
  const dist = (depth - 1) * 2;
  let pos = time % dist;
  if (pos > dist / 2) {
    pos = dist - pos;
  }
  return pos;
};

const getSeverity = (firewall: Firewall, delay: number = 0) => {
  let severity = 0;

  Object.entries(firewall).forEach(([key, depth]) => {
    const time = Number.parseInt(key) + delay;
    const scannerPos = getScannerPos(depth, time);
    if (scannerPos === 0) {
      severity += depth * time;
    }
  });
  return severity;
};

export const part1 = (input: string[]): number =>
  getSeverity(getFirewall(input));

export const part2 = (input: string[]): number => {
  const firewall = getFirewall(input);

  let caught = true;
  let delay = -1;
  while (caught) {
    delay += 1;
    const severity = getSeverity(firewall, delay);
    if (severity === 0) {
      caught = false;
    }
  }

  return delay;
};
