import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day9';
export const testsPart1 = [
  { input: 'ADVENT', result: 'ADVENT'.length },
  { input: 'A(1x5)BC', result: 'ABBBBBC'.length },
  { input: 'AAA(1x5)BC', result: 'AAABBBBBC'.length },
  { input: '(3x3)XYZ', result: 'XYZXYZXYZ'.length },
  { input: 'A(2x2)BCD(2x2)EFG', result: 'ABCBCDEFEFG'.length },
  { input: '(6x1)(1x3)A', result: '(1x3)A'.length },
  { input: 'X(8x2)(3x3)ABCY', result: 'X(3x3)ABC(3x3)ABCY'.length },
];

export const testsPart2 = [
  { input: '(3x3)XYZ', result: 'XYZXYZXYZ'.length },
  { input: 'X(8x2)(3x3)ABCY', result: 'XABCABCABCABCABCABCY'.length },
  { input: '(27x12)(20x12)(13x14)(7x10)(1x12)A', result: 241920 },
  {
    input: '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN',
    result: 445,
  },
];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const decompress = (input: string, recursive: boolean = false): number => {
  let i = 0;
  let decompressed = 0;
  while (i < input.length) {
    const marker = input.substring(i).match(/\((\d+)x(\d+)\)/);
    if (!marker) {
      decompressed += input.substring(i).length;
      i = input.length;
    } else if (marker && marker.index !== undefined) {
      const endOfMarker = i + marker[0].length + marker.index;
      decompressed += input.substring(i, i + marker.index).length;
      const part = input.substring(
        endOfMarker,
        endOfMarker + parseInt(marker[1]),
      );
      if (recursive) {
        decompressed += decompress(part, recursive) * parseInt(marker[2]);
      } else {
        decompressed += part.length * parseInt(marker[2]);
      }
      i += marker.index + marker[0].length + parseInt(marker[1]);
    }
  }
  return decompressed;
};
export const part1 = (input: string): number => decompress(input);

export const part2 = (input: string): number => decompress(input, true);
