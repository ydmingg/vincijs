import { Render } from '../render';
import { BoardExtendEventMap,BoardMiddlewareObject,BoardWatcherEventMap,ViewSizeInfo } from "../types";
import { newElements } from "../konvajs";
import { Calculator } from './calculator';
import { Sharer } from './sharer';
import { BoardWatcher } from './watcher';
import { Viewer } from './viewer';


export class Board<T extends BoardExtendEventMap = BoardExtendEventMap>{ 
  OPTS
  SHARER
  WATCHER
  ACTIVEMIDDLEWAREOBJECT: BoardMiddlewareObject[] = [];
  RENDER: Render
  VIEWER
    
  constructor(opts) { 
    const { boardContent } = opts;
    // console.log(boardContent.viewContent);
    const sharer = new Sharer();
    
    const calculator = new Calculator({ viewContext: boardContent.viewContent });
    const watcher = new BoardWatcher({
      boardContent,
      sharer
    })
    const render = new Render({
      viewContext: boardContent.viewContext,
      sharer,
      calculator
    });


    
    this.OPTS = opts;
    this.SHARER = sharer;
    this.WATCHER = watcher
    this.RENDER = render;
    this.VIEWER = new Viewer({
      boardContent: opts.boardContent,
      sharer,
      render,
      
    });
    
    this.init();

      
  }

  init() {
      this.WATCHER.on('pointStart', this.#handlePointStart.bind(this));

  }

  #handlePointStart(e: BoardWatcherEventMap['pointStart']) {
      for (let i = 0; i < this.ACTIVEMIDDLEWAREOBJECT.length; i++) {
        const obj = this.ACTIVEMIDDLEWAREOBJECT[i];
        const result = obj?.pointStart?.(e);
        if (result === false) {
          return;
        }
      }
    }

  getSharer() { 
    return this.SHARER;
  }

  resize(newViewSize: ViewSizeInfo, opts?: { ignoreUpdateVisibleStatus?: boolean }) {
    const viewSize = this.VIEWER.resize(newViewSize, opts);
    // console.log(viewSize);
    
    const { width, height, devicePixelRatio } = newViewSize;
    // const { boardContent } = this.#opts;
    // boardContent.viewContext.$resize({ width, height, devicePixelRatio });
    // boardContent.helperContext.$resize({ width, height, devicePixelRatio });
    // boardContent.boardContext.$resize({ width, height, devicePixelRatio });
    // boardContent.underContext.$resize({ width, height, devicePixelRatio });
    // this.#viewer.drawFrame();
    // this.#watcher.trigger('resize', viewSize);
    // this.#sharer.setActiveViewSizeInfo(newViewSize);
  }

}