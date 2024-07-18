import { Renderer } from '../render';
import {
  // throttle,
  calcElementsContextSize,
  EventEmitter
} from '../tools';
import type {
  Data,
  BoardOptions,
  BoardMiddleware,
  BoardMiddlewareObject,
  BoardWatcherEventMap,
  ViewSizeInfo,
  PointSize,
  BoardExtendEventMap,
  UtilEventEmitter,
  ModifyOptions
} from '../types';
import { Calculator } from './lib/calculator';
import { BoardWatcher } from './lib/watcher';
import { Sharer } from './lib/sharer';
import { Viewer } from './lib/viewer';

// const throttleTime = 10; // ms

interface BoardMiddlewareMapItem {
  status: 'enable' | 'disable';
  middlewareObject: BoardMiddlewareObject;
}

export class Board<T extends BoardExtendEventMap = BoardExtendEventMap> {
  #opts: BoardOptions;
  #middlewareMap: WeakMap<BoardMiddleware, BoardMiddlewareMapItem> = new WeakMap();
  #middlewares: BoardMiddleware[] = [];
  #activeMiddlewareObjs: BoardMiddlewareObject[] = [];
  #watcher: BoardWatcher;
  #renderer: Renderer;
  #sharer: Sharer;
  #viewer: Viewer;
  #calculator: Calculator;
  #eventHub: EventEmitter<T> = new EventEmitter<T>();
  #hasDestroyed: boolean = false;
  constructor(opts: BoardOptions) {
    const { boardContent } = opts;
    const sharer = new Sharer();
    const calculator = new Calculator({ viewContext: boardContent.viewContext });
    const watcher = new BoardWatcher({
      boardContent,
      sharer
    });
    const renderer = new Renderer({
      viewContext: boardContent.viewContext,
      sharer,
      calculator
    });

    this.#opts = opts;
    this.#sharer = sharer;
    this.#watcher = watcher;
    this.#renderer = renderer;
    this.#calculator = calculator;
    this.#viewer = new Viewer({
      boardContent: opts.boardContent,
      sharer,
      renderer,
      calculator: this.#calculator,
      beforeDrawFrame: (e) => {
        this.#handleBeforeDrawFrame(e);
      },
      afterDrawFrame: (e) => {
        this.#handleAfterDrawFrame(e);
      }
    });
    this.#init();
    this.#resetActiveMiddlewareObjs();
  }

  isDestroyed() {
    return this.#hasDestroyed;
  }

  destroy() {
    // #opts
    // #middlewareMap
    // #middlewares
    // #activeMiddlewareObjs
    this.#watcher.destroy();
    this.#renderer.destroy();
    // this.#sharer.destroy();
    // #viewer: Viewer;
    this.#calculator.destroy();
    this.#eventHub.destroy();
    this.#hasDestroyed = true;
  }

  #init() {
    this.#watcher.on('pointStart', this.#handlePointStart.bind(this));
    this.#watcher.on('pointEnd', this.#handlePointEnd.bind(this));
    this.#watcher.on('pointMove', this.#handlePointMove.bind(this));
    this.#watcher.on('hover', this.#handleHover.bind(this));
    this.#watcher.on('wheel', this.#handleWheel.bind(this));
    this.#watcher.on('wheelScale', this.#handleWheelScale.bind(this));
    this.#watcher.on('scrollX', this.#handleScrollX.bind(this));
    this.#watcher.on('scrollY', this.#handleScrollY.bind(this));
    this.#watcher.on('resize', this.#handleResize.bind(this));
    this.#watcher.on('doubleClick', this.#handleDoubleClick.bind(this));

    this.#renderer.on('load', () => {
      this.#eventHub.trigger('loadResource');
    });
  }

  #handlePointStart(e: BoardWatcherEventMap['pointStart']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.pointStart?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handlePointEnd(e: BoardWatcherEventMap['pointEnd']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.pointEnd?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handlePointMove(e: BoardWatcherEventMap['pointMove']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.pointMove?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleHover(e: BoardWatcherEventMap['hover']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.hover?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleDoubleClick(e: BoardWatcherEventMap['doubleClick']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.doubleClick?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleWheel(e: BoardWatcherEventMap['wheel']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.wheel?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleWheelScale(e: BoardWatcherEventMap['wheelScale']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.wheelScale?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleScrollX(e: BoardWatcherEventMap['scrollX']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.scrollX?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleScrollY(e: BoardWatcherEventMap['scrollY']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.scrollY?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleResize(e: BoardWatcherEventMap['resize']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.resize?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleClear(e: BoardWatcherEventMap['clear']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.clear?.(e);
      if (result === false) {
        return;
      }
    }
  }

  // draw event
  #handleBeforeDrawFrame(e: BoardWatcherEventMap['beforeDrawFrame']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.beforeDrawFrame?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #handleAfterDrawFrame(e: BoardWatcherEventMap['afterDrawFrame']) {
    for (let i = 0; i < this.#activeMiddlewareObjs.length; i++) {
      const obj = this.#activeMiddlewareObjs[i];
      const result = obj?.afterDrawFrame?.(e);
      if (result === false) {
        return;
      }
    }
  }

  #resetActiveMiddlewareObjs() {
    const activeMiddlewareObjs: BoardMiddlewareObject[] = [];
    const middlewareMap = this.#middlewareMap;
    this.#middlewares.forEach((middleware: BoardMiddleware) => {
      const item = middlewareMap.get(middleware);
      if (item?.status === 'enable' && item?.middlewareObject) {
        activeMiddlewareObjs.push(item.middlewareObject);
      }
    });
    this.#activeMiddlewareObjs = activeMiddlewareObjs;
  }

  getSharer() {
    return this.#sharer;
  }

  getViewer() {
    return this.#viewer;
  }

  getRenderer() {
    return this.#renderer;
  }

  setData(
    data: Data,
    opts?: {
      modifiedOptions?: ModifyOptions; // TODO
    }
  ): { viewSizeInfo: ViewSizeInfo } {
    const { modifiedOptions } = opts || {};
    const sharer = this.#sharer;
    this.#sharer.setActiveStorage('data', data);
    const viewSizeInfo = sharer.getActiveViewSizeInfo();
    const viewScaleInfo = sharer.getActiveViewScaleInfo();
    // const currentScaleInfo = sharer.getActiveViewScaleInfo();
    const newViewContextSize = calcElementsContextSize(data, {
      viewWidth: viewSizeInfo.width,
      viewHeight: viewSizeInfo.height,
      extend: true
    });
    
    if (modifiedOptions) {
      // TODO
      // this.#viewer.modifyViewVisibleInfoMap(data, {
      //   viewSizeInfo,
      //   viewScaleInfo,
      //   modifyOptions: modifiedOptions
      // });
      this.#viewer.resetViewVisibleInfoMap(data, {
        viewSizeInfo,
        viewScaleInfo
      });
    } else {
      this.#viewer.resetViewVisibleInfoMap(data, {
        viewSizeInfo,
        viewScaleInfo
      });
    }

    this.#viewer.drawFrame();
    const newViewSizeInfo = {
      ...viewSizeInfo,
      ...newViewContextSize
    };

    this.#sharer.setActiveViewSizeInfo(newViewSizeInfo);
    return { viewSizeInfo: newViewSizeInfo };
  }

  getData(): Data | null {
    const { data } = this.#sharer.getActiveStoreSnapshot();
    return data;
  }

  use(middleware: BoardMiddleware<any, any>) {
    if (this.#middlewareMap.has(middleware)) {
      const item = this.#middlewareMap.get(middleware);
      if (item) {
        item.middlewareObject.use?.();
        item.status = 'enable';
        this.#middlewareMap.set(middleware, item);
        this.#resetActiveMiddlewareObjs();
        return;
      }
    }
    const { boardContent, container } = this.#opts;
    const sharer = this.#sharer;
    const viewer = this.#viewer;
    const calculator = this.#calculator;
    const eventHub = this.#eventHub;

    const obj = middleware({ boardContent, sharer, viewer, calculator, eventHub: eventHub as UtilEventEmitter<any>, container });
    obj.use?.();
    this.#middlewares.push(middleware);
    this.#activeMiddlewareObjs.push(obj);

    this.#middlewareMap.set(middleware, {
      status: 'enable',
      middlewareObject: obj
    });
    this.#resetActiveMiddlewareObjs();
  }

  disuse(middleware: BoardMiddleware<any, any>) {
    const item = this.#middlewareMap.get(middleware);
    if (item) {
      item.middlewareObject.disuse?.();
      item.status = 'disable';
      this.#middlewareMap.set(middleware, item);
      this.#resetActiveMiddlewareObjs();
    }
  }

  scale(opts: { scale: number; point: PointSize; ignoreUpdateVisibleStatus?: boolean }) {
    const viewer = this.#viewer;
    const { ignoreUpdateVisibleStatus } = opts;
    const { moveX, moveY } = viewer.scale({
      ...opts,
      ...{
        ignoreUpdateVisibleStatus: true
      }
    });
    viewer.scroll({ moveX, moveY, ignoreUpdateVisibleStatus });
  }

  scroll(opts: { moveX: number; moveY: number; ignoreUpdateVisibleStatus?: boolean }) {
    const result = this.#viewer.scroll(opts);
    return result;
  }

  updateViewScaleInfo(opts: { scale: number; offsetX: number; offsetY: number }) {
    const result = this.#viewer.updateViewScaleInfo(opts);
    return result;
  }

  resize(newViewSize: ViewSizeInfo, opts?: { ignoreUpdateVisibleStatus?: boolean }) {
    const viewSize = this.#viewer.resize(newViewSize, opts);
    const { width, height, devicePixelRatio } = newViewSize;
    const { boardContent } = this.#opts;
    boardContent.viewContext.$resize({ width, height, devicePixelRatio });
    boardContent.helperContext.$resize({ width, height, devicePixelRatio });
    boardContent.boardContext.$resize({ width, height, devicePixelRatio });
    boardContent.underContext.$resize({ width, height, devicePixelRatio });
    this.#viewer.drawFrame();
    this.#watcher.trigger('resize', viewSize);
    this.#sharer.setActiveViewSizeInfo(newViewSize);
  }

  clear() {
    const { boardContent } = this.#opts;
    const { underContext, helperContext, viewContext, boardContext } = boardContent;
    underContext.clearRect(0, 0, underContext.canvas.width, underContext.canvas.height);
    helperContext.clearRect(0, 0, helperContext.canvas.width, helperContext.canvas.height);
    viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
    boardContext.clearRect(0, 0, boardContext.canvas.width, boardContext.canvas.height);
    this.#handleClear();
  }

  getEventHub(): EventEmitter<T> {
    return this.#eventHub;
  }

  onWatcherEvents() {
    this.#watcher.onEvents();
  }

  offWatcherEvents() {
    this.#watcher.offEvents();
  }
}

export { Sharer, Calculator };
