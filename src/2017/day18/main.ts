import { getInput } from '../../getInput.ts';

export const year = '2017';
export const day = 'day18';
export const testsPart1 = [
  {
    input: [
      'set a 1',
      'add a 2',
      'mul a a',
      'mod a 5',
      'snd a',
      'set a 0',
      'rcv a',
      'jgz a -1',
      'set a 1',
      'jgz a -2',
    ],
    result: 4,
  },
];

export const testsPart2 = [
  {
    input: ['snd 1', 'snd 2', 'snd p', 'rcv a', 'rcv b', 'rcv c', 'rcv d'],
    result: 3,
  },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const runInstructions = (input: string[]): number => {
  const registers: Record<string, number> = {};
  let lastPlayedSound = -1;
  let recoveredSound = -1;

  let i = 0;
  while (i < input.length) {
    const line = input[i];
    const [_, ins, x, y] = line.match(/([a-z]*)\s(\w)\s?(-?\w+)?/) as [
      string,
      string,
      string,
      string | undefined,
    ];
    if (!registers[x]) {
      registers[x] = 0;
    }

    let valY = undefined;
    if (y && isNaN(parseInt(y))) {
      if (!registers[y]) {
        registers[y] = 0;
      }
      valY = registers[y];
    } else if (y) {
      valY = parseInt(y);
    }

    switch (ins) {
      case 'snd':
        lastPlayedSound = registers[x];
        break;
      case 'set':
        registers[x] = valY!;
        break;
      case 'add':
        registers[x] += valY!;
        break;
      case 'mul':
        registers[x] = registers[x] * valY!;
        break;
      case 'mod':
        registers[x] = registers[x] % valY!;
        break;
      case 'rcv':
        if (registers[x] !== 0) {
          recoveredSound = lastPlayedSound;
          i = Number.MAX_VALUE;
        }
        break;
      case 'jgz':
        if (registers[x] > 0) {
          i += valY!;
          i -= 1;
        }
        break;
    }
    i += 1;
  }
  return recoveredSound;
};

const runPart2 = (
  input: string[],
  registers: Record<string, number>,
  incomingQueue: number[],
  sendQueue: number[],
  sends: number,
  i: number,
) => {
  let canRun = true;
  while (i < input.length && canRun) {
    const line = input[i];
    const [_, ins, x, y] = line.match(/([a-z]+)\s+(-?\w+)\s?(-?\w+)?/) as [
      string,
      string,
      string,
      string | undefined,
    ];

    if (x && isNaN(parseInt(x)) && !registers[x]) {
      registers[x] = 0;
    }
    const valX = isNaN(parseInt(x)) ? registers[x] : parseInt(x);

    let valY = undefined;
    if (y && isNaN(parseInt(y))) {
      if (!registers[y]) {
        registers[y] = 0;
      }
      valY = registers[y];
    } else if (y) {
      valY = parseInt(y);
    }

    switch (ins) {
      case 'snd':
        sendQueue.push(valX);
        sends = sends + 1;
        break;
      case 'set':
        registers[x] = valY!;
        break;
      case 'add':
        registers[x] += valY!;
        break;
      case 'mul':
        registers[x] = registers[x] * valY!;
        break;
      case 'mod':
        registers[x] = registers[x] % valY!;
        break;
      case 'rcv':
        if (incomingQueue.length > 0) {
          registers[x] = incomingQueue.shift()!;
        } else {
          canRun = false;
          i -= 1;
        }
        break;
      case 'jgz':
        if (valX > 0) {
          i += valY!;
          i -= 1;
        }
        break;
    }
    i += 1;
  }
  return [sends, i];
};

const runInstructionsPart2 = (input: string[]): number => {
  const registers0: Record<string, number> = { p: 0 };
  const registers1: Record<string, number> = { p: 1 };
  const incomingQueue0: number[] = [];
  const incomingQueue1: number[] = [];
  let program0Sends = 0;
  let program1Sends = 0;
  let program0CanRun = true;
  let program1CanRun = true;
  let i0 = 0;
  let i1 = 0;

  while (program0CanRun || program1CanRun) {
    [program0Sends, i0] = runPart2(
      input,
      registers0,
      incomingQueue0,
      incomingQueue1,
      program0Sends,
      i0,
    );
    [program1Sends, i1] = runPart2(
      input,
      registers1,
      incomingQueue1,
      incomingQueue0,
      program1Sends,
      i1,
    );
    program0CanRun = incomingQueue0.length > 0;
    program1CanRun = incomingQueue1.length > 0;
  }

  return program1Sends;
};

export const part1 = (input: string[]): number => runInstructions(input);

export const part2 = (input: string[]): number => runInstructionsPart2(input);
