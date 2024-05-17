import { EventEmitter } from '../tools';
import { Data, BoardRenderer, RendererEventMap } from '../types';
import { Loader } from './loader';

export class Render extends EventEmitter<RendererEventMap> implements BoardRenderer{ 
  OPTS
  LOADER: Loader = new Loader();
  HASDESTROYED: boolean = false;
  constructor(opts) { 
    super();
    this.OPTS = opts
    this.init();
      
  }
  init() { 
    const loader = this.LOADER;
    // loader.on('load', (e) => {
    //   this.trigger('load', e);
    // });

  }


  updateOptions(opts) {
      this.OPTS = opts;
  }

  drawData(data: Data, opts) {
      const loader = this.LOADER;
      const { calculator } = this.OPTS;
      const viewContext = this.OPTS.viewContext;
      viewContext.clearRect(0, 0, viewContext.canvas.width, viewContext.canvas.height);
      const parentElementSize = {
        x: 0,
        y: 0,
        w: opts.viewSizeInfo.width,
        h: opts.viewSizeInfo.height
      };
      // if (data.underlay) {
      //   drawUnderlay(viewContext, data.underlay, {
      //     loader,
      //     calculator,
      //     parentElementSize,
      //     parentOpacity: 1,
      //     ...opts
      //   });
      // }
      const drawOpts = {
        loader,
        calculator,
        parentElementSize,
      //   elementAssets: data.assets,
        parentOpacity: 1,
        ...opts
      };
      
  }
  
  scale(num: number) {
      const { sharer } = this.OPTS;
      if (!sharer) {
        // TODO
        return;
      }
      const { data, offsetTop, offsetBottom, offsetLeft, offsetRight, width, height, contextHeight, contextWidth, devicePixelRatio } =
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
            devicePixelRatio
          }
        });
      }
  }
  destroy() {
      // this.clear();
      this.OPTS = null as any;
  }
  isDestroyed() { 
      return this.HASDESTROYED;
  }
  getLoader(): Loader {
      return this.LOADER;
  }


}