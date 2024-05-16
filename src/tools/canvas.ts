import { newElements } from '../konvajs';
import type { BoardContent } from '../types';


// createContext2D
export function createContext2D(opts) { 

}


export function newBoardContent(
    app: HTMLDivElement,
    opts: {
        width: number;
        height: number;
        devicePixelRatio?: number;
    }
): BoardContent { 
    const { width, height, devicePixelRatio = window.devicePixelRatio || 1 } = opts;
    const ctxOpts = {
        width,
        height,
    };
    
    // 创建舞台
    const stage = newElements.stage({
        container: app,
        width: width,
        height: height,
    })
    const layer = newElements.layer();
    // 将层放入舞台
    stage.add(layer)


    const lastContent = newElements.group(ctxOpts);
    const viewContent = newElements.group(ctxOpts);
    const boardContent = newElements.group(ctxOpts);

    const vinciView = () => { 
        // lastContent.clear();
        // viewContent.clear();
        // boardContent.clear();
    }

    // 将层加入舞台
    layer.add(lastContent, viewContent, boardContent);
    


    const content:BoardContent = {
        lastContent,
        viewContent,
        boardContent,
        vinciView,
    }
    
    return content;
}