import { EventEmitter } from '../tools';
import type {
  LoadItemMap,
  Data,
  BoardRenderer,
  RendererOptions,
  RendererEventMap,
  RendererDrawOptions
} from '../types';
import { drawElementList, drawGlobalBackground } from './vinci/index';
import { Loader } from './loader';

export class Renderer extends EventEmitter<RendererEventMap> implements BoardRenderer {
  #opts: RendererOptions;
  #loader: Loader = new Loader();
  #hasDestroyed: boolean = false;

  constructor(opts: RendererOptions) {
    super();
    this.#opts = opts;
    this.#init();
  }

  isDestroyed() {
    return this.#hasDestroyed;
  }

  destroy() {
    this.clear();
    this.#opts = null as any;
    this.#loader.destroy();
    this.#loader = null as any;
    this.#hasDestroyed = true;
  }

  #init() {
    const loader = this.#loader;
    loader.on('load', (e) => {
      this.trigger('load', e);
    });
    loader.on('error', (e) => {
      console.error(e);
    });
  }

  updateOptions(opts: RendererOptions) {
    this.#opts = opts;
  }

  drawData(data: Data, opts: RendererDrawOptions) {
    const loader = this.#loader;
    const { calculator, sharer } = this.#opts;
    const viewContext = this.#opts.viewContext;
    viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
    const parentElementSize = {
      x: 0,
      y: 0,
      w: opts.viewSizeInfo.width,
      h: opts.viewSizeInfo.height
    };
    
    const drawOpts = {
      loader,
      calculator,
      parentElementSize,
      parentOpacity: 1,
      // overrideElementMap: sharer?.getActiveOverrideElemenentMap(),
      ...opts
    };

    // drawGlobalBackground(viewContext, data.global, drawOpts);
    drawElementList(viewContext, data, drawOpts);
  }

  scale(num: number) {
    const { sharer } = this.#opts;
    if (!sharer) {
      // TODO
      return;
    }
    const { data, offsetTop, offsetBottom, offsetLeft, offsetRight, width, height, contextHeight, contextWidth,background, devicePixelRatio } =
      sharer.getActiveStoreSnapshot();
    if (data) {
      this.drawData(data, {
        viewScaleInfo: {
          scale: num,
          offsetTop,
          offsetBottom,
          offsetLeft,
          offsetRight
        },
        viewSizeInfo: {
          width,
          height,
          contextHeight,
          contextWidth,
          background,
          devicePixelRatio
        }
      });
    }
  }

  setLoadItemMap(itemMap: LoadItemMap) {
    this.#loader.setLoadItemMap(itemMap);
  }

  getLoadItemMap(): LoadItemMap {
    return this.#loader.getLoadItemMap();
  }

  getLoader(): Loader {
    return this.#loader;
  }
}

export { drawRect } from './vinci';
