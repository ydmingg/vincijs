import type { BoardViewerFrameSnapshot, ViewScaleInfo, ViewSizeInfo } from '../../types';

export function getViewScaleInfoFromSnapshot(snapshot: BoardViewerFrameSnapshot) {
  const { activeStore } = snapshot;
  const sacelInfo: ViewScaleInfo = {
    scale: activeStore?.scale,
    offsetTop: activeStore?.offsetTop,
    offsetBottom: activeStore?.offsetBottom,
    offsetLeft: activeStore?.offsetLeft,
    offsetRight: activeStore?.offsetRight
  };
  return sacelInfo;
}

export function getViewSizeInfoFromSnapshot(snapshot: BoardViewerFrameSnapshot) {
  const { activeStore } = snapshot;
  const sacelInfo: ViewSizeInfo = {
    devicePixelRatio: activeStore.devicePixelRatio,
    width: activeStore?.width,
    height: activeStore?.height,
    background: activeStore?.background,
    contextWidth: activeStore?.contextWidth,
    contextHeight: activeStore?.contextHeight
  };
  return sacelInfo;
}
