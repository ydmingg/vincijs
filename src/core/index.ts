import type { CoreEventMap } from '../types';
import { Board } from "../board";
import { newBoardContent } from "../tools";

export class Core<E extends CoreEventMap = CoreEventMap> { 
    // BOARD: Board<E>;

    constructor(app:HTMLDivElement, opts:any) { 
        const { width, height } = opts
        const boardContent = newBoardContent(app, { width, height });
        // console.log(boardContent);
        
        
        const board = new Board({boardContent})

        // this.BOARD = board;
        
        

        
        

        
    }
}