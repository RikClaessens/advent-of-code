import { getInput } from '../../getInput.ts';

export const year = '2016';
export const day = 'day7';
export const testsPart1 = [
  { input: ['abba[mnop]qrst'], result: 1 },
  { input: ['abcd[bddb]xyyx'], result: 0 },
  { input: ['aaaa[qwer]tyui'], result: 0 },
  { input: ['ioxxoj[asdfgh]zxcvbn'], result: 1 },
  { input: ['c[d]abba[e]f'], result: 1 },
];

export const testsPart2 = [
  { input: ['aba[bab]xyz'], result: 1 },
  { input: ['xyx[xyx]xyx'], result: 0 },
  { input: ['aaa[kek]eke'], result: 1 },
  { input: ['zazbz[bzb]cdb'], result: 1 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type IP = {
  supernet: string[];
  hypernet: string[];
};

const parseIp = (ip: string): IP => {
  const supernet: string[] = [];
  const hypernet: string[] = [];
  let restIp = ip;
  let isSupernet = true;
  let index = 0;
  while (restIp) {
    let bracketIndex = isSupernet ? restIp.indexOf('[') : restIp.indexOf(']');
    bracketIndex = bracketIndex === -1 ? restIp.length : bracketIndex;
    if (isSupernet) {
      supernet.push(restIp.substring(0, bracketIndex));
    } else {
      hypernet.push(restIp.substring(0, bracketIndex));
    }
    isSupernet = !isSupernet;
    index = bracketIndex + 1;
    restIp = restIp.substring(index);
  }

  return { supernet, hypernet };
};

const abbaRegex = /(?=(.)(?!\1)(.)\2\1)/g;
const findABBA = (nets: string[]) =>
  nets
    .map((seq) => Array.from(seq.matchAll(abbaRegex)))
    .filter((abba) => abba.length > 0)
    .flat();

const abaRegex = /(?=(.)(?!\1)(.)\1)/g;
const findABA = (nets: string[]) =>
  nets
    .map((seq) => Array.from(seq.matchAll(abaRegex)))
    .filter((aba) => aba.length > 0)
    .flat();

const supportsTLS = (ip: IP): boolean =>
  findABBA(ip.supernet).length > 0 && findABBA(ip.hypernet).length === 0;

const supportsSSL = (ip: IP): boolean => {
  const supernetABAs = findABA(ip.supernet);
  const hypernetABAs = findABA(ip.hypernet);

  let matchingABAFound = false;
  supernetABAs.forEach((sABA) => {
    if (
      hypernetABAs.find((hABA) => sABA[1] === hABA[2] && sABA[2] === hABA[1])
    ) {
      matchingABAFound = true;
    }
  });

  return supernetABAs.length > 0 && matchingABAFound;
};

export const part1 = (input: string[]): number =>
  input.map(parseIp).filter(supportsTLS).length;

export const part2 = (input: string[]): number =>
  input.map(parseIp).filter(supportsSSL).length;
