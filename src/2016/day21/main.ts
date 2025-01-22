import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day21';
export const testsPart1 = [
  {
    input: ['rotate right 1 step'],
    extraProps: 'abcde',
    result: 'eabcd',
  },
  {
    input: ['rotate right 2 steps'],
    extraProps: 'abcde',
    result: 'deabc',
  },
  {
    input: ['rotate left 1 step'],
    extraProps: 'abcde',
    result: 'bcdea',
  },
  {
    input: ['rotate left 2 steps'],
    extraProps: 'abcde',
    result: 'cdeab',
  },
  {
    input: ['rotate based on position of letter b'],
    extraProps: 'abdec',
    result: 'ecabd',
  },
  {
    input: ['move position 1 to position 4'],
    extraProps: 'bcdea',
    result: 'bdeac',
  },
  {
    input: ['move position 3 to position 0'],
    extraProps: 'bdeac',
    result: 'abdec',
  },
  {
    input: [
      'swap position 4 with position 0',
      'swap letter d with letter b',
      'reverse positions 0 through 4',
      'rotate left 1 step',
      'move position 1 to position 4',
      'move position 3 to position 0',
      'rotate based on position of letter b',
      'rotate based on position of letter d',
    ],
    extraProps: 'abcde',
    result: 'decab',
  },
];

export const testsPart2 = [
  {
    input: ['swap position 4 with position 0'],
    extraProps: 'ebcda',
    result: 'abcde',
  },
  {
    input: ['rotate right 1 step'],
    extraProps: 'eabcd',
    result: 'abcde',
  },
  {
    input: ['rotate right 2 steps'],
    extraProps: 'deabc',
    result: 'abcde',
  },
  {
    input: ['rotate left 1 step'],
    extraProps: 'bcdea',
    result: 'abcde',
  },
  {
    input: ['rotate left 2 steps'],
    extraProps: 'cdeab',
    result: 'abcde',
  },
  {
    input: ['rotate based on position of letter b'],
    extraProps: 'ecabd',
    result: 'abdec',
  },
  {
    input: ['move position 1 to position 4'],
    extraProps: 'bdeac',
    result: 'bcdea',
  },
  {
    input: ['move position 3 to position 0'],
    extraProps: 'abdec',
    result: 'bdeac',
  },
];

export const extraPropsPart1 = 'abcdefgh';
export const extraPropsPart2 = 'fbgdceah';
export const input = getInput(`src/${year}/${day}/input.txt`);

const swap = (pw: string[], x: number, y: number): string[] => {
  const swap = pw[y];
  pw[y] = pw[x];
  pw[x] = swap;
  return pw;
};

const rotateLeft = (pw: string[], x: number): string[] => [
  ...pw.slice(x),
  ...pw.slice(0, x),
];

const rotateRight = (pw: string[], x: number): string[] => [
  ...pw.slice(pw.length - x),
  ...pw.slice(0, pw.length - x),
];

const rotateRightBasedOnPosition = (pw: string[], a: string): string[] => {
  const x = pw.findIndex((c) => c === a);
  return rotateRight(pw, x + (x >= 4 ? 1 : 0) + 1);
};

const reverse = (pw: string[], x: number, y: number): string[] =>
  (pw = [
    ...pw.slice(0, x),
    ...pw.slice(x, y + 1).reverse(),
    ...pw.slice(y + 1),
  ]);

const move = (pw: string[], x: number, y: number): string[] => {
  const c = pw[x];
  pw.splice(x, 1);
  return [...pw.slice(0, y), c, ...pw.slice(y)];
};

const scramblePassword = (instructions: string[], password: string): string => {
  let pw = password.split('');
  instructions.forEach((ins) => {
    if (ins.startsWith('swap position')) {
      pw = swap(pw, parseInt(ins.split(' ')[2]), parseInt(ins.split(' ')[5]));
    } else if (ins.startsWith('swap letter')) {
      pw = swap(
        pw,
        pw.findIndex((c) => c === ins.split(' ')[2]),
        pw.findIndex((c) => c === ins.split(' ')[5]),
      );
    } else if (ins.startsWith('reverse')) {
      pw = reverse(
        pw,
        parseInt(ins.split(' ')[2]),
        parseInt(ins.split(' ')[4]),
      );
    } else if (ins.startsWith('rotate left')) {
      pw = rotateLeft(pw, parseInt(ins.split(' ')[2]));
    } else if (ins.startsWith('rotate right')) {
      pw = rotateRight(pw, parseInt(ins.split(' ')[2]));
    } else if (ins.startsWith('rotate based on position')) {
      pw = rotateRightBasedOnPosition(pw, ins.split(' ')[6]);
    } else if (ins.startsWith('move')) {
      const x = parseInt(ins.split(' ')[2]);
      const y = parseInt(ins.split(' ')[5]);
      pw = move(pw, x, y);
    }
  });
  return pw.join('');
};

const unscramblePassword = (
  instructions: string[],
  password: string,
): string => {
  let pw = password.split('');
  instructions.reverse().forEach((ins) => {
    if (ins.startsWith('swap position')) {
      pw = swap(pw, parseInt(ins.split(' ')[5]), parseInt(ins.split(' ')[2]));
    } else if (ins.startsWith('swap letter')) {
      pw = swap(
        pw,
        pw.findIndex((c) => c === ins.split(' ')[5]),
        pw.findIndex((c) => c === ins.split(' ')[2]),
      );
    } else if (ins.startsWith('reverse')) {
      pw = reverse(
        pw,
        parseInt(ins.split(' ')[2]),
        parseInt(ins.split(' ')[4]),
      );
    } else if (ins.startsWith('rotate left')) {
      pw = rotateRight(pw, parseInt(ins.split(' ')[2]));
    } else if (ins.startsWith('rotate right')) {
      pw = rotateLeft(pw, parseInt(ins.split(' ')[2]));
    } else if (ins.startsWith('rotate based on position')) {
      const a = ins.split(' ')[6];
      let newPw = pw.map((x) => x);
      while (pw.join('') !== rotateRightBasedOnPosition(newPw, a).join('')) {
        newPw = rotateRight(newPw, 1);
      }
      pw = [...newPw];
    } else if (ins.startsWith('move')) {
      const x = parseInt(ins.split(' ')[2]);
      const y = parseInt(ins.split(' ')[5]);
      pw = move(pw, y, x);
    }
  });
  return pw.join('');
};

export const part1 = (input: string[], password: string): string =>
  scramblePassword(input, password);

export const part2 = (input: string[], password: string): string =>
  unscramblePassword(input, password);
