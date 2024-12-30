import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day04';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 13 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 30 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

type Card = {
  winningNumbers: number[];
  myNumbers: number[];
};

const parseCard = (line: string): Card => {
  const numbers = line.substring(line.indexOf(':') + 2).split('|');
  return {
    winningNumbers: numbers[0]
      .replaceAll('  ', ' ')
      .trim()
      .split(' ')
      .map((n) => Number.parseInt(n)),
    myNumbers: numbers[1]
      .replaceAll('  ', ' ')
      .trim()
      .split(' ')
      .map((n) => Number.parseInt(n)),
  };
};

const increaseCardScore = (score: number): number =>
  score === 0 ? 1 : score * 2;

export const part1 = (input: string[]): number => {
  let sum = 0;
  const cards = input.map(parseCard);
  cards.forEach((card) => {
    let cardScore = 0;
    card.myNumbers.forEach((myNumber) => {
      if (card.winningNumbers.includes(myNumber)) {
        cardScore = increaseCardScore(cardScore);
      }
    });
    sum += cardScore;
  });

  return sum;
};

export const part2 = (input: string[]): number => {
  const scratchCards = new Array(input.length).fill(1);
  const cards = input.map(parseCard);
  cards.forEach((card, cardIndex) => {
    let numberOfMatchingNumbers = 0;
    card.myNumbers.forEach((myNumber) => {
      if (card.winningNumbers.includes(myNumber)) {
        numberOfMatchingNumbers += 1;
      }
    });
    for (let i = 0; i < numberOfMatchingNumbers; i += 1) {
      const cardWonIndex = cardIndex + i + 1;
      scratchCards[cardWonIndex] += scratchCards[cardIndex];
    }
  });

  return scratchCards.reduce(
    (numberOfScratchCards, numberOfThisScratchCard) =>
      numberOfScratchCards + numberOfThisScratchCard,
    0,
  );
};
