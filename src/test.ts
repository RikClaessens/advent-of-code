import { assertEquals } from '@std/assert';

const aocDay = Deno.args[0];

if (aocDay) {
  const { year, day, part1, part2, testsPart1, testsPart2, input } =
    await import(`./${aocDay}/main.ts`);

  type TestPart = {
    input: string[];
    result: number | string;
  };

  Deno.test(`${year} ${day} part 1`, () => {
    (testsPart1 as TestPart[]).forEach(({ input, result }) => {
      assertEquals(part1(input), result);
    });
  });

  Deno.test(`${year} ${day} part 2`, () => {
    (testsPart2 as TestPart[]).forEach(({ input, result }) => {
      assertEquals(part2(input), result);
    });
  });

  (() => {
    console.log(`🎅 ${year} ${day}`);
    console.log(`🎄 part 1: ` + part1(input));
    console.log(`⛄️ part 2: ` + part2(input));
  })();
}
