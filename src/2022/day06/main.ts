import { getInputAsString } from '../../getInput.ts';

export const year = '2022';
export const day = 'day06';

enum Marker {
  START_OF_PACKAGE,
  START_OF_MESSAGE,
}

export const testsPart1 = [
  {
    input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    extraProps: Marker.START_OF_PACKAGE,
    result: 7,
  },
  {
    input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
    extraProps: Marker.START_OF_PACKAGE,
    result: 5,
  },
  {
    input: 'nppdvjthqldpwncqszvftbrmjlhg',
    extraProps: Marker.START_OF_PACKAGE,
    result: 6,
  },
  {
    input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    extraProps: Marker.START_OF_PACKAGE,
    result: 10,
  },
  {
    input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
    extraProps: Marker.START_OF_PACKAGE,
    result: 11,
  },
];
export const testsPart2 = [
  {
    input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    extraProps: Marker.START_OF_MESSAGE,
    result: 19,
  },
  {
    input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
    extraProps: Marker.START_OF_MESSAGE,
    result: 23,
  },
  {
    input: 'nppdvjthqldpwncqszvftbrmjlhg',
    extraProps: Marker.START_OF_MESSAGE,
    result: 23,
  },
  {
    input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    extraProps: Marker.START_OF_MESSAGE,
    result: 29,
  },
  {
    input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
    extraProps: Marker.START_OF_MESSAGE,
    result: 26,
  },
];

export const extraPropsPart1 = Marker.START_OF_PACKAGE;
export const extraPropsPart2 = Marker.START_OF_MESSAGE;

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const getMarker = (input: string, marker: Marker): number => {
  const lengthUnique = marker === Marker.START_OF_PACKAGE ? 4 : 14;
  for (let i = 0; i < input.length - lengthUnique; i += 1) {
    if (new Set(input.slice(i, i + lengthUnique)).size === lengthUnique) {
      return i + lengthUnique;
    }
  }
  return -1;
};

export const part1 = (input: string, marker: Marker): number =>
  getMarker(input, marker);

export const part2 = (input: string, marker: Marker): number =>
  getMarker(input, marker);
