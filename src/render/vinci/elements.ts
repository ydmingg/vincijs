import type { Data, RendererDrawElementOptions, ViewContext2D } from '../../types';
import { getDefaultElementDetailConfig } from '../../tools';
import { drawElement } from './group';

const defaultDetail = getDefaultElementDetailConfig();

export function drawElementList(ctx: ViewContext2D, data: Data, opts: RendererDrawElementOptions) {
  console.log(data);
  
  // const { elements = [] } = data;
  const { parentOpacity } = opts;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const elem = {
      ...element,
      ...{
        detail: {
          ...defaultDetail,
          ...element?.detail
        }
      }
    };
    if (opts.forceDrawAll !== true) {
      if (!opts.calculator?.needRender(elem)) {
        continue;
      }
    }

    try {
      drawElement(ctx, elem, {
        ...opts,
        ...{
          parentOpacity
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}
