import { getInput } from "../../getInput.ts";

export const year = "2025";
export const day = "day1";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 3 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 6 },
  { input: ["L10"], result: 0 }, // simple left
  { input: ["R10"], result: 0 }, // simple right
  { input: ["L50"], result: 1 }, // left to 0
  { input: ["R50"], result: 1 }, // right to 0
  { input: ["L210"], result: 2 }, // left, cross 0 twice
  { input: ["R210"], result: 2 }, // right, cross 0 twice
  { input: ["L250"], result: 3 }, // left to 0, cross 0 twice
  { input: ["R250"], result: 3 }, // right to 0, cross 0 twice
  { input: ["L50", "L10"], result: 1 }, // start from 0, simple left
  { input: ["L50", "R10"], result: 1 }, // start from 0, simple right
  { input: ["L50", "L100"], result: 2 }, // start from 0, left to 0
  { input: ["L50", "R100"], result: 2 }, // start from 0, right to 0
  { input: ["L50", "L210"], result: 3 }, // start from 0, left, cross 0 twice
  { input: ["L50", "R210"], result: 3 }, // start from 0, right, cross 0 twice
  { input: ["L50", "L300"], result: 4 }, // start from 0, left to 0, cross 0 twice
  { input: ["L50", "R300"], result: 4 }, // start from 0, right to 0, cross 0 twice
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const doRotations = (input: string[]): [number, number] => {
  let dial = 50;
  let dialPointedAtZero = 0;
  let dialCrossedZero = 0;
  let previousDial = 50;

  for (const rotation of input) {
    const direction = rotation[0] === "L" ? -1 : 1;
    const clicks = Number.parseInt(rotation.substring(1));
    dial += direction * clicks;
    const newDial = ((dial % 100) + 100) % 100;

    if (direction === -1) {
      if (dial < 0) {
        if (newDial === 0) dialCrossedZero -= 1;
        if (previousDial === 0) dialCrossedZero -= 1;
        dialCrossedZero += Math.floor(-(dial - 100) / 100);
      }
    }
    if (direction === 1) {
      if (dial >= 100) {
        if (newDial === 0) dialCrossedZero -= 1;
        dialCrossedZero += Math.floor(dial / 100);
      }
    }

    dial = newDial;
    if (dial === 0) {
      dialPointedAtZero += 1;
    }
    previousDial = dial;
  }

  return [dialPointedAtZero, dialCrossedZero + dialPointedAtZero];
};

export const part1 = (input: string[]): number => doRotations(input)[0];

export const part2 = (input: string[]): number => doRotations(input)[1];

// 7164
