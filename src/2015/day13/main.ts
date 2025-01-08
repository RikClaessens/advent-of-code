import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day13';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 330 },
];

export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getPermutations = <T>(list: T[], size = list.length): T[][] => {
  if (size > list.length) {
    return [];
  } else if (size == 1) {
    return list.map((x) => [x]);
  }
  return list.flatMap((x) =>
    getPermutations(
      list.filter((y) => y !== x),
      size - 1,
    ).map((y) => [x, ...y]),
  );
};

const getHappinessChange = (input: string[], extraName?: string) => {
  const names = new Set<string>();
  if (extraName) {
    names.add(extraName);
  }
  const rules: [string, string, number][] = [];
  input.forEach((line) => {
    const [_, name1, gainOrLose, happiness, name2] = line.match(
      /(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)/,
    ) as string[];
    names.add(name1);
    rules.push([
      name1,
      name2,
      parseInt(happiness) * (gainOrLose === 'gain' ? 1 : -1),
    ]);
  });
  const namesArr = Array.from(names);
  const seatingArrangements = getPermutations(namesArr).filter(
    (p) => p[0] === namesArr[0],
  );

  let maxHappiness = -Infinity;

  seatingArrangements.forEach((seating) => {
    let happiness = 0;

    for (let i = 0; i < seating.length; i++) {
      const j = i === 0 ? seating.length - 1 : i - 1;

      const rule1 = rules.find(
        (rule) => rule[0] === seating[i] && rule[1] === seating[j],
      );
      const rule2 = rules.find(
        (rule) => rule[1] === seating[i] && rule[0] === seating[j],
      );

      if (rule1 && rule2) {
        happiness += rule1[2];
        happiness += rule2[2];
      }
    }
    maxHappiness = Math.max(happiness, maxHappiness);
  });

  return maxHappiness;
};

export const part1 = (input: string[]): number => getHappinessChange(input);

export const part2 = (input: string[]): number =>
  getHappinessChange(input, 'me');
