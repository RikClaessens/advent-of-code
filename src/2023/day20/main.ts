import { instance } from '@viz-js/viz';
import { getInputAsString, writeToFile } from '../../getInput.ts';

export const year = '2023';
export const day = 'day20';
export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 32000000 },
  { input: getInputAsString(`src/${year}/${day}/test2.txt`), result: 11687500 },
];
export const testsPart2 = [];
export const input = getInputAsString(`src/${year}/${day}/input.txt`);

type Modules = { [key: string]: Module };
type Module = {
  type?: string;
  cables: string[];
  output?: number;
  input?: { [key: string]: number };
};

const getModules = (input: string[]): Modules => {
  const modules: Modules = {};
  input.forEach((line) => {
    let output = undefined;
    const [keyAndType, cables] = line.split(' -> ');
    const key =
      keyAndType.startsWith('%') || keyAndType.startsWith('&')
        ? keyAndType.slice(1)
        : keyAndType;
    const type =
      keyAndType.startsWith('%') || keyAndType.startsWith('&')
        ? keyAndType[0]
        : undefined;
    if (type === '%') {
      output = -1;
    }
    modules[key] = { type, cables: cables.split(', '), output };
  });
  Object.keys(modules).forEach((moduleKey) => {
    const module = modules[moduleKey];
    if (module.type === '&') {
      modules[moduleKey].input = {};
      Object.keys(modules).forEach((modKey) => {
        if (
          modKey !== moduleKey &&
          modules[moduleKey].input &&
          modules[modKey].cables.includes(moduleKey)
        ) {
          modules[moduleKey].input[modKey] = -1;
        }
      });
    }
  });
  modules['button'] = { cables: ['broadcaster'] };
  modules['output'] = { cables: [] };
  return modules;
};

const processModules = (
  modules: Modules,
  i: number = 0,
  pressed: { [key: string]: number } = {},
): [number, number] => {
  const queue: [string, number, string][] = [['button', -1, '']];
  let lowPulses = 0;
  let highPulses = 0;

  while (queue.length) {
    const [moduleKey, pulse, sourceModKey] = queue.shift()!;
    const module = modules[moduleKey];
    if (Object.keys(pressed).includes(moduleKey) && pulse === -1) {
      if (pressed[moduleKey] && pressed[moduleKey] < 10) {
        pressed[moduleKey] = i;
      }
      if (Object.values(pressed).every((value) => value !== -1)) {
        return [-1, -1];
      }
    }
    if (!module) {
      continue;
    }

    if (module.type === '%') {
      if (pulse === 1) {
        continue;
      } else if (pulse === -1 && module.output !== undefined) {
        const output = module.output * -1;
        module.output = output;
        if (output === -1) lowPulses += module.cables.length;
        else if (output === 1) highPulses += module.cables.length;

        module.cables.forEach((cable) => {
          queue.push([cable, output, moduleKey]);
        });
      }
    } else if (module.type === '&' && module.input) {
      Object.values(module.input).every((value) => value === 1);
      module.input[sourceModKey] = pulse;
      if (Object.values(module.input).every((value) => value === 1)) {
        lowPulses += module.cables.length;
        module.cables.forEach((cable) => {
          queue.push([cable, -1, moduleKey]);
        });
      } else {
        highPulses += module.cables.length;
        module.cables.forEach((cable) => {
          queue.push([cable, 1, moduleKey]);
        });
      }
    } else if (module.type === undefined) {
      module.output = pulse;
      if (pulse === -1) lowPulses += module.cables.length;
      else if (pulse === 1) highPulses += module.cables.length;
      module.cables.forEach((cable) => {
        queue.push([cable, pulse, moduleKey]);
      });
    }
  }
  return [lowPulses, highPulses];
};

export const part1 = (input: string): number => {
  const modules = getModules(input.split('\n'));
  let lowPulses = 0;
  let highPulses = 0;
  for (let i = 0; i < 1000; i++) {
    const [low, high] = processModules(modules);
    lowPulses += low;
    highPulses += high;
  }
  return lowPulses * highPulses;
};

const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

// rx is a node that gets a pulse from 1 single node
// that node gets a pulse from 4 inverter nodes
// the firstr button press that will make rx output a high pulse is when
// those 4 inverter nodes will output a high pulse
// this can be found through the least common multiple of the
// iterations in which the 4 inverter nodes output a high pulse
// check the graph.svg file to see the graph
export const part2 = (input: string): number => {
  instance().then((viz) => {
    let graph = input.replaceAll('%', '').replaceAll('&', '').split('\n');
    const broadcasterLine =
      graph.findIndex((line) => line.indexOf('broadcaster') >= 0) || 0;
    graph = [
      graph[broadcasterLine],
      ...graph.slice(0, broadcasterLine),
      ...graph.slice(broadcasterLine + 1),
    ];

    const svg = viz.render(`digraph { ${graph.join('\n')} }`, {
      format: 'svg',
    });
    svg.output && writeToFile(`src/${year}/${day}/graph.svg`, svg.output);
  });
  const modules = getModules(input.split('\n'));
  const nodeToRx = Object.entries(modules)
    .filter(([_, module]) => module.cables.includes('rx'))
    .map(([moduleKey]) => moduleKey)[0];
  const nodesToNodeToRx = Object.entries(modules)
    .filter(([_, module]) => module.cables.includes(nodeToRx))
    .map(([moduleKey]) => moduleKey);
  let i = 0;
  const pressed: { [key: string]: number } = {};
  nodesToNodeToRx.forEach((node) => {
    pressed[node] = -1;
  });
  while (true) {
    i++;
    const [low, high] = processModules(modules, i, pressed);
    if (low === -1 && high === -1) {
      break;
    }
  }

  return lcmAll(Object.values(pressed));
};
