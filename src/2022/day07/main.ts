import { getInput } from '../../getInput.ts';

export const year = '2022';
export const day = 'day07';

export const testsPart1 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: 100000,
    result: 95437,
  },
];
export const testsPart2 = [
  {
    input: getInput(`src/${year}/${day}/test.txt`),
    extraProps: { totalDiskSize: 70000000, wantedFreeSpace: 30000000 },
    result: 24933642,
  },
];

export const extraPropsPart1 = 100000;

export const extraPropsPart2 = {
  totalDiskSize: 70000000,
  wantedFreeSpace: 30000000,
};

export const input = getInput(`src/${year}/${day}/input.txt`);

type Dirs = {
  [key: string]: {
    dirs: string[];
    size: number;
  };
};

const getDirs = (input: string[]) => {
  const dirs: Dirs = {};
  const currentPath: string[] = [];

  let i = 0;
  while (i < input.length) {
    const line = input[i].split(' ');
    if (line[0].startsWith('$')) {
      // command
      const command = line[1];
      const argument = line[2];
      if (command === 'cd') {
        if (argument === '..') {
          const pop = currentPath.pop();
          if (pop && currentPath.length > 0) {
            dirs[currentPath.join('/')].size +=
              dirs[[...currentPath, pop].join('/')].size;
          }
        } else {
          currentPath.push(argument);
        }
      }
    } else {
      do {
        const lsOutput = input[i].split(' ');
        const fileOrDir = {
          name: lsOutput[1],
          isDir: lsOutput[0] === 'dir',
          size: Number.parseInt(lsOutput[0]),
        };
        if (!dirs[currentPath.join('/')]) {
          dirs[currentPath.join('/')] = {
            dirs: [],
            size: 0,
          };
        }
        if (fileOrDir.isDir) {
          dirs[currentPath.join('/')].dirs.push(fileOrDir.name);
        } else {
          dirs[currentPath.join('/')].size += fileOrDir.size;
        }
        i += 1;
      } while (i < input.length && !input[i].startsWith('$'));
      i -= 1;
    }
    i += 1;
  }

  // pop and calculcate sizes up to root
  while (currentPath.length > 0) {
    const pop = currentPath.pop();
    if (pop && currentPath.length >= 1) {
      dirs[currentPath.join('/')].size +=
        dirs[[...currentPath, pop].join('/')].size;
    }
  }
  return dirs;
};

const getSumOfDirsOfSize = (input: string[], maxDirSize: number) => {
  const dirs = getDirs(input);
  const result = Object.keys(dirs)
    .filter((key) => dirs[key].size <= maxDirSize)
    .reduce((total: number, key: string) => {
      return total + dirs[key].size;
    }, 0);
  return result;
};

const getDirToDelete = (
  input: string[],
  totalDiskSize: number,
  wantedFreeSpace: number,
) => {
  const dirs = getDirs(input);
  const needToCleanUp = wantedFreeSpace - (totalDiskSize - dirs['/'].size);
  const result = Object.keys(dirs)
    .filter((key) => dirs[key].size >= needToCleanUp)
    .reduce((min: number, key: string) => {
      return Math.min(min, dirs[key].size);
    }, Number.MAX_VALUE);
  return result;
};

export const part1 = (input: string[], maxDirSize: number) =>
  getSumOfDirsOfSize(input, maxDirSize);

export const part2 = (
  input: string[],
  {
    totalDiskSize,
    wantedFreeSpace,
  }: { totalDiskSize: number; wantedFreeSpace: number },
) => getDirToDelete(input, totalDiskSize, wantedFreeSpace);
