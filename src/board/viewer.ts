import { EventEmitter } from '../tools';
import { BoardViewer,BoardViewerEventMap,BoardViewerOptions, PointSize, ViewScaleInfo, ViewSizeInfo } from '../types';

export class Viewer extends EventEmitter<BoardViewerEventMap> implements BoardViewer { 
    OPTS: BoardViewerOptions;
    constructor(opts) { 
        super();
        this.OPTS = opts
        console.log(opts);
        
        

    }
    drawFrame(): void {
        throw new Error('Method not implemented.');
    }
    scale(opts: { scale: number; point: PointSize; ignoreUpdateVisibleStatus?: boolean | undefined; }): { moveX: number; moveY: number; } {
        throw new Error('Method not implemented.');
    }
    scroll(opts: { moveX?: number | undefined; moveY?: number | undefined; ignoreUpdateVisibleStatus?: boolean | undefined; }): ViewScaleInfo {
        throw new Error('Method not implemented.');
    }
    resize(viewSize: Partial<ViewSizeInfo>, opts?: { ignoreUpdateVisibleStatus?: boolean | undefined; } | undefined): ViewSizeInfo {
        throw new Error('Method not implemented.');
    }
    updateViewScaleInfo(opts: { scale: number; offsetX: number; offsetY: number; }): ViewScaleInfo {
        throw new Error('Method not implemented.');
    }
    off<K extends 'drawFrame'>(eventKey: K, callback: (e: BoardViewerEventMap[K]) => void): void {
        throw new Error('Method not implemented.');
    }
    trigger<K extends 'drawFrame'>(eventKey: K, e: BoardViewerEventMap[K]): void {
        throw new Error('Method not implemented.');
    }
    has<K extends 'drawFrame'>(name: string | K): boolean {
        throw new Error('Method not implemented.');
    }
}