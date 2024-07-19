import type { ViewContext2D, Element, ViewScaleInfo, ViewSizeInfo, ViewCalculator, ViewRectInfo } from '../../../types';
import { drawLine, drawCrossByCenter } from './vinci-base';

interface ViewBoxInfo {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  midX: number;
  midY: number;
}

function getViewBoxInfo(rectInfo: ViewRectInfo): ViewBoxInfo {
  const boxInfo: ViewBoxInfo = {
    minX: rectInfo.topLeft.x,
    minY: rectInfo.topLeft.y,
    maxX: rectInfo.bottomRight.x,
    maxY: rectInfo.bottomRight.y,
    midX: rectInfo.center.x,
    midY: rectInfo.center.y
  };
  return boxInfo;
}