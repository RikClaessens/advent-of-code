import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day07';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 6440 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 5905 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

type Hand = {
  cards: string;
  bid: number;
  part2Cards?: string;
};

const getHands = (input: string[]): Hand[] =>
  input.map((line) => ({
    cards: line.split(' ')[0],
    bid: Number.parseInt(line.split(' ')[1]),
  }));

const count = (cards: string, cardsSet: Set<string>, index: number): number =>
  countDifferentCards(cards, Array.from(cardsSet)[index]);

const countDifferentCards = (cards: string, card: string): number =>
  cards.split('').filter((c) => c === card).length;

export const isFiveOfAKind = (cards: string): boolean =>
  new Set(cards).size === 1;

export const isFourOfAKind = (cards: string): boolean => {
  const diffCards = new Set(cards);
  if (diffCards.size !== 2) {
    return false;
  } else {
    return count(cards, diffCards, 0) === 4 || count(cards, diffCards, 1) === 4;
  }
};
export const isFullHouse = (cards: string): boolean => {
  const diffCards = new Set(cards);
  if (diffCards.size !== 2) {
    return false;
  } else {
    return count(cards, diffCards, 0) === 3 || count(cards, diffCards, 1) === 3;
  }
};

export const isThreeOfAKind = (cards: string): boolean => {
  const diffCards = new Set(cards);
  return (
    count(cards, diffCards, 0) === 3 ||
    count(cards, diffCards, 1) === 3 ||
    count(cards, diffCards, 2) === 3
  );
};

export const isTwoPair = (cards: string): boolean => {
  const diffCards = new Set(cards);
  return (
    (count(cards, diffCards, 0) === 2 && count(cards, diffCards, 1) === 2) ||
    (count(cards, diffCards, 0) === 2 && count(cards, diffCards, 2) === 2) ||
    (count(cards, diffCards, 1) === 2 && count(cards, diffCards, 2) === 2)
  );
};

export const isOnePair = (cards: string): boolean => {
  const diffCards = new Set(cards);
  return (
    count(cards, diffCards, 0) === 2 ||
    count(cards, diffCards, 1) === 2 ||
    count(cards, diffCards, 2) === 2 ||
    count(cards, diffCards, 3) === 2
  );
};

export const getHandScore = (hand: Hand): number => {
  const scoring = [
    isFiveOfAKind,
    isFourOfAKind,
    isFullHouse,
    isThreeOfAKind,
    isTwoPair,
    isOnePair,
    () => true,
  ];
  let result = 0;
  scoring.find((scoringFn, index) => {
    if (scoringFn(hand?.part2Cards || hand.cards)) {
      result = scoring.length - index;
      return true;
    }
    return false;
  });
  return result;
};

const cardOrder = 'AKQJT98765432';
const cardOrderPart2 = 'AKQT98765432J';

export const getCardScore = (card: string) =>
  cardOrder.length - cardOrder.indexOf(card);

export const getCardScorePart2 = (card: string) =>
  cardOrderPart2.length - cardOrderPart2.indexOf(card);

export const compareHands = (
  hand1: Hand,
  hand2: Hand,
  cardScoreFn: (card: string) => number = getCardScore,
) => {
  if (hand1.cards === hand2.cards) return 0;
  const handScore1 = getHandScore(hand1);
  const handScore2 = getHandScore(hand2);
  let score = handScore1 - handScore2;
  if (handScore1 === handScore2) {
    let scoreFound = false;
    hand1.cards.split('').forEach((_, cardIndex) => {
      const cardScore1 = cardScoreFn(hand1.cards[cardIndex]);
      const cardScore2 = cardScoreFn(hand2.cards[cardIndex]);
      if (!scoreFound && cardScore1 !== cardScore2) {
        score = cardScore1 - cardScore2;
        scoreFound = true;
      }
    });
  }
  return score;
};

export const part1 = (input: string[]): number => {
  const hands = getHands(input);
  const sortedHands = hands.sort(compareHands);

  return sortedHands.reduce(
    (result, hand, index) => (result += hand.bid * (index + 1)),
    0,
  );
};

export const findHighestScoreWithJokers = (cards: string): string => {
  const bid = 0;
  let bestCards = cards;
  let maxHandScore = getHandScore({ cards, bid });
  cardOrder.split('').forEach((c) => {
    const cardWithJokersReplaced = cards.replaceAll('J', c);
    const handScoreWithJokersReplaced = getHandScore({
      cards: cardWithJokersReplaced,
      bid,
    });
    if (handScoreWithJokersReplaced > maxHandScore) {
      bestCards = cardWithJokersReplaced;
      maxHandScore = handScoreWithJokersReplaced;
    }
  });
  return bestCards;
};

const fillHandsPart2 = (hands: Hand[]): Hand[] =>
  hands.map(({ cards, bid }) => ({
    cards,
    bid,
    part2Cards: findHighestScoreWithJokers(cards),
  }));

export const part2 = (input: string[]): number => {
  const hands = fillHandsPart2(getHands(input));
  const sortedHands = hands.sort((hand1, hand2) =>
    compareHands(hand1, hand2, getCardScorePart2),
  );

  return sortedHands.reduce(
    (result, hand, index) => (result += hand.bid * (index + 1)),
    0,
  );
};
