import open from 'open';

export const fetchInput = async () => {
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
};

export const initAoCDay = () => {
  const templatePath = 'src/template/dayxx/main.ts';

  const aocDay = Deno.args[0];

  if (!aocDay) {
    throw new Error('Please provide a valid aocDay');
  }
  Deno.mkdirSync(`src/${aocDay}`, {
    recursive: true,
  });

  const year = aocDay.split('/')[0];
  const day = aocDay.split('/')[1].substring(3);

  const decoder = new TextDecoder('utf-8');
  let template = decoder.decode(Deno.readFileSync(templatePath));
  template = template.replace('yyyy', year).replace('dd', day);

  const encoder = new TextEncoder();
  const encodedData = encoder.encode(template);
  Deno.writeFileSync(`src/${aocDay}/main.ts`, encodedData);
};

export const openBrowser = () => {
  const aocDay = Deno.args[0];

  if (!aocDay) {
    throw new Error('Please provide a valid aocDay');
  }
  const year = aocDay.split('/')[0];
  const day = aocDay.split('/')[1].substring(3);
  open(`https://adventofcode.com/${year}/day/${day}`);
};
