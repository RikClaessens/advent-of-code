import { getInputAsString } from "../../getInput.ts";

export const year = "2022";
export const day = "day17";
export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 3068 },
];

export const testsPart2 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: 1514285714288,
  },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

type Rock = string[];

type Pos = [number, number];

const rocks: Rock[] = [
  ["####"],
  [".#.", "###", ".#."],
  ["..#", "..#", "###"],
  ["#", "#", "#", "#"],
  ["##", "##"],
];

const gridWidth = 7;
const fromLeft = 2;
const fromTallest = 3;

type Delta = {
  tall: number;
  rockCount: number;
  key: string;
};

const dropRocks = (jetsOfGas: string[], numberOfRocks: number = 2022) => {
  const grid: Pos[] = [];
  let tallestRock = 0;
  let currentRockIdx = rocks.length - 1;
  let currentRock = rocks[rocks.length - 1];
  let rockPos: Pos[] = [];
  let rockCount = 0;
  let step = 0;
  const deltas: Delta[] = [];
  const rockCounts: Record<number, number> = {};

  const spawnRock = () => {
    rockCount += 1;
    currentRockIdx = (currentRockIdx + 1) % rocks.length;
    currentRock = rocks[currentRockIdx];
    for (let i = 0; i < currentRock.length; i += 1) {
      for (let j = 0; j < currentRock[i].length; j += 1) {
        if (currentRock[currentRock.length - 1 - i][j] === "#") {
          rockPos.push([tallestRock + fromTallest + i, fromLeft + j]);
        }
      }
    }
  };

  while (true) {
    if (rockPos.length === 0) {
      rockCounts[rockCount] = tallestRock;
      if (rockCount === numberOfRocks) {
        break;
      }
      spawnRock();
    }

    // move by the jet of gas
    const dir = jetsOfGas[step % jetsOfGas.length] === ">" ? 1 : -1;
    const canMoveByJetOfGas = rockPos.every(
      (pos) =>
        pos[1] + dir >= 0 &&
        pos[1] + dir < gridWidth &&
        !grid.find((gPos) => gPos[0] === pos[0] && gPos[1] === pos[1] + dir),
    );
    if (canMoveByJetOfGas) {
      for (const rPos of rockPos) {
        rPos[1] += dir;
      }
    }

    // move down
    const canMoveDown = rockPos.every(
      (pos) =>
        pos[0] - 1 >= 0 &&
        !grid.find((gPos) => gPos[0] === pos[0] - 1 && gPos[1] === pos[1]),
    );
    if (canMoveDown) {
      for (const rPos of rockPos) {
        rPos[0] -= 1;
      }
    } else {
      // a new rock will be falling and be moved by the current jet of gas
      // step -= 1;
      const newLinesPushed = new Set<number>();
      for (const rPos of rockPos) {
        grid.push([rPos[0], rPos[1]]);
        tallestRock = Math.max(tallestRock, rPos[0] + 1);
        newLinesPushed.add(rPos[0]);
      }
      // start checking for pattern after 1000 rocks, a bit hacky, couldn't figure out a more correct number
      if (rockCount > 1000) {
        const newDelta = {
          tall: tallestRock,
          rockCount: rockCount,
          key: `${currentRockIdx},${step % jetsOfGas.length}`,
        };
        const existingDelta = deltas.find((d) => d.key === newDelta.key);
        if (existingDelta) {
          const dr = newDelta.rockCount - existingDelta.rockCount;
          const rocksLeft = numberOfRocks - rockCount;
          const patternsLeft = Math.floor(rocksLeft / dr);
          const extraRocks = rocksLeft % dr;
          const extraTall =
            rockCounts[existingDelta.rockCount + extraRocks] -
            rockCounts[existingDelta.rockCount];
          return (
            newDelta.tall +
            patternsLeft * (newDelta.tall - existingDelta.tall) +
            extraTall
          );
        }
        deltas.push(newDelta);
      }
      rockPos = [];
    }
    step += 1;
  }

  return tallestRock;
};

export const part1 = (input: string): number => dropRocks(input.split(""));

export const part2 = (input: string): number =>
  dropRocks(input.split(""), 1000000000000);
