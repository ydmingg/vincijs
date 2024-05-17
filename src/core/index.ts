import type { CoreEventMap,ViewSizeInfo } from '../types';
import { Board } from "../board";
import { newBoardContent } from "../tools";

export { MiddlewareRuler, middlewareEventRuler } from './ruler';



export class Core<E extends CoreEventMap = CoreEventMap> { 
    BOARD: Board<E>;

    constructor(app:HTMLDivElement, opts:any) { 
        const { width, height } = opts
        const boardContent = newBoardContent(app, { width, height });
        
        const board = new Board<E>({ boardContent })

        const sharer = board.getSharer();
        
        sharer.setActiveViewSizeInfo({
            width,
            height,
            contextWidth: width,
            contextHeight: height
        });

        this.BOARD = board;

        this.resize(sharer.setActiveViewSizeInfo())
        
    }

    resize(newViewSize: Partial<ViewSizeInfo>) {
        const board = this.BOARD;
        const sharer = board.getSharer();
        const viewSizeInfo = sharer.getActiveViewSizeInfo();
        board.resize({
          ...viewSizeInfo,
          ...newViewSize
        });
    }
}