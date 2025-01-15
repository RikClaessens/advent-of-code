import { getInput, writeToFile } from '../../getInput.ts';

export const year = '2016';
export const day = 'day8';
export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { w: 7, h: 3 },
    result: 6,
  },
];
export const testsPart2 = [];

export const extraPropsPart1 = { w: 50, h: 6 };
export const extraPropsPart2 = { w: 50, h: 6 };
export const input = getInput(`src/${year}/${day}/input.txt`);

const runInstructions = (input: string[], w: number, h: number): string[][] => {
  let pixels = Array(h).fill(Array(w).fill('.'));

  input.forEach((ins) => {
    // copy pixels
    const newPixels = pixels.map((row) => [...row]);
    if (ins.startsWith('rect')) {
      const [a, b] = (ins.match(/rect (\d+)x(\d+)/) as string[])
        .slice(1, 3)
        .map((n) => parseInt(n));

      for (let i = 0; i < b; i++) {
        for (let j = 0; j < a; j++) {
          newPixels[i][j] = '#';
        }
      }
    }
    if (ins.startsWith('rotate row')) {
      const [a, b] = (ins.match(/rotate row y=(\d+) by (\d+)/) as string[])
        .slice(1, 3)
        .map((n) => parseInt(n));

      for (let i = 0; i < w; i++) {
        newPixels[a][(i + b) % w] = pixels[a][i];
      }
    }
    if (ins.startsWith('rotate column')) {
      const [a, b] = (ins.match(/rotate column x=(\d+) by (\d+)/) as string[])
        .slice(1, 3)
        .map((n) => parseInt(n));

      for (let i = 0; i < h; i++) {
        newPixels[(i + b) % h][a] = pixels[i][a];
      }
    }

    pixels = newPixels.map((row) => [...row]);
    // console.log(pixels.map((r) => r.join('')).join('\n') + '\n\n');
  });
  return pixels;
};

export const part1 = (
  input: string[],
  { w, h }: { w: number; h: number },
): number =>
  runInstructions(input, w, h)
    .map((r) => r.join(''))
    .join('')
    .replaceAll('.', '').length;

export const part2 = (
  input: string[],
  { w, h }: { w: number; h: number },
): number => {
  const pixels = runInstructions(input, w, h);

  let print = '';
  for (let y = 0; y < h; y++) {
    for (let j = 0; j < 6; j++) {
      for (let x = 0; x < w; x++) {
        for (let i = 0; i < 5; i++) {
          print += pixels[y][x];
        }
      }
      print += '\n';
    }
  }
  writeToFile(`src/${year}/${day}/output.txt`, print);
  return 0;
};
