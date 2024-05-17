

export interface ElementSize {
    x: number;
    y: number;
    w: number;
    h: number;
    angle?: number;
}
export interface ElementAssetsItem {
    type: 'svg' | 'image' | 'html';
    value: string;
}
  
export interface ElementAssets {
    [assetId: string]: ElementAssetsItem;
}

  
export interface ElementBaseDetail {
    boxSizing?: 'content-box' | 'border-box' | 'center-line'; // default center-line
    borderWidth?: number | [number, number, number, number]; // [top, right, bottom, left]
    borderColor?: string;
    borderRadius?: number | [number, number, number, number]; // [top-left, top-right, bottom-left, bottom-right]
    borderDash?: number[];
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
    // background?: string | LinearGradientColor | RadialGradientColor;
    // opacity?: number;
    // clipPath?: ElementClipPath;
}
export interface ElementRectDetail extends ElementBaseDetail {}
  
export interface ElementTextDetail extends ElementBaseDetail {
    text: string;
    color?: string;
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: 'bold' | string | number;
    fontFamily?: string;
    textAlign?: 'center' | 'left' | 'right';
    verticalAlign?: 'middle' | 'top' | 'bottom';
    textShadowColor?: string;
    textShadowOffsetX?: number;
    textShadowOffsetY?: number;
    textShadowBlur?: number;
}
  
export interface ElementCircleDetail extends ElementBaseDetail {
    radius: number;
    background?: string;
}
  
  
export interface ElementHTMLDetail extends ElementBaseDetail {
    html: string;
    originW?: number;
    originH?: number;
}
  
export interface ElementImageDetail extends ElementBaseDetail {
    src: string;
}
  
export interface ElementSVGDetail extends ElementBaseDetail {
    svg: string;
}
export interface ElementGroupDetail extends ElementBaseDetail {
    children: Element<ElementType>[];
    overflow?: 'hidden' | 'visible';
    assets?: ElementAssets;
}
export type SVGPathCommandType = 'M' | 'm' | 'L' | 'l' | 'H' | 'h' | 'V' | 'v' | 'C' | 'c' | 'S' | 's' | 'Q' | 'q' | 'T' | 't' | 'A' | 'a' | 'Z' | 'z';

export interface SVGPathCommand {
  type: SVGPathCommandType;
  params: number[];
}

export interface ElementPathDetail extends ElementBaseDetail {
    // path: string;
    commands: SVGPathCommand[];
    originX: number;
    originY: number;
    originW: number;
    originH: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeLineCap?: 'butt' | 'round' | 'square';
}
  

export interface ElementDetailMap {
    rect: ElementRectDetail;
    circle: ElementCircleDetail;
    text: ElementTextDetail;
    image: ElementImageDetail;
    html: ElementHTMLDetail;
    svg: ElementSVGDetail;
    group: ElementGroupDetail;
    path: ElementPathDetail;
}

export interface ElementOperations {
    lock?: boolean;
    invisible?: boolean;
    disableScale?: boolean;
    disableRotate?: boolean;
    limitRatio?: boolean;
    lastModified?: number;
    deepResize?: boolean;
}

export type ElementType = keyof ElementDetailMap;

export interface Element<T extends ElementType = ElementType, E extends Record<string, any> = Record<string, any>> extends ElementSize {
    uuid: string;
    name?: string;
    type: T;
    detail: ElementDetailMap[T];
    operations?: ElementOperations;
    extends?: E;
}

export type ElementPosition = number[];