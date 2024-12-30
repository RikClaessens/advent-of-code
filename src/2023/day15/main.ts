import { getInput } from '../../getInput.ts';

export const year = '2023';
export const day = 'day15';
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 1320 },
];
export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 145 },
];
export const input = getInput(`src/${year}/${day}/input.txt`);

const hash = (input: string): number => {
  let result = 0;
  input.split('').forEach((char) => {
    result += char.charCodeAt(0);
    result *= 17;
    result %= 256;
  });
  return result;
};

export const part1 = (input: string[]): number => {
  const steps = input[0].split(',');
  let result = 0;
  steps.forEach((step) => {
    result += hash(step);
  });

  return result;
};

export const part2 = (input: string[]): number => {
  const steps = input[0].split(',');
  const boxes: [string, number][][] = new Array(256).fill(0).map((_) => []);
  steps.forEach((step) => {
    if (step.includes('-')) {
      const label = step.substring(0, step.length - 1);
      const box = hash(label);
      const lensToRemove = boxes[box].find((lens) => lens[0] === label);
      if (lensToRemove) {
        boxes[box].splice(boxes[box].indexOf(lensToRemove), 1);
      }
    } else {
      const label = step.split('=')[0];
      const box = hash(label);
      const focalLength = parseInt(step.split('=')[1]);
      const lensToReplace = boxes[box].find((lens) => lens[0] === label);
      if (lensToReplace) {
        lensToReplace[1] = focalLength;
      } else {
        boxes[box].push([label, focalLength]);
      }
    }
  });
  let result = 0;
  boxes.forEach((box, boxIndex) => {
    box.forEach((lens, lensIndex) => {
      result += (boxIndex + 1) * (lensIndex + 1) * lens[1];
    });
  });
  return result;
};
