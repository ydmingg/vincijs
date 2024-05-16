import { BoardExtendEventMap } from "../types";
import { newElements } from "../konvajs";
import { Calculator } from './calculator';

export class Board<T extends BoardExtendEventMap = BoardExtendEventMap>{ 
    
    constructor(opts) { 
        const { boardContent } = opts;
        // console.log(boardContent.viewContent);
        
        
        const calculator = new Calculator({ viewContext: boardContent.viewContent });
        
        //
        // const stage = newElements.stage({
        //     container: opts,
        //     width
        // })
        
        
    }


}