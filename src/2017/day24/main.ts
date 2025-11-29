import { getInput } from "../../getInput.ts";

export const year = "2017";
export const day = "day24";
export const testsPart1 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 31 },
];

export const testsPart2 = [
  { input: getInput(`src/${year}/${day}/test.txt`), result: 19 },
];

export const input = getInput(`src/${year}/${day}/input.txt`);

type Port = [number, number];

const getPorts = (input: string[]): Port[] =>
  input.map((line) => [
    Number.parseInt(line.split("/")[0]),
    Number.parseInt(line.split("/")[1]),
  ]);

const getFirstPorts = (ports: Port[]): Port[] =>
  ports.filter((port) => port[0] === 0);

const removePortFromPorts = (port: Port, ports: Port[]) =>
  ports.filter((p) => p !== port);

const portFits = (bridge: Port[], port: Port) =>
  bridge[bridge.length - 1][1] === port[0];

const reversePort = (port: Port): Port => [port[1], port[0]];

const getBridgeStrength = (bridge: Port[]) =>
  bridge.reduce((sum, p) => (sum = sum + p[0] + p[1]), 0);

const buildStrongestBridge = (ports: Port[]): Record<number, number> => {
  let maxStrength: Record<number, number> = {};
  const firstPorts = getFirstPorts(ports);

  const buildBridge = (bridge: Port[], restPorts: Port[]) => {
    let foundPortThatFits = false;
    restPorts.forEach((p) => {
      if (portFits(bridge, p)) {
        foundPortThatFits = true;
        buildBridge([...bridge, p], removePortFromPorts(p, restPorts));
      } else if (portFits(bridge, reversePort(p))) {
        foundPortThatFits = true;
        buildBridge(
          [...bridge, reversePort(p)],
          removePortFromPorts(p, restPorts),
        );
      }
    });
    if (!foundPortThatFits) {
      const s = getBridgeStrength(bridge);
      maxStrength[bridge.length] = maxStrength[bridge.length]
        ? Math.max(s, maxStrength[bridge.length])
        : s;
    }
  };

  firstPorts.forEach((firstPort) => {
    buildBridge([firstPort], removePortFromPorts(firstPort, ports));
  });

  return maxStrength;
};

export const part1 = (input: string[]): number =>
  Object.values(buildStrongestBridge(getPorts(input))).reduce(
    (max, strength) => Math.max(max, strength),
    0,
  );

export const part2 = (input: string[]): number => {
  const strongestBridgesPerLength = buildStrongestBridge(getPorts(input));
  return strongestBridgesPerLength[
    Math.max(...Object.keys(strongestBridgesPerLength).map(Number))
  ];
};
