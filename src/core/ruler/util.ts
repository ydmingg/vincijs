import type { DeepRulerSharedStorage } from './types';

// 标尺参数
const rulerData = {
    size: 16,
    background: '#FFFFFFA8',
    borderColor: '#00000080',
    scaleColor: '#000000',
    textColor: '#00000080',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 100,
    gridColor: '#AAAAAA20',
    gridKeyColor: '#AAAAAA40',
    lineSize: 1,
    selectedAreaColor: '#196097',
}

export function drawScrollerSelectedArea(opts: { snapshot: BoardViewerFrameSnapshot<DeepRulerSharedStorage>; calculator: ViewCalculator }) {
    const { snapshot, calculator } = opts;
    const { sharedStore } = snapshot;
    const selectedElementList = sharedStore[keySelectedElementList];
    const actionType = sharedStore[keyActionType];
  
    if (['select', 'drag', 'drag-list', 'drag-list-end'].includes(actionType as string) && selectedElementList.length > 0) {
      const viewScaleInfo = getViewScaleInfoFromSnapshot(snapshot);
      const viewSizeInfo = getViewSizeInfoFromSnapshot(snapshot);
      const rangeRectInfoList: ViewRectInfo[] = [];
      const xAreaStartList: number[] = [];
      const xAreaEndList: number[] = [];
      const yAreaStartList: number[] = [];
      const yAreaEndList: number[] = [];
      selectedElementList.forEach((elem: Element) => {
        const rectInfo = calculator.calcViewRectInfoFromRange(elem.uuid, {
          viewScaleInfo,
          viewSizeInfo
        });
        if (rectInfo) {
          rangeRectInfoList.push(rectInfo);
          xAreaStartList.push(rectInfo.left.x);
          xAreaEndList.push(rectInfo.right.x);
          yAreaStartList.push(rectInfo.top.y);
          yAreaEndList.push(rectInfo.bottom.y);
        }
      });
  
      if (!(rangeRectInfoList.length > 0)) {
        return;
      }
  
      const xAreaStart = Math.min(...xAreaStartList);
      const xAreaEnd = Math.max(...xAreaEndList);
      const yAreaStart = Math.min(...yAreaStartList);
      const yAreaEnd = Math.max(...yAreaEndList);
  
      ctx.globalAlpha = 1;
  
      ctx.beginPath();
      ctx.moveTo(xAreaStart, 0);
      ctx.lineTo(xAreaEnd, 0);
      ctx.lineTo(xAreaEnd, rulerSize);
      ctx.lineTo(xAreaStart, rulerSize);
      ctx.fillStyle = selectedAreaColor;
      ctx.closePath();
      ctx.fill();
  
      ctx.beginPath();
      ctx.moveTo(0, yAreaStart);
      ctx.lineTo(rulerSize, yAreaStart);
      ctx.lineTo(rulerSize, yAreaEnd);
      ctx.lineTo(0, yAreaEnd);
      ctx.fillStyle = selectedAreaColor;
      ctx.closePath();
      ctx.fill();
    }
}