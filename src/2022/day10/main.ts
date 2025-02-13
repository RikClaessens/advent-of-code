import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day10';

export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 13140 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 0 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const runProgram = (input: string[]): number => {
  let register = 1;
  let cycle = 0;
  const capturedCycles = [20, 60, 100, 140, 180, 220];
  const capturedRegisters = new Array(capturedCycles.length).fill(0);
  let displayLine = '';

  const captureCycle = () => {
    // console.log({
    //   cycle,
    //   register: register % 40,
    //   draw: `${Math.abs(register - ((cycle % 40) - 1)) <= 1 ? '#' : '.'}`,
    // });
    if (Math.abs(register - ((cycle % 40) - 1)) <= 1) {
      displayLine += '#';
    } else {
      displayLine += '.';
    }
    if (cycle > 0 && cycle % 40 === 0) {
      console.log(displayLine);
      displayLine = '';
    }
    if (capturedCycles.indexOf(cycle) >= 0) {
      capturedRegisters[capturedCycles.indexOf(cycle)] = register;
    }
  };

  const tick = () => {
    cycle += 1;
  };

  input.forEach((command) => {
    if (command === 'noop') {
      tick();
      captureCycle();
    } else if (command.startsWith('addx')) {
      const addx = Number.parseInt(command.split(' ')[1]);
      tick();
      captureCycle();
      tick();
      captureCycle();
      register += addx;
    }
  });
  return capturedCycles
    .map((capturedCycle, index) => capturedRegisters[index] * capturedCycle)
    .reduce((total, c) => total + c, 0);
};

export const part1 = (input: string[]): number => runProgram(input);

export const part2 = (): number => 0;
// test('part 1', () => {
//   // assert.strictEqual(runProgram(testInput), 13140);
// });

// test('part 2', () => {
//   // assert.strictEqual(solve(testInput, 10), 1);
//   // assert.strictEqual(solve(testInput2, 10), 36);
// });

// (() => {
//   console.log('Part 1: ' + runProgram(input));
//   // console.log('Part 2: ' + solve(input, 10));
// })();
