import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day16';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 1651 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 1707 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Valves = Record<string, Valve>;

type Valve = {
  flowRate: number;
  tunnels: string[];
};

const getValves = (input: string[]) => {
  const valves: Valves = {};
  for (const line of input) {
    const [_, valve, flowRate, tunnels] = line.match(
      /Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? ([\w\s,]+)/,
    ) as string[];
    valves[valve] = {
      flowRate: Number(flowRate),
      tunnels: tunnels.split(', '),
    };
  }
  return valves;
};

// Calculate shortest paths between all valves using Floyd-Warshall
const getDistances = (
  valves: Valves,
): Record<string, Record<string, number>> => {
  const allValves = Object.keys(valves);
  const distances: Record<string, Record<string, number>> = {};

  // Initialize distances
  for (const from of allValves) {
    distances[from] = {};
    for (const to of allValves) {
      if (from === to) {
        distances[from][to] = 0;
      } else if (valves[from].tunnels.includes(to)) {
        distances[from][to] = 1;
      } else {
        distances[from][to] = Infinity;
      }
    }
  }

  // Floyd-Warshall
  for (const k of allValves) {
    for (const i of allValves) {
      for (const j of allValves) {
        distances[i][j] = Math.min(
          distances[i][j],
          distances[i][k] + distances[k][j],
        );
      }
    }
  }

  return distances;
};

const dfs = (
  current: string,
  opened: Set<string>,
  timeRemaining: number,
  valves: Valves,
  distances: Record<string, Record<string, number>>,
  memo: Map<string, number>,
): number => {
  if (timeRemaining <= 0) {
    return 0;
  }

  const key = `${current}|${Array.from(opened)
    .sort()
    .join(',')}|${timeRemaining}`;
  if (memo.has(key)) {
    return memo.get(key)!;
  }

  let maxPressure = 0;

  // Try moving to each unopened valve with positive flow
  for (const valve in valves) {
    if (!opened.has(valve) && valves[valve].flowRate > 0) {
      const distance = distances[current][valve];
      const timeToOpen = distance + 1; // +1 for opening the valve

      if (timeToOpen < timeRemaining) {
        const newOpened = new Set(opened);
        newOpened.add(valve);
        const pressure =
          valves[valve].flowRate * (timeRemaining - timeToOpen) +
          dfs(
            valve,
            newOpened,
            timeRemaining - timeToOpen,
            valves,
            distances,
            memo,
          );
        maxPressure = Math.max(maxPressure, pressure);
      }
    }
  }

  memo.set(key, maxPressure);
  return maxPressure;
};

export const part1 = (input: string[]): number => {
  const valves = getValves(input);
  const distances = getDistances(valves);
  const memo = new Map<string, number>();

  return dfs('AA', new Set(), 30, valves, distances, memo);
};

export const part2 = (input: string[]): number => {
  const valves = getValves(input);
  const distances = getDistances(valves);

  // Find all possible states (which valves are opened) and their max pressure with 26 minutes
  const stateToMaxPressure = new Map<string, number>();

  const dfs2 = (
    current: string,
    opened: Set<string>,
    timeRemaining: number,
    currentPressure: number,
  ): void => {
    const state = Array.from(opened).sort().join(',');
    const existing = stateToMaxPressure.get(state) ?? 0;
    stateToMaxPressure.set(state, Math.max(existing, currentPressure));

    if (timeRemaining <= 0) {
      return;
    }

    // Try moving to each unopened valve with positive flow
    for (const valve in valves) {
      if (!opened.has(valve) && valves[valve].flowRate > 0) {
        const distance = distances[current][valve];
        const timeToOpen = distance + 1;

        if (timeToOpen < timeRemaining) {
          const newOpened = new Set(opened);
          newOpened.add(valve);
          const pressure =
            valves[valve].flowRate * (timeRemaining - timeToOpen);
          dfs2(
            valve,
            newOpened,
            timeRemaining - timeToOpen,
            currentPressure + pressure,
          );
        }
      }
    }
  };

  dfs2('AA', new Set(), 26, 0);

  // Find best combination of two non-overlapping valve sets
  let maxPressure = 0;
  const states = Array.from(stateToMaxPressure.entries());

  for (let i = 0; i < states.length; i++) {
    for (let j = i; j < states.length; j++) {
      const [state1, pressure1] = states[i];
      const [state2, pressure2] = states[j];

      const valves1 = new Set(state1 ? state1.split(',') : []);
      const valves2 = new Set(state2 ? state2.split(',') : []);

      // Check if they don't overlap
      let overlap = false;
      for (const v of valves1) {
        if (valves2.has(v)) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        maxPressure = Math.max(maxPressure, pressure1 + pressure2);
      }
    }
  }

  return maxPressure;
};
