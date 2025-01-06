import { getInput, writeToFile } from '../../getInput.ts';

export const year = '2015';
export const day = 'day6';
export const testsPart1 = [];
export const testsPart2 = [];

export const input = getInput(`src/${year}/${day}/input.txt`);

const getInstructions = (input: string[]): [string, number[]][] =>
  input.map((line) => {
    const action = line.match(/(turn on|turn off|toggle)/);
    const ranges = line
      .match(/\d+,\d+/g)
      ?.map((range) => range.split(',').map(Number)) || [
      [0, 0],
      [0, 0],
    ];
    return [action?.[0] || '', ranges.flat()];
  });

export const part1 = (input: string[]): number => {
  const instructions = getInstructions(input);
  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0),
  );
  instructions.forEach(([action, [x1, y1, x2, y2]]) => {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (action) {
          case 'turn on':
            lights[x][y] = 1;
            break;
          case 'turn off':
            lights[x][y] = 0;
            break;
          case 'toggle':
            lights[x][y] = lights[x][y] === 1 ? 0 : 1;
            break;
        }
      }
    }
  });
  let numberOfLightsOn = 0;
  lights.forEach((row) => {
    row.forEach((light) => {
      if (light === 1) {
        numberOfLightsOn++;
      }
    });
  });
  return numberOfLightsOn;
};

export const part2 = (input: string[]): number => {
  const instructions = getInstructions(input);
  const lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0),
  );
  instructions.forEach(([action, [x1, y1, x2, y2]]) => {
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (action) {
          case 'turn on':
            lights[x][y] += 1;
            break;
          case 'turn off':
            lights[x][y] = Math.max(0, lights[x][y] - 1);
            break;
          case 'toggle':
            lights[x][y] += 2;
            break;
        }
      }
    }
  });
  let brightness = 0;
  lights.forEach((row) => {
    row.forEach((light) => {
      brightness += light;
    });
  });
  return brightness;
};
