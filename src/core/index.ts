import type { Data, PointSize, CoreOptions, BoardMiddleware, ViewSizeInfo, CoreEventMap, ViewScaleInfo, LoadItemMap, ModifyOptions } from '../types';
import { Board } from '../board';
import { createBoardContent, validateElements } from '../tools';
import { Cursor } from './lib/cursor';
export { eventChange } from './config';

// export { MiddlewareSelector } from './middleware/selector';
export { MiddlewareSelector, middlewareEventSelect, middlewareEventSelectClear, middlewareEventSelectInGroup } from './middleware/selector';
export { MiddlewareScroller } from './middleware/scroller';
export { MiddlewareScaler, middlewareEventScale } from './middleware/scaler';
export { MiddlewareRuler, middlewareEventRuler } from './middleware/ruler';
export { MiddlewareTextEditor, middlewareEventTextEdit, middlewareEventTextChange } from './middleware/text-editor';
export { MiddlewareDragger } from './middleware/dragger';
export { MiddlewareInfo } from './middleware/info';
// export { MiddlewareLayoutSelector } from './middleware/layout-selector';

export class Core<E extends CoreEventMap = CoreEventMap> {
  #board: Board<E>;
  // #opts: CoreOptions;
  #canvas: HTMLCanvasElement;
  #container: HTMLDivElement;

  constructor(container: HTMLDivElement, opts: CoreOptions) {
    const { devicePixelRatio = 1, width, height, background = "#f2f2f2", createCustomContext2D } = opts;

    // this.#opts = opts;
    this.#container = container;
    const canvas = document.createElement('canvas');
    this.#canvas = canvas;
    this.#initContainer();
    container.appendChild(canvas);

    const boardContent = createBoardContent(canvas, { width, height, background, devicePixelRatio, offscreen: true, createCustomContext2D });
    
    const board = new Board<E>({ boardContent, container });
    const sharer = board.getSharer();
    sharer.setActiveViewSizeInfo({
      width,
      height,
      background: background,
      devicePixelRatio,
      contextWidth: width,
      contextHeight: height
    });
    this.#board = board;
    this.resize(sharer.getActiveViewSizeInfo());
    const eventHub = board.getEventHub();
    new Cursor(container, {
      eventHub
    });
  }

  isDestroyed() {
    return this.#board.isDestroyed();
  }

  destroy() {
    this.#board.destroy();
    this.#canvas.remove();
  }

  #initContainer() {
    const container = this.#container;
    container.style.position = 'relative';
  }

  use(middleware: BoardMiddleware<any, any>) {
    this.#board.use(middleware);
  }

  disuse(middleware: BoardMiddleware<any, any>) {
    this.#board.disuse(middleware);
  }

  setData(
    data: Data,
    opts?: {
      modifiedOptions?: ModifyOptions;
    }
  ) {
    validateElements(data || []);
    this.#board.setData(data, opts);
    
  }

  getData(): Data | null {
    return this.#board.getData();
  }

  scale(opts: { scale: number; point: PointSize }) {
    this.#board.scale(opts);
    const viewer = this.#board.getViewer();
    viewer.drawFrame();
  }

  resize(newViewSize: Partial<ViewSizeInfo>) {
    const board = this.#board;
    const sharer = board.getSharer();
    const viewSizeInfo = sharer.getActiveViewSizeInfo();
    board.resize({
      ...viewSizeInfo,
      ...newViewSize
    });
  }

  clear() {
    this.#board.clear();
  }

  on<T extends keyof E>(name: T, callback: (e: E[T]) => void) {
    const eventHub = this.#board.getEventHub();
    eventHub.on(name, callback);
  }

  off<T extends keyof E>(name: T, callback: (e: E[T]) => void) {
    const eventHub = this.#board.getEventHub();
    eventHub.off(name, callback);
  }

  trigger<T extends keyof E>(name: T, e: E[T]) {
    const eventHub = this.#board.getEventHub();
    eventHub.trigger(name, e);
  }

  getViewInfo(): { viewSizeInfo: ViewSizeInfo; viewScaleInfo: ViewScaleInfo } {
    const board = this.#board;
    const sharer = board.getSharer();
    const viewSizeInfo = sharer.getActiveViewSizeInfo();
    const viewScaleInfo = sharer.getActiveViewScaleInfo();
    return {
      viewSizeInfo,
      viewScaleInfo
    };
  }

  refresh() {
    this.#board.getViewer().drawFrame();
  }

  setViewScale(opts: { scale: number; offsetX: number; offsetY: number }) {
    this.#board.updateViewScaleInfo(opts);
  }

  getLoadItemMap(): LoadItemMap {
    return this.#board.getRenderer().getLoadItemMap();
  }

  onBoardWatcherEvents() {
    this.#board.onWatcherEvents();
  }

  offBoardWatcherEvents() {
    this.#board.offWatcherEvents();
  }
}
