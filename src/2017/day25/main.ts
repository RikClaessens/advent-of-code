import { getInput } from "../../getInput.ts";

export const year = "2017";
export const day = "day25";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 3 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 0 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type StateInstruction = [ValueInstruction, ValueInstruction];

type ValueInstruction = {
  write: number;
  move: number;
  nextState: string;
};

type Instructions = {
  startState: string;
  steps: number;
  stateInstructions: Record<string, StateInstruction>;
};

const parseValueInstruction = (input: string[]): ValueInstruction => {
  return {
    write: Number.parseInt(input[0].split(" ")[8][0]),
    move: input[1].split(" ")[10] === "right." ? 1 : -1,
    nextState: input[2].split(" ")[8][0],
  };
};

const parseStateInstruction = (input: string[]): [string, StateInstruction] => {
  return [
    input[0].split(" ")[2][0],
    [
      parseValueInstruction(input.slice(2, 5)),
      parseValueInstruction(input.slice(6, 9)),
    ],
  ];
};

const parseInput = (input: string[]): Instructions => {
  const startState = input[0].split(" ")[3][0];
  const steps = Number.parseInt(input[1].split(" ")[5]);

  const restInput = input.slice(3);
  let stateInstructions: Record<string, StateInstruction> = {};
  for (let i = 0; i < restInput.length / 10; i += 1) {
    const [state, stateInstruction] = parseStateInstruction(
      restInput.slice(i * 10, i * 10 + 10),
    );
    stateInstructions[state] = stateInstruction;
  }

  return { startState, steps, stateInstructions };
};

const runTuringMachine = (instructions: Instructions) => {
  const tape = new Set<number>();
  let currentState = instructions.startState;
  let cursor = 0;

  const getTapeValue = () => (tape.has(cursor) ? 1 : 0);

  for (let step = 0; step < instructions.steps; step += 1) {
    const instruction =
      instructions.stateInstructions[currentState][getTapeValue()];
    if (instruction.write === 1) {
      tape.add(cursor);
    } else {
      tape.delete(cursor);
    }

    cursor += instruction.move;
    currentState = instruction.nextState;
  }

  return tape.size;
};

export const part1 = (input: string[]): number => {
  const instructions = parseInput(input);
  return runTuringMachine(instructions);
};

export const part2 = (input: string[]): number => {
  return 0;
};
