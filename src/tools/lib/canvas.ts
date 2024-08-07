import type { BoardContent, ViewContext2D } from '../../types';
import { Context2D } from './context2d';

export function createContext2D(opts: { ctx?: CanvasRenderingContext2D; width: number; height: number; devicePixelRatio: number }): Context2D {
  const { width, height, ctx, devicePixelRatio } = opts;
  let context: CanvasRenderingContext2D | undefined = ctx;
  if (!context) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    context = canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  const context2d = new Context2D(context, opts);
  return context2d;
}

export function createOffscreenContext2D(opts: { width: number; height: number; devicePixelRatio: number }): Context2D {
  const { width, height, devicePixelRatio } = opts;
  const offCanvas = new OffscreenCanvas(width * devicePixelRatio, height * devicePixelRatio);
  const offRenderCtx = offCanvas.getContext('2d') as OffscreenRenderingContext;
  const offCtx: CanvasRenderingContext2D | OffscreenRenderingContext = offRenderCtx.canvas.getContext('2d') as
    | CanvasRenderingContext2D
    | OffscreenRenderingContext;
  const context2d = new Context2D(offCtx, {
    devicePixelRatio,
    offscreenCanvas: offCanvas
  });
  return context2d;
}

export function createBoardContent(
  canvas: HTMLCanvasElement,
  opts: {
    width: number;
    height: number;
    background: string;
    devicePixelRatio: number;
    offscreen?: boolean;
    createCustomContext2D?: (opts: { width: number; height: number; background: string; devicePixelRatio: number }) => ViewContext2D;
  }
): BoardContent {
  const { width, height, background, devicePixelRatio, offscreen, createCustomContext2D } = opts;
  const ctxOpts = {
    width,
    height,
    background,
    devicePixelRatio
  };

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  if (createCustomContext2D) {
    // TODO
    const viewContext = createCustomContext2D(ctxOpts);
    const overlayContext = createCustomContext2D(ctxOpts);
    const underlayContext = createCustomContext2D(ctxOpts);
    const boardContext = createContext2D({ ctx, ...ctxOpts });

    const drawView = () => {
      const { width: w, height: h } = viewContext.$getSize();

      boardContext.clearRect(0, 0, w, h);
      boardContext.drawImage(underlayContext.canvas, 0, 0, w, h);
      boardContext.drawImage(viewContext.canvas, 0, 0, w, h);
      boardContext.drawImage(overlayContext.canvas, 0, 0, w, h);
      underlayContext.clearRect(0, 0, w, h);
      viewContext.clearRect(0, 0, w, h);
      overlayContext.clearRect(0, 0, w, h);
    };

    const content: BoardContent = {
      underlayContext,
      viewContext,
      overlayContext,
      boardContext,
      drawView
    };
    return content;
  }

  if (offscreen === true) {
    const viewContext = createOffscreenContext2D(ctxOpts);
    const overlayContext = createOffscreenContext2D(ctxOpts);
    const underlayContext = createOffscreenContext2D(ctxOpts);
    const boardContext = createContext2D({ ctx, ...ctxOpts });

    const drawView = () => {
      const { width: w, height: h } = viewContext.$getSize();

      boardContext.clearRect(0, 0, w, h);
      boardContext.drawImage(underlayContext.canvas, 0, 0, w, h);
      boardContext.drawImage(viewContext.canvas, 0, 0, w, h);
      boardContext.drawImage(overlayContext.canvas, 0, 0, w, h);
      underlayContext.clearRect(0, 0, w, h);
      viewContext.clearRect(0, 0, w, h);
      overlayContext.clearRect(0, 0, w, h);
    };

    const content: BoardContent = {
      underlayContext,
      viewContext,
      overlayContext,
      boardContext,
      drawView
    };
    return content;
  } else {
    const viewContext = createContext2D(ctxOpts);
    const overlayContext = createContext2D(ctxOpts);
    const underlayContext = createContext2D(ctxOpts);
    const boardContext = createContext2D({ ctx, ...ctxOpts });

    const drawView = () => {
      boardContext.clearRect(0, 0, width, height);
      boardContext.drawImage(underlayContext.canvas, 0, 0, width, height);
      boardContext.drawImage(viewContext.canvas, 0, 0, width, height);
      boardContext.drawImage(overlayContext.canvas, 0, 0, width, height);
      underlayContext.clearRect(0, 0, width, height);
      viewContext.clearRect(0, 0, width, height);
      overlayContext.clearRect(0, 0, width, height);
    };

    const content: BoardContent = {
      underlayContext,
      viewContext,
      overlayContext,
      boardContext,
      drawView
    };
    
    return content;
  }
}
