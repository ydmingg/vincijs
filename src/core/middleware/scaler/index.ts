import type { BoardMiddleware, CoreEventMap } from '../../../types';
import { formatNumber } from '../../../tools';

export const middlewareEventScale = '@middleware/scale';

export const MiddlewareScaler: BoardMiddleware<Record<string, any>, CoreEventMap> = (opts) => {
  const { viewer, sharer, eventHub } = opts;
  const maxScale = 50;
  const minScale = 0.05;

  return {
    name: '@middleware/scaler',
    wheelScale(e) {
      const { deltaY, point } = e;
      const { scale } = sharer.getActiveViewScaleInfo();
      let newScaleNum = scale;
      if (deltaY < 0) {
        newScaleNum = scale * 1.1;
      } else if (deltaY > 0) {
        newScaleNum = scale * 0.9;
      }
      if (newScaleNum < minScale || newScaleNum > maxScale) return;

      const { moveX, moveY } = viewer.scale({ scale: newScaleNum, point });
      viewer.scroll({ moveX, moveY });
      viewer.drawFrame();
      const scaleNum = formatNumber(scale);
      eventHub.trigger(middlewareEventScale, { scale: scaleNum });
    }
  };
};