import { getInputAsString } from '../../getInput.ts';

export const year = '2022';
export const day = 'day11';

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 10605 },
];
export const testsPart2 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: 2713310158,
  },
];

const getMonkeys = (input: string) =>
  input
    .split('\n\n')
    .map((monkey) => monkey.split('\n'))
    .map((monkey) => ({
      items: monkey[1]
        .substring(' Starting items: '.length)
        .split(',')
        .map((x) => input.split('\n\n').map((_m) => Number.parseInt(x))),
      operation: monkey[2].substring('  Operation: new = '.length).split(' '),
      divisible: Number.parseInt(
        monkey[3].substring('  Test: divisible by '.length),
      ),
      toMonkeyIfTrue: Number.parseInt(
        monkey[4].substring('    If true: throw to monkey '.length),
      ),
      toMonkeyIfFalse: Number.parseInt(
        monkey[5].substring('    If true: throw to monkey '.length),
      ),
      numberOfInspections: 0,
    }));

const doOperation = (left: number, op: string, right: number) =>
  op === '*' ? left * right : left + right;

const monkeyGame = (
  input: string,
  divideByThree = true,
  numberOfRounds = 20,
) => {
  const monkeys = getMonkeys(input);

  const runRound = () => {
    monkeys.forEach((monkey, monkeyIndex) => {
      const { items, operation, divisible, toMonkeyIfTrue, toMonkeyIfFalse } =
        monkey;
      items.forEach((item) => {
        const newWorryLevels = item.map(
          (itemWorryLevel, itemWorryLevelIndex) => {
            const operationResult = doOperation(
              operation[0] === 'old'
                ? itemWorryLevel
                : Number.parseInt(operation[0]),
              operation[1],
              operation[2] === 'old'
                ? itemWorryLevel
                : Number.parseInt(operation[2]),
            );
            return divideByThree
              ? Math.floor(operationResult / 3)
              : operationResult % monkeys[itemWorryLevelIndex].divisible;
          },
        );
        const newWorryLevel = newWorryLevels[monkeyIndex];
        if (newWorryLevel === undefined) throw new Error('woops');
        const isDivisible = newWorryLevel % divisible === 0;
        const toMonkey = isDivisible ? toMonkeyIfTrue : toMonkeyIfFalse;
        monkeys[toMonkey].items.push(newWorryLevels);
        monkey.numberOfInspections += 1;
      });
      monkey.items = [];
    });
  };

  for (let i = 0; i < numberOfRounds; i += 1) {
    runRound();
  }

  const twoMostActiveMonkeys = monkeys
    .map(({ numberOfInspections }) => numberOfInspections)
    .sort((a, b) => b - a);
  return twoMostActiveMonkeys[0] * twoMostActiveMonkeys[1];
};

export const part1 = (input: string) => monkeyGame(input);
export const part2 = (input: string) => monkeyGame(input, false, 10000);
