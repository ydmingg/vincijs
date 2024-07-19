import type { SVGPathCommand, ElementSize } from '../../types';

const cmdReg = /([astvzqmhlc])([^astvzqmhlc]*)/gi;
// const numReg = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;
const numReg = /(-?\d+(?:\.\d+)?)/gi;

export function parseSVGPath(path: string): SVGPathCommand[] {
  const commands: SVGPathCommand[] = [];
  path.replace(cmdReg, (match: string, cmd: string, paramStr: string) => {
    const matchParams = paramStr.match(numReg);
    const params = matchParams ? matchParams.map(Number) : [];
    const command: SVGPathCommand = {
      type: cmd,
      params
    } as unknown as SVGPathCommand;
    commands.push(command);
    return match;
  });
  return commands;
}

export function generateSVGPath(commands: SVGPathCommand[]): string {
  let path: string = '';
  commands.forEach((item) => {
    path += item.type + item.params.join(' ');
  });
  return path;
}

type FilterSVGPathResult = ElementSize & { detail: { commands: SVGPathCommand[] } };
export function filterSVGPath(commands: SVGPathCommand[]): FilterSVGPathResult {
  const filteredCommands: SVGPathCommand[] = [];
  // TODO
  const result: FilterSVGPathResult = {
    x: 0,
    y: 0,
    h: 0,
    w: 0,
    detail: {
      commands: filteredCommands
    }
  };

  return result;
}
