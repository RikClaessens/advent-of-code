import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day2';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: '1985' },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: '5DB3' },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

const normalKeypad = ['123', '456', '789'];
const fancyKeypad = ['..1..', '.234.', '56789', '.ABC.', '..D..'];

const moves = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
} as const;

const findCode = (steps: string[], keypad: string[]): string => {
  let y = keypad.findIndex((k) => k.includes('5'));
  let x = keypad[y].split('').findIndex((k) => k === '5');
  let code = '';

  steps.forEach((s) => {
    s.split('').forEach((i) => {
      const newX = x + moves[i as keyof typeof moves][0];
      const newY = y + moves[i as keyof typeof moves][1];
      if (
        newX >= 0 &&
        newX < keypad[0].length &&
        newY >= 0 &&
        newY < keypad.length &&
        keypad[newY][newX] !== '.'
      ) {
        x = newX;
        y = newY;
      }
    });
    code += keypad[y][x];
  });

  return code;
};

export const part1 = (input: string[]): string => findCode(input, normalKeypad);

export const part2 = (input: string[]): string => findCode(input, fancyKeypad);
