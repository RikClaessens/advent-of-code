import { Arith, init as initZ3Solver } from 'z3-solver';
import * as fs from 'fs';

export const input = fs
  .readFileSync(`./src/input.txt`, 'utf-8')
  .trim()
  .split('\n');

type Machine = {
  lightDiagram: number[];
  buttons: number[][];
  joltage: number[];
  state: number[];
  buttonPressCount: number;
};

const getMachines = (input: string[]): Machine[] => {
  const machines: Machine[] = [];
  for (const line of input) {
    const lightDiagram = line
      .substring(1, line.indexOf(']'))
      .split('')
      .map((c) => (c === '#' ? 1 : 0));
    const buttons: number[][] = line
      .substring(line.indexOf(']') + 3, line.indexOf('{') - 1)
      .split('(')
      .map((b) => b.trim())
      .map((b) => b.substring(0, b.length - 1))
      .map((b) => b.split(',').map((n) => parseInt(n)));
    const joltage = line
      .substring(line.indexOf('{') + 1, line.length - 1)
      .split(',')
      .map((n) => parseInt(n));
    machines.push({
      lightDiagram,
      buttons,
      joltage,
      state: Array(lightDiagram.length).fill(0),
      buttonPressCount: 0,
    });
  }
  return machines;
};

const solveWithZ3 = async (
  joltage: number[],
  buttons: number[][],
): Promise<number> => {
  const { Context } = await initZ3Solver();
  const { Int, Optimize } = Context('main');
  const solver = new Optimize();

  // Create press count variables for each button
  const buttonPresses: Arith[] = [];
  for (let i = 0; i < buttons.length; i++) {
    buttonPresses.push(Int.const(`b_${i}`));
  }

  // Button press count must be >= 0
  for (const count of buttonPresses) {
    solver.add(count.ge(0));
  }

  // For each position, the sum of button presses affecting it must equal the joltage value
  for (let pos = 0; pos < joltage.length; pos++) {
    const affects: Arith[] = [];
    for (let idx = 0; idx < buttons.length; idx++) {
      if (buttons[idx].includes(pos)) {
        affects.push(buttonPresses[idx]);
      }
    }
    // Sum of affecting buttons equals the joltage at this position
    const sum =
      affects.length > 0
        ? affects.reduce((a, v) => a.add(v), Int.val(0))
        : Int.val(0);
    solver.add(sum.eq(Int.val(joltage[pos])));
  }

  // Minimize total presses
  const totalPresses = buttonPresses.reduce((a, v) => a.add(v), Int.val(0));
  solver.minimize(totalPresses);

  const result = await solver.check();

  if (result === 'sat') {
    const model = solver.model();
    let total = 0;
    for (const pressCount of buttonPresses) {
      const val = model.eval(pressCount).toString();
      total += parseInt(val, 10);
    }
    return total;
  }
  throw new Error('No solution found');
};

const drawProgressBar = (progress: number) => {
  const barWidth = 30;
  const filledWidth = Math.floor((progress / 100) * barWidth);
  const emptyWidth = barWidth - filledWidth;
  const progressBar = '█'.repeat(filledWidth) + '▒'.repeat(emptyWidth);
  return `[${progressBar}]`;
};

const findFewestNumberOfButtonPressesPart2LP = async (
  machine: Machine,
): Promise<number> => {
  return solveWithZ3(machine.joltage, machine.buttons);
};

export const part2 = async (input: string[]) => {
  const machines = getMachines(input);
  let sum = 0;
  const results: number[] = [];
  let i = 1;
  for (const machine of machines) {
    const result = await findFewestNumberOfButtonPressesPart2LP(machine);
    results.push(result);
    await process.stdout.write(
      `${drawProgressBar((i / machines.length) * 100)} Machine ${i++} / ${
        machines.length
      } \r`,
    );
  }
  process.stdout.write('\n');
  sum = results.reduce((acc, val) => acc + val, 0);
  console.log('Part 2:', sum);
};

part2(input);
