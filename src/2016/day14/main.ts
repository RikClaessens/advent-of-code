import { md5 } from '@takker/md5';
import { encodeHex } from '@std/encoding';
import { getInputAsString } from '../../getInput.ts';

export const year = '2016';
export const day = 'day14';
export const testsPart1 = [{ input: 'abc', result: 22728 }];

export const testsPart2 = [];

export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const getHash = (s: string, repeat: number) => {
  let hash = s;
  for (let i = 0; i < repeat; i++) {
    hash = encodeHex(md5(hash));
  }
  return hash;
};

const findNHashes = (input: string, n: number, repeatHash: number): number => {
  const hashes: number[] = [];
  let potentialHashes: [number, string][] = [];

  let i = 1;
  while (hashes.length < n) {
    const hash = getHash(`${input}${i}`, repeatHash);
    const triple = hash.match(/(.)\1\1/);
    const quintuplets = Array.from(hash.matchAll(/(.)\1\1\1\1/g)).map(
      (m) => m[0],
    );

    potentialHashes = potentialHashes.filter((ph) => ph[0] >= i - 1000);
    if (quintuplets.length > 0) {
      potentialHashes.forEach((ph) => {
        if (quintuplets.includes(ph[1]) && ph[0] >= i - 1000) {
          hashes.push(ph[0]);
          ph[0] = -Infinity;
        }
      });
    }

    if (triple) {
      potentialHashes.push([i, triple[1].repeat(5)]);
    }
    i++;
  }
  return hashes[n - 1];
};

export const part1 = (input: string): number => findNHashes(input, 64, 1);

export const part2 = (input: string): number => findNHashes(input, 64, 2017);
