import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day18';
export const testsPart1 = [{ input: '.^^.^.^^^^', extraProps: 10, result: 38 }];

export const testsPart2 = [];

export const extraPropsPart1 = 40;
export const extraPropsPart2 = 400000;
export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const getNextRow = (row: string) => {
  let nextRow = '';
  for (let i = 0; i < row.length; i++) {
    const tiles =
      (i > 0 ? row[i - 1] : '.') +
      row[i] +
      (i < row.length - 1 ? row[i + 1] : '.');
    nextRow += ['^^.', '.^^', '^..', '..^'].includes(tiles) ? '^' : '.';
  }
  return nextRow;
};

const getNumberOfSafteTiles = (
  firstRow: string,
  numberOfRows: number,
): number => {
  const tiles = [firstRow];
  while (tiles.length < numberOfRows) {
    tiles.push(getNextRow(tiles[tiles.length - 1]));
  }

  return tiles.reduce((acc, row) => acc + row.replaceAll('^', '').length, 0);
};

export const part1 = (input: string, numberOfRows: number): number =>
  getNumberOfSafteTiles(input, numberOfRows);

export const part2 = (input: string, numberOfRows: number): number =>
  getNumberOfSafteTiles(input, numberOfRows);
