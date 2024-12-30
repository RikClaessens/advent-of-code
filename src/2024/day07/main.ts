import { getInput } from '../../getInput.ts';

export const year = '2024';
export const day = 'day07';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 3749 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 11387 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Equation = {
  result: number;
  numbers: number[];
};

const parseInput = (input: string[]): Equation[] => {
  const equations: Equation[] = [];
  input.forEach((line) => {
    equations.push({
      result: Number.parseInt(line.split(':')[0]),
      numbers: line
        .split(':')[1]
        .trim()
        .split(' ')
        .map((n) => Number.parseInt(n)),
    });
  });
  return equations;
};

type Operator = '+' | '*' | '||';

const applyOperator = (a: number, b: number, operator: Operator): number => {
  switch (operator) {
    case '+':
      return a + b;
    case '*':
      return a * b;
    case '||':
      return Number.parseInt(`${a}${b}`);
  }
};

const newEquation = (equation: Equation, operator: Operator): Equation => {
  const { result, numbers } = equation;
  return {
    result,
    numbers: [
      applyOperator(equation.numbers[0], equation.numbers[1], operator),
      ...numbers.slice(2),
    ],
  };
};

const trySolve = (equation: Equation, operators: Operator[]): boolean => {
  const { result, numbers } = equation;
  if (numbers.length === 1) {
    return numbers[0] === result;
  }
  for (let i = 0; i < operators.length; i++) {
    if (trySolve(newEquation(equation, operators[i]), operators)) {
      return true;
    }
  }
  return false;
};

export const part1 = (input: string[]): number => {
  const equations = parseInput(input);
  const solved: Equation[] = [];
  equations.forEach((equation) => {
    if (trySolve(equation, ['+', '*'])) {
      solved.push(equation);
    }
  });
  return solved.reduce((acc, eq) => acc + eq.result, 0);
};

export const part2 = (input: string[]): number => {
  const equations = parseInput(input);
  const solved: Equation[] = [];
  equations.forEach((equation) => {
    if (trySolve(equation, ['+', '*', '||'])) {
      solved.push(equation);
    }
  });
  return solved.reduce((acc, eq) => acc + eq.result, 0);
};
