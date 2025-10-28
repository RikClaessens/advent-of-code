import { getInputAsString } from "../../getInput.ts";

export const year = "2017";
export const day = "day16";
export const testsPart1 = [
  { input: `s1,x3/4,pe/b`, extraProps: { programs: "abcde" }, result: "baedc" },
];

export const testsPart2 = [
  // { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 0 },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const dance = (moves: string[], programs: string): string => {
  let result = programs;
  moves.forEach((move) => {
    const instruction = move.substring(1);

    if (move.startsWith("s")) {
      const spin = Number.parseInt(instruction.split("/")[0]);
      result = `${result.substring(result.length - spin)}${result.substring(
        0,
        result.length - spin,
      )}`;
    } else if (move.startsWith("x")) {
      const p1 = Number.parseInt(instruction.split("/")[0]);
      const p2 = Number.parseInt(instruction.split("/")[1]);
      const resultArr = [...result];
      const temp = result[p1];
      resultArr[p1] = result[p2];
      resultArr[p2] = temp;
      result = resultArr.join("");
    } else if (move.startsWith("p")) {
      const p1 = result.indexOf(instruction.split("/")[0]);
      const p2 = result.indexOf(instruction.split("/")[1]);
      const resultArr = [...result];
      const temp = result[p1];
      resultArr[p1] = result[p2];
      resultArr[p2] = temp;
      result = resultArr.join("");
    }
  });
  return result;
};

export const part1 = (
  input: string,
  { programs = "abcdefghijklmnop" },
): string => dance(input.split(","), programs);

export const part2 = (
  input: string,
  { programs = "abcdefghijklmnop" },
): string => {
  const danceMoves = input.split(",");
  let result = programs;
  const cache: string[] = [];
  const n = 1000000000;
  for (let i = 0; i < n; i += 1) {
    if (cache.includes(result)) {
      const remainingIterations = (n - i) % cache.length;
      return cache[remainingIterations];
    } else {
      cache.push(result);
    }
    result = dance(danceMoves, result);
  }

  return result;
};
