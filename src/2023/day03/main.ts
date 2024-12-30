import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day03';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 4361 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 467835 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

export const isSymbol = (character: string | undefined) =>
  character !== undefined && !'.1234567890'.includes(character);

export const isGearSymbol = (character: string | undefined) =>
  character !== undefined && character === '*';

export const part1 = (input: string[]): number => {
  let sum = 0;
  input.forEach((line, lineIndex) => {
    const matches = [...line.matchAll(/(\d+)/g)];
    matches.forEach((match) => {
      const number = match[0];
      const indexOfNumber = match.index || 0;
      const lastIndexOfNumber = indexOfNumber + number.length - 1;

      let partFound = false;

      if (
        isSymbol(input?.[lineIndex]?.[indexOfNumber - 1]) ||
        isSymbol(input?.[lineIndex]?.[lastIndexOfNumber + 1])
      ) {
        partFound = true;
      } else {
        // above and below the number, one spot to the left, one to the right
        for (
          let search = indexOfNumber - 1;
          search <= lastIndexOfNumber + 1;
          search += 1
        ) {
          if (
            isSymbol(input?.[lineIndex - 1]?.[search]) ||
            isSymbol(input?.[lineIndex + 1]?.[search])
          ) {
            partFound = true;
            break;
          }
        }
      }
      if (partFound) {
        sum += Number.parseInt(number);
      }
    });
  });

  return sum;
};

export const part2 = (input: string[]): number => {
  let sum = 0;
  const gears: { [key: string]: number[] } = {};

  input.forEach((line, lineIndex) => {
    const matches = [...line.matchAll(/(\d+)/g)];
    matches.forEach((match) => {
      const number = match[0];
      const indexOfNumber = match.index || 0;
      const lastIndexOfNumber = indexOfNumber + number.length - 1;

      let gearSymbolFound = false;
      let gearX = -1;
      let gearY = -1;

      if (isGearSymbol(input?.[lineIndex]?.[indexOfNumber - 1])) {
        gearSymbolFound = true;
        gearX = lineIndex;
        gearY = indexOfNumber - 1;
      } else if (isGearSymbol(input?.[lineIndex]?.[lastIndexOfNumber + 1])) {
        gearSymbolFound = true;
        gearX = lineIndex;
        gearY = lastIndexOfNumber + 1;
      } else {
        // above and below the number, one spot to the left, one to the right
        for (
          let search = indexOfNumber - 1;
          search <= lastIndexOfNumber + 1;
          search += 1
        ) {
          if (isGearSymbol(input?.[lineIndex - 1]?.[search])) {
            gearSymbolFound = true;
            gearX = lineIndex - 1;
            gearY = search;
            break;
          } else if (isGearSymbol(input?.[lineIndex + 1]?.[search])) {
            gearSymbolFound = true;
            gearX = lineIndex + 1;
            gearY = search;
            break;
          }
        }
      }
      if (gearSymbolFound) {
        const gearIndex = `${gearX}-${gearY}`;
        if (!gears[gearIndex]) {
          gears[gearIndex] = [];
        }
        gears[gearIndex].push(Number.parseInt(number));
      }
    });
  });
  Object.values(gears).forEach((numbers) => {
    if (numbers.length === 2) {
      sum += numbers[0] * numbers[1];
    }
  });

  return sum;
};
