import { getInput } from '../../getInput.ts';

export const year = '2015';
export const day = 'day19';
export const testsPart1 = [
  {
    input: [...getInput(`src/${year}/${day}/test.txt`), '', 'HOH'],
    result: 4,
  },
  {
    input: [...getInput(`src/${year}/${day}/test.txt`), '', 'HOHOHO'],
    result: 7,
  },
  {
    input: [...getInput(`src/${year}/${day}/test.txt`), '', 'HOHOHO'],
    result: 7,
  },
];

export const testsPart2 = [
  // {
  //   input: [...getInput(`src/${year}/${day}/test2.txt`), '', 'HOH'],
  //   result: 3,
  // },
  // {
  //   input: [...getInput(`src/${year}/${day}/test2.txt`), '', 'HOHOHO'],
  //   result: 6,
  // },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

export const part1 = (input: string[]): number => {
  const replacements = input.slice(0, -2).map((i) => i.split(' => '));
  const molecule = input[input.length - 1];
  const newMolecules = new Set<string>();
  replacements.forEach(([from, to]) => {
    const matches = molecule.matchAll(new RegExp(from, 'g'));
    matches.forEach((match) => {
      newMolecules.add(
        molecule.substring(0, match.index) +
          molecule.substring(match.index).replace(from, to),
      );
    });
  });

  return newMolecules.size;
};

const findMolecule = (
  molecule: string,
  targetMolecule: string,
  replacements: [string, string][],
  noOfReplacements: number,
): void => {
  if (molecule === targetMolecule) {
    minNoOfReplacements = Math.min(noOfReplacements);
    return;
  }
  if (molecule.length > targetMolecule.length) {
    return;
  }

  replacements.forEach(([from, to]) => {
    const matches = molecule.matchAll(new RegExp(from, 'g'));
    matches.forEach((match) => {
      findMolecule(
        molecule.substring(0, match.index) +
          molecule.substring(match.index).replace(from, to),
        targetMolecule,
        replacements,
        noOfReplacements + 1,
      );
    });
  });
};

let minNoOfReplacements = Infinity;
export const part2 = (input: string[]): number => {
  const molecule = input[input.length - 1];

  const countStr = (molecule: string, replacement: string): number =>
    molecule.split(replacement).length - 1;

  return (
    molecule.split('').filter((c) => c.toUpperCase() === c).length -
    countStr(molecule, 'Rn') -
    countStr(molecule, 'Ar') -
    2 * countStr(molecule, 'Y') -
    1
  );
};
