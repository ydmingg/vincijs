import type { Element, RendererDrawElementOptions, ViewContext2D } from '../../types';
import { rotateElement, calcViewElementSize } from '../../tools';
import { drawBox, drawBoxShadow } from './box';

export function drawLine(ctx: ViewContext2D, elem: Element<'line'>, opts: RendererDrawElementOptions) {
  const { viewScaleInfo, viewSizeInfo, parentOpacity } = opts;
  const { x, y, w, h, angle } = calcViewElementSize(elem, { viewScaleInfo }) || elem;

  const viewElem = { ...elem, ...{ x, y, w, h, angle } };
  rotateElement(ctx, { x, y, w, h, angle }, () => {
    drawBoxShadow(ctx, viewElem, {
      viewScaleInfo,
      viewSizeInfo,
      renderContent: () => {
        drawBox(ctx, viewElem, {
          originElem: elem,
          calcElemSize: { x, y, w, h, angle },
          viewScaleInfo,
          viewSizeInfo,
          parentOpacity,
          renderContent: () => {
            // is
            console.log(viewElem);
            
          }
        });
      }
    });
  });
}
