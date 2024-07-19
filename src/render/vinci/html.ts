import type { Element, RendererDrawElementOptions, ViewContext2D } from '../../types';
import { rotateElement, calcViewElementSize } from '../../tools';
import { getOpacity } from './box';

export function drawHTML(ctx: ViewContext2D, elem: Element<'html'>, opts: RendererDrawElementOptions) {
  const content = opts.loader.getContent(elem);
  const { viewScaleInfo, parentOpacity } = opts;
  
  const { x, y, w, h, angle } = calcViewElementSize(elem, { viewScaleInfo }) || elem;
  rotateElement(ctx, { x, y, w, h, angle }, () => {
    if (!content && !opts.loader.isDestroyed()) {
      opts.loader.load(elem as Element<'html'>, opts.elementAssets || {});
    }
    if (elem.type === 'html' && content) {
      ctx.globalAlpha = getOpacity(elem) * parentOpacity;
      ctx.drawImage(content, x, y, w, h);
      ctx.globalAlpha = parentOpacity;
    }
  });
}