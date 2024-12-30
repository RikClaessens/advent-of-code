import { assertEquals } from '@std/assert';

const aocDay = Deno.args[0];

if (aocDay) {
  const {
    year,
    day,
    part1,
    part2,
    testsPart1,
    testsPart2,
    input,
    extraPropsPart1 = {},
    extraPropsPart2 = {},
  } = await import(`./${aocDay}/main.ts`);

  type TestPart = {
    input: string[];
    result: number | string;
    // deno-lint-ignore no-explicit-any
    extraProps?: Record<string, any>;
  };

  Deno.test(`${year} ${day} part 1`, () => {
    (testsPart1 as TestPart[]).forEach(({ input, result, extraProps = {} }) => {
      assertEquals(part1(input, extraProps), result);
    });
  });

  Deno.test(`${year} ${day} part 2`, () => {
    (testsPart2 as TestPart[]).forEach(({ input, result, extraProps = {} }) => {
      assertEquals(part2(input, extraProps), result);
    });
  });

  (() => {
    console.log(`🎅 ${year} ${day}`);
    console.log(`🎄 part 1: ` + part1(input, extraPropsPart1));
    console.log(`⛄️ part 2: ` + part2(input, extraPropsPart2));
  })();
}
