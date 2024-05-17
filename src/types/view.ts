import Konva from "konva";
import type { Element, ElementType } from './element';
import type { Point,PointSize } from './point';
import type { Data } from './data';
import type { ModifyOptions } from './modify';


export interface ViewScaleInfo {
    scale: number;
    offsetTop: number;
    offsetBottom: number;
    offsetLeft: number;
    offsetRight: number;
}

export interface ViewContextSize {
    contextWidth: number;
    contextHeight: number;
}
  
export interface ViewSizeInfo extends ViewContextSize {
    width: number;
    height: number;
    devicePixelRatio: number;
}

export interface BoardContent { 
    lastContent: Konva.Group;
    viewContent: Konva.Group;
    // helperContent: Konva.Group;
    boardContent: Konva.Group;
    vinciView: () => void;
}
export type ViewRectInfo = {
    topLeft: PointSize;
    topRight: PointSize;
    bottomRight: PointSize;
    bottomLeft: PointSize;
    top: PointSize;
    right: PointSize;
    bottom: PointSize;
    left: PointSize;
    center: PointSize;
};
  
export interface ViewCalculator {
    /**
     * @deprecated
     */
    isPointInElement(p: Point, elem: Element<ElementType>, viewScaleInfo: ViewScaleInfo, viewSize: ViewSizeInfo): boolean;
    needRender(elem: Element<ElementType>): boolean;
    getPointElement(
      p: Point,
      opts: { data: Data; viewScaleInfo: ViewScaleInfo; viewSizeInfo: ViewSizeInfo; groupQueue?: Element<'group'>[] }
    ): { index: number; element: null | Element<ElementType>; groupQueueIndex: number };
    resetViewVisibleInfoMap(
      data: Data,
      opts: {
        viewScaleInfo: ViewScaleInfo;
        viewSizeInfo: ViewSizeInfo;
      }
    ): void;
    updateVisiableStatus(opts: { viewScaleInfo: ViewScaleInfo; viewSizeInfo: ViewSizeInfo }): void;
    calcViewRectInfoFromOrigin(
      uuid: string,
      opts: {
        checkVisible?: boolean;
        viewScaleInfo: ViewScaleInfo;
        viewSizeInfo: ViewSizeInfo;
      }
    ): ViewRectInfo | null;
    calcViewRectInfoFromRange(
      uuid: string,
      opts: {
        checkVisible?: boolean;
        viewScaleInfo: ViewScaleInfo;
        viewSizeInfo: ViewSizeInfo;
      }
    ): ViewRectInfo | null;
    modifyViewVisibleInfoMap(
      data: Data,
      opts: {
        modifyOptions: ModifyOptions;
        viewScaleInfo: ViewScaleInfo;
        viewSizeInfo: ViewSizeInfo;
      }
    ): void;
  
    toGridNum(num: number, opts?: { ignore?: boolean }): number;
}