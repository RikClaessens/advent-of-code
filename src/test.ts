import { assertEquals } from "@std/assert";

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
    const part1Start = performance.now();
    const resultPart1 = part1(input, extraPropsPart1);
    const part1End = performance.now();
    console.log(
      `🎄 part 1: ${resultPart1} (⌛ ${Number(part1End - part1Start).toFixed(6)} ms)`,
    );
    const part2Start = performance.now();
    const resultPart2 = part2(input, extraPropsPart2);
    const part2End = performance.now();
    console.log(
      `⛄️ part 2: ${resultPart2} (⌛ ${Number(part2End - part2Start).toFixed(6)} ms)`,
    );
  })();
}
