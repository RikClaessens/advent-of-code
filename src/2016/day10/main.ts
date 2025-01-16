import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day10';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

let robot6117 = -1;
const outputs: { [key: number]: number } = {};

const runRobots = (input: string[]) => {
  const target = [17, 61];
  const bots: { [key: number]: [number[], string, number, string, number] } =
    {};

  input.forEach((i) => {
    if (i.startsWith('value')) {
      const [_, v, b] = i.match(/value (\d+) goes to bot (\d+)/) as string[];
      const bi = parseInt(b);
      if (!bots[bi]) {
        bots[bi] = [[], '', -1, '', -1];
      }
      bots[bi][0].push(parseInt(v));
    } else {
      const [_, b, t1, t1i, t2, t2i] = i.match(
        /bot (\d+) gives low to (\w+) (\d+) and high to (\w+) (\d+)/,
      ) as string[];
      const bi = parseInt(b);
      bots[bi] = [bots[bi]?.[0] || [], t1, parseInt(t1i), t2, parseInt(t2i)];
    }
  });

  let chipsTransferred = true;

  while (chipsTransferred) {
    chipsTransferred = false;
    Object.entries(bots).forEach(([botIndex, bot]) => {
      if (bot[0].length === 2) {
        chipsTransferred = true;
        const chips = bot[0].sort((a, b) => a - b);
        if (chips[0] === target[0] && chips[1] === target[1]) {
          robot6117 = parseInt(botIndex);
        }
        if (bot[1] === 'bot') {
          bots[bot[2]][0].push(chips[0]);
        } else {
          outputs[bot[2]] = chips[0];
        }

        if (bot[3] === 'bot') {
          bots[bot[4]][0].push(chips[1]);
        } else {
          outputs[bot[4]] = chips[1];
        }
        bot[0] = [];
      }
    });
  }
};

runRobots(input);

export const part1 = (): number => robot6117;

export const part2 = (): number => outputs[0] * outputs[1] * outputs[2];
