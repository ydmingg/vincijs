import type { BoardMiddleware, CoreEventMap, MiddlewareRulerConfig } from '../../../types';
import { getViewScaleInfoFromSnapshot, getViewSizeInfoFromSnapshot } from '../../../tools';
import { drawRulerBackground, drawXRuler, drawYRuler, calcXRulerScaleList, calcYRulerScaleList, drawGrid, drawScrollerSelectedArea } from './tools';
import type { DeepRulerSharedStorage } from './types';
import { defaultStyle } from './config';

export const middlewareEventRuler = '@middleware/show-ruler';

export const MiddlewareRuler: BoardMiddleware<DeepRulerSharedStorage, CoreEventMap, MiddlewareRulerConfig> = (opts, config) => {
  const { boardContent, viewer, eventHub, calculator } = opts;
  const { overlayContext, underlayContext } = boardContent;
  const innerConfig = {
    ...defaultStyle,
    ...config
  };
  const { background, borderColor, scaleColor, textColor, gridColor, gridPrimaryColor, selectedAreaColor } = innerConfig;
  const style = {
    background,
    borderColor,
    scaleColor,
    textColor,
    gridColor,
    gridPrimaryColor,
    selectedAreaColor
  };

  let show: boolean = true;
  let showGrid: boolean = true;

  const rulerCallback = (e: { show: boolean; showGrid: boolean }) => {
    if (typeof e?.show === 'boolean') {
      show = e.show;
    }
    if (typeof e?.showGrid === 'boolean') {
      showGrid = e.showGrid;
    }

    if (typeof e?.show === 'boolean' || typeof e?.showGrid === 'boolean') {
      viewer.drawFrame();
    }
  };

  return {
    name: '@middleware/ruler',
    use() {
      eventHub.on(middlewareEventRuler, rulerCallback);
    },
    disuse() {
      eventHub.off(middlewareEventRuler, rulerCallback);
    },
    beforeDrawFrame: ({ snapshot }) => {
      if (show === true) {
        const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
        const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);

        drawScrollerSelectedArea(overlayContext, { snapshot, calculator, style });

        drawRulerBackground(overlayContext, { viewScaleInfo, viewSizeInfo, style });

        const { list: xList, rulerUnit } = calcXRulerScaleList({ viewScaleInfo, viewSizeInfo });
        drawXRuler(overlayContext, { scaleList: xList, style });

        const { list: yList } = calcYRulerScaleList({ viewScaleInfo, viewSizeInfo });
        drawYRuler(overlayContext, { scaleList: yList, style });

        if (showGrid === true) {
          const ctx = rulerUnit === 1 ? overlayContext : underlayContext;
          drawGrid(ctx, {
            xList,
            yList,
            viewScaleInfo,
            viewSizeInfo,
            style
          });
        }
      }
    }
  };
};
