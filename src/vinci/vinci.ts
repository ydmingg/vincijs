import { Core, middlewareEventSelectInGroup, middlewareEventSnapToGrid } from '../core';
import type {
  PointSize,
  VinciOptions,
  VinciSettings,
  VinciFeature,
  VinciMode,
  Data,
  ViewSizeInfo,
  ViewScaleInfo,
  ElementType,
  Element,
  RecursivePartial,
  ElementPosition,
  VinciStorage
} from '../types';
import type { VinciEvent } from './event';
import {
  createElement,
  insertElementToListByPosition,
  updateElementInList,
  deleteElementInList,
  moveElementPosition,
  getElementPositionFromList,
  calcElementListSize,
  // filterCompactData,
  calcViewCenterContent,
  calcViewCenter,
  Store
} from '../tools';
import { defaultSettings, getDefaultStorage, defaultMode, parseStyles } from './config';
import { exportImageFileBlobURL } from './file';
import type { ExportImageFileBaseOptions, ExportImageFileResult } from './file';
import { eventKeys } from './event';
import { changeMode, runMiddlewares } from './mode';

export class Vinci {
  #core: Core<VinciEvent>;
  #opts: VinciOptions;
  #store: Store<VinciStorage> = new Store<VinciStorage>({
    defaultStorage: getDefaultStorage()
  });

  constructor(mount: HTMLDivElement, BoardWidth:number, BoardHeight:number) {
    const boardStyles: VinciOptions = {width:BoardWidth, height:BoardHeight}
    const opts = { ...defaultSettings, ...boardStyles };
    const { width, height, devicePixelRatio, createCustomContext2D } = opts;
    const core = new Core<VinciEvent>(mount, { width, height, devicePixelRatio, createCustomContext2D });
    this.#core = core;
    this.#opts = opts;
    this.#init();
  }

  #init() {
    const core = this.#core;
    const store = this.#store;
    changeMode('select', core, store);
  }

  #setFeature(feat: VinciFeature, status: boolean) {
    const store = this.#store;
    // 检测数组中是否包含某个元素
    if (['ruler', 'scroll', 'scale', 'info'].includes(feat)) {
      // 设置一个通用类型Record，设置键的类型为(VinciFeature(联合类型) | string)，获取VinciStorage中除了mode以外的所有值
      const map: Record<VinciFeature | string, keyof Omit<VinciStorage, 'mode'>> = {
        ruler: 'enableRuler',
        scroll: 'enableScroll',
        scale: 'enableScale',
        info: 'enableInfo'
      };      
      
      store.set(map[feat], !!status);
      runMiddlewares(this.#core, store);
      this.#core.refresh();
    } else if (feat === 'selectInGroup') {
      this.#core.trigger(middlewareEventSelectInGroup, {
        enable: !!status
      });
    } else if (feat === 'snapToGrid') {
      this.#core.trigger(middlewareEventSnapToGrid, {
        enable: !!status
      });
    }
  }

  reset(opts: VinciSettings) {
    const core = this.#core;
    const store = this.#store;
    store.clear();
    changeMode(opts.mode || defaultMode, core, store);
    core.refresh();
    this.#opts = {
      ...this.#opts,
      ...opts
    };
  }

  setMode(mode: VinciMode) {
    const core = this.#core;
    const store = this.#store;
    changeMode(mode || defaultMode, core, store);
    core.refresh();
  }

  enable(feat: VinciFeature) {
    this.#setFeature(feat, true);
  }

  disable(feat: VinciFeature) {
    this.#setFeature(feat, false);
  }

  setData(data: Data) {
    const core = this.#core;
    core.setData(data);
    core.trigger(eventKeys.change, { data, type: 'setData' });
  }

  getData(opts?: { compact?: boolean }): Data | null {
    const data = this.#core.getData();
    // if (data && opts?.compact === true) {
    //   return filterCompactData(data, {
    //     loadItemMap: this.#core.getLoadItemMap()
    //   });
    // }
    return data;
  }

  getViewInfo(): {
    viewSizeInfo: ViewSizeInfo;
    viewScaleInfo: ViewScaleInfo;
  } {
    return this.#core.getViewInfo();
  }

  scale(opts: { scale: number; point: PointSize }) {
    this.#core.scale(opts);
  }

  setViewScale(opts: { scale: number; offsetX: number; offsetY: number }) {
    const core = this.#core;
    core.setViewScale(opts);
    core.refresh();
  }

  centerContent(opts?: { data?: Data }) {
    const data = opts?.data || this.#core.getData();
    const { viewSizeInfo } = this.getViewInfo();
    if ((Array.isArray(data) && data.length > 0)) {
      const result = calcViewCenterContent(data, { viewSizeInfo });
      this.setViewScale(result);
    }
  }

  resize(opts: Partial<ViewSizeInfo>) {
    this.#core.resize(opts);
  }

  on<T extends keyof VinciEvent>(name: T, callback: (e: VinciEvent[T]) => void) {
    this.#core.on(name, callback);
  }

  off<T extends keyof VinciEvent>(name: T, callback: (e: VinciEvent[T]) => void) {
    this.#core.off(name, callback);
  }

  trigger<T extends keyof VinciEvent>(name: T, e?: VinciEvent[T]) {
    this.#core.trigger(name, e);
  }

  selectElement(id: string) {
    this.selectElements([id]);
  }

  selectElements(ids: string[]) {
    this.trigger(eventKeys.select, { ids });
  }

  selectElementByPosition(position: ElementPosition) {
    this.selectElementsByPositions([position]);
  }

  selectElementsByPositions(positions: ElementPosition[]) {
    this.trigger(eventKeys.select, { positions });
  }



  zIndex(id: string, position: "top" | "bottom" | "up" | "down") {
    const core = this.#core;
    let data: Data = core.getData() || [];
    const currentIndex = data.findIndex(element => element.id === id);
    
    if (currentIndex === -1) return; 
    
    let newIndex: number;
    switch (position) {
      case "top":
        newIndex = data.length - 1;
        break;
      case "bottom":
        newIndex = 0;
        break;
      case "up":
        newIndex = Math.min(data.length - 1, currentIndex + 1);
        break;
      case "down":
        newIndex = Math.max(0, currentIndex - 1);
        break;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      const [element] = data.splice(currentIndex, 1);
      data.splice(newIndex, 0, element);

      core.setData(data);
      core.refresh();
      core.trigger(eventKeys.change, { data, type: 'moveElement' });
    }
  }

  visibility(id: string, states: boolean ) { 
    const core = this.#core;
    let data: Data = core.getData() || [];

    const elementIndex = data.findIndex(element => element.id === id);

    if (elementIndex === -1) return; 

    if (!data[elementIndex].operations) {
      data[elementIndex].operations = {};
    }

    data[elementIndex].operations!.invisible = !states;

    core.setData(data);
    core.refresh();
    core.trigger(eventKeys.change, { data, type: 'updateElement' });
  }

  cancelElements() {
    this.trigger(eventKeys.select, { ids: [] });
  }

  createElement<T extends ElementType>(
    type: T,
    opts?: {
      element?: RecursivePartial<Element<T>>;
      viewCenter?: boolean;
    }
  ): Element<T> {
    const { viewScaleInfo, viewSizeInfo } = this.#core.getViewInfo();
    return createElement<T>(
      type,
      opts?.element || {},
      opts?.viewCenter === true
        ? {
            viewScaleInfo,
            viewSizeInfo
          }
        : undefined
    );
  }

  updateElement(element: Element) {
    const core = this.#core;
    const data: Data = core.getData() || [];
    updateElementInList(element.id, element, data);
    core.setData(data);
    core.refresh();
    core.trigger(eventKeys.change, { data, type: 'updateElement' });
  }

  addElement(
    element: Element,
    opts?: {
      position: ElementPosition;
    }
  ): Data {
    const core = this.#core;
    const data: Data = core.getData() || [];
    if (!opts || !opts?.position?.length) {
      data.push(element);
    } else if (opts?.position) {
      const position = [...opts?.position];
      insertElementToListByPosition(element, position, data);
    }
    core.setData(data);
    core.refresh();
    core.trigger(eventKeys.change, { data, type: 'addElement' });
    return data;
  }

  deleteElement(id: string) {
    const core = this.#core;
    const data: Data = core.getData() || [];
    deleteElementInList(id, data);
    core.setData(data);
    core.refresh();
    core.trigger(eventKeys.change, { data, type: 'deleteElement' });
  }

  moveElement(id: string, to: ElementPosition) {
    const core = this.#core;
    let data: Data = core.getData() || [];
    const from = getElementPositionFromList(id, data);
    const list = moveElementPosition(data, { from, to });
    data = list.elements;
    core.setData(data);
    core.refresh();
    core.trigger(eventKeys.change, { data, type: 'moveElement' });
  }

  async getImageBlobURL(opts: ExportImageFileBaseOptions): Promise<ExportImageFileResult> {
    const data = this.getData() || [];
    const { devicePixelRatio } = opts;

    const outputSize = calcElementListSize(data);
    const { viewSizeInfo } = this.getViewInfo();
    return await exportImageFileBlobURL({
      width: outputSize.w,
      height: outputSize.h,
      devicePixelRatio,
      data,
      viewScaleInfo: { scale: 1, offsetLeft: -outputSize.x, offsetTop: -outputSize.y, offsetBottom: 0, offsetRight: 0 },
      viewSizeInfo: {
        ...viewSizeInfo,
        ...{ devicePixelRatio }
      },
      loadItemMap: this.#core.getLoadItemMap()
    });
  }

  isDestroyed() {
    return this.#core.isDestroyed();
  }

  destroy() {
    const core = this.#core;
    const store = this.#store;
    core.destroy();
    store.destroy();
  }

  getViewCenter() {
    const { viewScaleInfo, viewSizeInfo } = this.getViewInfo();
    const pointSize: PointSize = calcViewCenter({ viewScaleInfo, viewSizeInfo });
    return pointSize;
  }

  $onBoardWatcherEvents() {
    this.#core.onBoardWatcherEvents();
  }

  $offBoardWatcherEvents() {
    this.#core.offBoardWatcherEvents();
  }
}
