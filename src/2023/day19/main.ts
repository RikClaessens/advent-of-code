import { getInputAsString } from '../../getInput.ts';

export const year = '2023';
export const day = 'day19';
export const testsPart1 = [
  { input: getInputAsString(`src/${year}/${day}/test.txt`), result: 19114 },
];
export const testsPart2 = [
  {
    input: getInputAsString(`src/${year}/${day}/test.txt`),
    result: 167409079868000,
  },
];
export const input = getInputAsString(`src/${year}/${day}/input.txt`);

const getWorkflows = (input: string[]): { [key: string]: string[] } => {
  const workflows: { [key: string]: string[] } = {};
  input.forEach((line) => {
    workflows[line.split('{')[0]] = line.split('{')[1].split('}')[0].split(',');
  });
  return workflows;
};

const getParts = (input: string[]): number[][] => {
  return input.map((line) =>
    line
      .slice(1, -1)
      .split(',')
      .map((r) => parseInt(r.slice(2))),
  );
};

const xmas = { x: 0, m: 1, a: 2, s: 3 };

const runPartThroughWorkflows = (
  part: number[],
  workflows: { [key: string]: string[] },
): number[] => {
  let currentWorkflowName = 'in';

  while (currentWorkflowName) {
    const workflow = workflows[currentWorkflowName];
    if (currentWorkflowName === 'A') {
      return part;
    }
    if (currentWorkflowName === 'R') {
      return [0, 0, 0, 0];
    }
    for (let i = 0; i < workflow.length; i++) {
      const rule = workflow[i];
      if (rule === 'R') {
        return [0, 0, 0, 0];
      }
      if (rule === 'A') {
        return part;
      }
      const conditions = rule.split(':');
      if (conditions.length === 1) {
        currentWorkflowName = rule;
      } else {
        const ratingIndex = xmas[rule.slice(0, 1) as 'x' | 'm' | 'a' | 's'];
        const greatherThan = rule.slice(1, 2) === '>';
        const value = parseInt(rule.slice(2));
        const nextWorkflow = conditions[1];
        if (
          (greatherThan && part[ratingIndex] > value) ||
          (!greatherThan && part[ratingIndex] < value)
        ) {
          currentWorkflowName = nextWorkflow;
          break;
        }
      }
    }
  }

  return part;
};

let acceptedRanges: number[][][] = [];

const runPartRangeThroughWorkflows = (
  ratings: number[][],
  workflows: { [key: string]: string[] },
  workflowName: string,
): void => {
  const workflow = workflows[workflowName];
  if (workflowName === 'A') {
    acceptedRanges.push(ratings);
    return;
  }
  if (workflowName === 'R') {
    return;
  }
  for (let i = 0; i < workflow.length; i++) {
    const rule = workflow[i];
    if (rule === 'R') {
      return;
    }
    if (rule === 'A') {
      acceptedRanges.push(ratings);
      return;
    }
    const conditions = rule.split(':');
    if (conditions.length === 1) {
      runPartRangeThroughWorkflows(ratings, workflows, rule);
    } else {
      const ratingIndex = xmas[rule.slice(0, 1) as 'x' | 'm' | 'a' | 's'];
      const greatherThan = rule.slice(1, 2) === '>';
      const value = parseInt(rule.slice(2));
      const nextWorkflow = conditions[1];

      if (greatherThan) {
        if (ratings[ratingIndex][1] > value) {
          const ratingsClone = JSON.parse(
            JSON.stringify(ratings),
          ) as number[][];
          ratingsClone[ratingIndex][0] = Math.max(
            ratings[ratingIndex][0],
            value + 1,
          );
          ratingsClone[ratingIndex][1] = Math.max(
            ratings[ratingIndex][1],
            value + 1,
          );
          runPartRangeThroughWorkflows(ratingsClone, workflows, nextWorkflow);
        }
        if (ratings[ratingIndex][0] < value) {
          ratings[ratingIndex][1] = Math.min(ratings[ratingIndex][1], value);
        }
      } else {
        if (ratings[ratingIndex][0] < value) {
          const ratingsClone = JSON.parse(
            JSON.stringify(ratings),
          ) as number[][];
          ratingsClone[ratingIndex][0] = Math.min(
            ratings[ratingIndex][0],
            value - 1,
          );
          ratingsClone[ratingIndex][1] = Math.min(
            ratings[ratingIndex][1],
            value - 1,
          );
          runPartRangeThroughWorkflows(ratingsClone, workflows, nextWorkflow);
        }
        if (ratings[ratingIndex][1] > value) {
          ratings[ratingIndex][0] = Math.max(ratings[ratingIndex][0], value);
        }
      }
    }
  }
};

export const part1 = (input: string): number => {
  const workflows = getWorkflows(input.split('\n\n')[0].split('\n'));
  const parts = getParts(input.split('\n\n')[1].split('\n'));
  return parts.reduce(
    (acc, part) =>
      acc + runPartThroughWorkflows(part, workflows).reduce((a, b) => a + b, 0),
    0,
  );
};

export const part2 = (input: string): number => {
  const workflows = getWorkflows(input.split('\n\n')[0].split('\n'));
  acceptedRanges = [];
  const maxRatings = [
    [1, 4000],
    [1, 4000],
    [1, 4000],
    [1, 4000],
  ];
  runPartRangeThroughWorkflows(maxRatings, workflows, 'in');
  return acceptedRanges.reduce(
    (acc, range) =>
      acc + range.reduce((acc2, part) => acc2 * (part[1] - part[0] + 1), 1),
    0,
  );
};
