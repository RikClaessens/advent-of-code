const aocDay = Deno.args[0];
const AOC_SESSION = Deno.env.get('AOC_SESSION');

if (!AOC_SESSION) {
  console.log();
  throw new Error('Please set the AOC_SESSION environment variable');
}
if (!aocDay) {
  throw new Error('Please provide a valid aocDay');
}
const year = aocDay.split('/')[0];
const day = aocDay.split('/')[1].substring(3);

const textResponse = await fetch(
  `https://adventofcode.com/${year}/day/${day}/input`,
  { headers: { Cookie: AOC_SESSION } },
);
const textData = await textResponse.text();
const outputFile = `src/${aocDay}/input.txt`;
const data = new TextEncoder().encode(textData);
Deno.writeFileSync(outputFile, data.slice(0, data.length - 1));
console.log(`🎄 Input written to ${outputFile}`);
