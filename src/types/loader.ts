import { Element } from "./element";
export type LoadElementType = 'image' | 'svg' | 'html';

export interface LoadItem {
    element: Element<LoadElementType>;
    status: 'null' | 'load' | 'error';
    content: LoadContent | null;
    startTime: number;
    endTime: number;
    error?: any;
    source: string | null;
}
  
export interface LoaderEvent extends LoadItem {
    countTime: number;
}
  
export interface LoaderEventMap {
    load: LoaderEvent;
    error: LoaderEvent;
}

export type LoadContent = HTMLImageElement | HTMLCanvasElement;