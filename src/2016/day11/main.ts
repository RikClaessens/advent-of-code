/* This day was solved with a little help from ChatGPT, but a big speedup
 * was achieved by manually finding the number of steps needed to move
 * pairs of items up from each floor.
 * Running time is drastically reduced by this optimization.
 */

import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day11';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    result: 11,
  },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

type State = {
  elevator: number;
  floors: string[][];
  steps: number;
};

const getInitialState = (input: string[]): State => {
  const floors: string[][] = Array(4)
    .fill([])
    .map(() => []);

  const elements = {
    thulium: 'T',
    plutonium: 'P',
    strontium: 'S',
    promethium: 'R',
    ruthenium: 'U',
    elerium: 'E',
    dilithium: 'D',
    hydrogen: 'H',
    lithium: 'L',
  };

  for (let i = 0; i < 4; i++) {
    const chips = Array.from(
      input[i].matchAll(/\s(\w+)-compatible microchip/g),
    ).map((m) => `${elements[m[1] as keyof typeof elements]}M`);
    const generators = Array.from(input[i].matchAll(/\s(\w+) generator/g)).map(
      (m) => `${elements[m[1] as keyof typeof elements]}G`,
    );
    floors[i].push(...chips);
    floors[i].push(...generators);
  }

  let foundPair = true;
  // manually we found that moving pairs up from each floor needs this number of steps
  const stepsPerFloor = [12, 8, 4, 0];
  let steps = 0;

  while (foundPair) {
    foundPair = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < floors[i].length; j++) {
        if (floors[i][j].endsWith('M')) {
          const generator = floors[i].find(
            (item) => item[0] === floors[i][j][0] && item.endsWith('G'),
          );
          if (generator) {
            foundPair = true;
            floors[i].splice(j, 1);
            floors[i].splice(floors[i].indexOf(generator), 1);
            steps += stepsPerFloor[i];
          }
        }
      }
    }
  }

  return { elevator: 0, floors, steps };
};

const isValidFloor = (floor: string[]): boolean => {
  const generators = new Set(
    floor.filter((item) => item.endsWith('G')).map((item) => item[0]),
  );
  const microchips = floor.filter((item) => item.endsWith('M'));

  return microchips.every(
    (chip) => generators.has(chip[0]) || generators.size === 0,
  );
};

const serializeState = (state: State): string => {
  const serializedFloors = state.floors.map((floor) =>
    floor.slice().sort().join(','),
  );
  return `${state.elevator}|${serializedFloors.join('|')}`;
};

const getNextStates = (state: State): State[] => {
  const { elevator, floors, steps } = state;
  const currentFloor = floors[elevator];
  const nextStates: State[] = [];

  const directions = [];
  if (elevator > 0) directions.push(-1);
  if (elevator < 3) directions.push(1);

  // Try moving one or two items
  for (let i = 0; i < currentFloor.length; i++) {
    for (let j = i; j < currentFloor.length; j++) {
      const itemsToMove = [currentFloor[i]];
      if (i !== j) itemsToMove.push(currentFloor[j]);

      for (const direction of directions) {
        const newElevator = elevator + direction;
        const newFloors = floors.map((floor, index) =>
          index === elevator
            ? floor.filter((item) => !itemsToMove.includes(item))
            : index === newElevator
            ? [...floor, ...itemsToMove]
            : floor,
        );

        if (
          isValidFloor(newFloors[elevator]) &&
          isValidFloor(newFloors[newElevator])
        ) {
          nextStates.push({
            elevator: newElevator,
            floors: newFloors,
            steps: steps + 1,
          });
        }
      }
    }
  }

  return nextStates;
};

const solve = (initialState: State): number => {
  const queue: State[] = [initialState];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const currentState = queue.shift()!;
    const serialized = serializeState(currentState);

    if (visited.has(serialized)) continue;
    visited.add(serialized);

    if (currentState.floors[3].length === initialState.floors.flat().length) {
      return currentState.steps;
    }

    queue.push(...getNextStates(currentState));
  }

  return -1; // No solution found
};

export const part1 = (input: string[]): number => solve(getInitialState(input));

export const part2 = (input: string[]): number => {
  const floors = getInitialState(input);
  floors.floors[0].push('EG', 'EM', 'DG', 'DM');
  return solve(floors);
};
