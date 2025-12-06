import { getInput } from "../../getInput.ts";

export const year = "2025";
export const day = "day6";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 4277556 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 3263827 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type UnparsedMathProblem = {
  numberStrings: string[];
  operand: string;
};
type MathProblem = {
  numbers: number[];
  operand: string;
};

const getMathProblemsPart1 = (input: string[]): MathProblem[] => {
  const mathProblems: MathProblem[] = [];
  const unparsedMathProblems = getUnparsedMathProblems(input);

  for (const unpasedMathProblem of unparsedMathProblems) {
    mathProblems.push({
      numbers: unpasedMathProblem.numberStrings.map((n) => parseInt(n)),
      operand: unpasedMathProblem.operand,
    });
  }

  return mathProblems;
};

const getMathProblemsPart2 = (input: string[]): MathProblem[] => {
  const mathProblems: MathProblem[] = [];
  const unparsedMathProblems = getUnparsedMathProblems(input);

  for (const unpasedMathProblem of unparsedMathProblems) {
    const maxDigitCount = unpasedMathProblem.numberStrings.reduce(
      (max, n) => Math.max(max, n.toString().length),
      0,
    );
    const numberStringsRightToLeft: string[] = Array.from(
      { length: maxDigitCount },
      () => "",
    );
    for (let j = 0; j < unpasedMathProblem.numberStrings.length; j += 1) {
      for (let i = 0; i < maxDigitCount; i += 1) {
        const n = unpasedMathProblem.numberStrings[j].toString();
        if (n.length > i) {
          numberStringsRightToLeft[i] += n[i];
        }
      }
    }
    mathProblems.push({
      numbers: numberStringsRightToLeft.map((n) => parseInt(n)),
      operand: unpasedMathProblem.operand,
    });
  }

  return mathProblems;
};

const getUnparsedMathProblems = (input: string[]): UnparsedMathProblem[] => {
  const unparsedmathProblems: UnparsedMathProblem[] = [];
  let numberStrings: string[] = [];
  let unparsedMathProblem: UnparsedMathProblem | null = null;
  const maxLineLength = input.reduce(
    (max, line) => Math.max(max, line.length),
    0,
  );
  for (let i = 0; i < maxLineLength; i += 1) {
    if (!unparsedMathProblem) {
      unparsedMathProblem = {
        numberStrings: [],
        operand: input[input.length - 1][i],
      };
      numberStrings = Array.from({ length: input.length - 1 }, () => "");
    }
    let onlySpacesFound = true;
    for (let j = 0; j < input.length - 1; j += 1) {
      if (input[j][i] !== " ") {
        onlySpacesFound = false;
      }
      numberStrings[j] += input[j][i];
    }
    if (onlySpacesFound) {
      numberStrings = numberStrings.map((ns) => ns.substring(0, ns.length - 1));
    }
    if (onlySpacesFound || i === maxLineLength - 1) {
      unparsedmathProblems.push({
        numberStrings,
        operand: unparsedMathProblem.operand,
      });
      unparsedMathProblem = null;
    }
  }

  return unparsedmathProblems;
};

const solveMathProblems = (mathProblems: MathProblem[]): number[] =>
  mathProblems.map(({ numbers, operand }) => {
    if (operand === "*") {
      return numbers.reduce((product, n) => product * n, 1);
    }
    return numbers.reduce((sum, n) => sum + n, 0);
  });

export const part1 = (input: string[]): number =>
  solveMathProblems(getMathProblemsPart1(input)).reduce((sum, n) => sum + n, 0);

export const part2 = (input: string[]): number =>
  solveMathProblems(getMathProblemsPart2(input)).reduce((sum, n) => sum + n, 0);
