import type {
  Data,
  Element,
  Elements,
  ElementType,
  ElementSize,
  ViewContextSize,
  ViewSizeInfo,
  ElementAssets,
  ElementAssetsItem,
  LoadElementType,
  ElementPosition
} from '../../types';
import { rotateElementVertexes } from './rotate';
import { isAssetId, createAssetId } from './id';

function getGroupids(elements: Array<Element<ElementType>>, index: string): string[] {
  const ids: string[] = [];
  if (typeof index === 'string' && /^\d+(\.\d+)*$/.test(index)) {
    const nums = index.split('.');
    let target: Array<Element<ElementType>> = elements;
    while (nums.length > 0) {
      const num = nums.shift();
      if (typeof num === 'string') {
        const elem = target[parseInt(num)];
        if (elem && nums.length === 0) {
          ids.push(elem.id);
        } else if (elem.type === 'group' && nums.length > 0) {
          target = (elem as Element<'group'>)?.detail?.children || [];
        }
      }
      break;
    }
  }
  return ids;
}

export function getSelectedElementids(data: Data, indexes: Array<number | string>): string[] {
  let ids: string[] = [];
  if (Array.isArray(data) && data.length > 0 && Array.isArray(indexes) && indexes.length > 0) {
    indexes.forEach((idx: number | string) => {
      if (typeof idx === 'number') {
        if (data[idx]) {
          ids.push(data[idx].id);
        }
      } else if (typeof idx === 'string') {
        ids = ids.concat(getGroupids(data, idx));
      }
    });
  }
  return ids;
}

export function validateElements(elements: Array<Element<ElementType>>): boolean {  
  let isValid = true;
  if (Array.isArray(elements)) {
    const ids: string[] = [];
    elements.forEach((elem) => {
      if (typeof elem.id === 'string' && elem.id) {
        if (ids.includes(elem.id)) {
          isValid = false;
          // eslint-disable-next-line no-console
          console.warn(`Duplicate ids: ${elem.id}`);
        } else {
          ids.push(elem.id);
        }
      } else {
        isValid = false;
        // eslint-disable-next-line no-console
        console.warn('Element missing id', elem);
      }
      if (elem.type === 'group') {
        isValid = validateElements((elem as Element<'group'>)?.detail?.children);
      }
    });
  }
  return isValid;
}

type AreaSize = ElementSize;

export function calcElementListSize(list: Elements): ElementSize {
  const area: AreaSize = { x: 0, y: 0, w: 0, h: 0 };
  let prevElemSize: ElementSize | null = null;

  for (let i = 0; i < list.length; i++) {
    const elem = list[i];
    if (elem?.operations?.invisible) {
      continue;
    }
    const elemSize = {
      x: elem.x,
      y: elem.y,
      w: elem.w,
      h: elem.h,
      angle: elem.angle || 0
    };

    if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
      const ves = rotateElementVertexes(elemSize);
      if (ves.length === 4) {
        const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
        const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
        elemSize.x = Math.min(...xList);
        elemSize.y = Math.min(...yList);
        elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
        elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
      }
    }
    if (prevElemSize) {
      const areaStartX = Math.min(elemSize.x, area.x);
      const areaStartY = Math.min(elemSize.y, area.y);

      const areaEndX = Math.max(elemSize.x + elemSize.w, area.x + area.w);
      const areaEndY = Math.max(elemSize.y + elemSize.h, area.y + area.h);

      area.x = areaStartX;
      area.y = areaStartY;
      area.w = Math.abs(areaEndX - areaStartX);
      area.h = Math.abs(areaEndY - areaStartY);
    } else {
      area.x = elemSize.x;
      area.y = elemSize.y;
      area.w = elemSize.w;
      area.h = elemSize.h;
    }
    prevElemSize = elemSize;
  }

  const listSize: ElementSize = {
    x: Math.floor(area.x),
    y: Math.floor(area.y),
    w: Math.ceil(area.w),
    h: Math.ceil(area.h)
  };

  return listSize;
}

export function calcElementsContextSize(
  elements: Array<Element<ElementType>>,
  opts?: { viewWidth: number; viewHeight: number; extend?: boolean }
): ViewContextSize {
  const area: AreaSize = { x: 0, y: 0, w: 0, h: 0 };
  elements.forEach((elem: Element<ElementType>) => {
    const elemSize: ElementSize = {
      x: elem.x,
      y: elem.y,
      w: elem.w,
      h: elem.h,
      angle: elem.angle
    };
    if (elemSize.angle && (elemSize.angle > 0 || elemSize.angle < 0)) {
      const ves = rotateElementVertexes(elemSize);
      if (ves.length === 4) {
        const xList = [ves[0].x, ves[1].x, ves[2].x, ves[3].x];
        const yList = [ves[0].y, ves[1].y, ves[2].y, ves[3].y];
        elemSize.x = Math.min(...xList);
        elemSize.y = Math.min(...yList);
        elemSize.w = Math.abs(Math.max(...xList) - Math.min(...xList));
        elemSize.h = Math.abs(Math.max(...yList) - Math.min(...yList));
      }
    }
    const areaStartX = Math.min(elemSize.x, area.x);
    const areaStartY = Math.min(elemSize.y, area.y);

    const areaEndX = Math.max(elemSize.x + elemSize.w, area.x + area.w);
    const areaEndY = Math.max(elemSize.y + elemSize.h, area.y + area.h);

    area.x = areaStartX;
    area.y = areaStartY;
    area.w = Math.abs(areaEndX - areaStartX);
    area.h = Math.abs(areaEndY - areaStartY);
  });

  if (opts?.extend) {
    area.x = Math.min(area.x, 0);
    area.y = Math.min(area.y, 0);
  }

  const ctxSize = {
    contextWidth: area.w,
    contextHeight: area.h
  };

  if (opts?.viewWidth && opts?.viewHeight && opts?.viewWidth > 0 && opts?.viewHeight > 0) {
    if (opts.viewWidth > area.x + area.w) {
      ctxSize.contextWidth = opts.viewWidth - area.x;
    }
    if (opts.viewHeight > area.y + area.h) {
      ctxSize.contextHeight = opts.viewHeight - area.y;
    }
  }
  return ctxSize;
}

export function calcElementsViewInfo(
  elements: Array<Element<ElementType>>,
  prevViewSize: ViewSizeInfo,
  options?: {
    extend: boolean;
  }
): {
  contextSize: ViewContextSize;
} {
  const contextSize = calcElementsContextSize(elements, { viewWidth: prevViewSize.width, viewHeight: prevViewSize.height, extend: options?.extend });
  if (options?.extend === true) {
    contextSize.contextWidth = Math.max(contextSize.contextWidth, prevViewSize.contextWidth);
    contextSize.contextHeight = Math.max(contextSize.contextHeight, prevViewSize.contextHeight);
  }
  return {
    contextSize
  };
}

export function getElemenetsAssetIds(elements: Elements): string[] {
  const assetIds: string[] = [];
  const _scanElements = (elems: Elements) => {
    elems.forEach((elem: Element<ElementType>) => {
      if (elem.type === 'image' && isAssetId((elem as Element<'image'>).detail.src)) {
        assetIds.push((elem as Element<'image'>).detail.src);
      } else if (elem.type === 'svg' && isAssetId((elem as Element<'svg'>).detail.svg)) {
        assetIds.push((elem as Element<'svg'>).detail.svg);
      } else if (elem.type === 'html' && (elem as Element<'html'>).detail.html) {
        assetIds.push((elem as Element<'html'>).detail.html);
      } else if (elem.type === 'group' && Array.isArray((elem as Element<'group'>).detail.children)) {
        _scanElements((elem as Element<'group'>).detail.children);
      }
    });
  };
  _scanElements(elements);
  return assetIds;
}

export function findElementFromList(id: string, list: Element<ElementType>[]): Element<ElementType> | null {
  let result: Element<ElementType> | null = null;
  for (let i = 0; i < list.length; i++) {
    const elem = list[i];
    if (elem.id === id) {
      result = elem;
      break;
    } else if (!result && elem.type === 'group') {
      const resultInGroup = findElementFromList(id, (elem as Element<'group'>)?.detail?.children || []);
      if (resultInGroup?.id === id) {
        result = resultInGroup;
        break;
      }
    }
  }
  return result;
}

export function findElementsFromList(ids: string[], list: Element<ElementType>[]): Element<ElementType>[] {
  const result: Element<ElementType>[] = [];
  
  function _find(elements: Element<ElementType>[]) {
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      if (ids.includes(elem.id)) {
        result.push(elem);
      } else if (elem.type === 'group') {
        _find((elem as Element<'group'>)?.detail?.children || []);
      }
    }
  }
  _find(list);
  return result;
}

export function getGroupQueueFromList(id: string, elements: Element<ElementType>[]): Element<'group'>[] {
  const groupQueue: Element<'group'>[] = [];

  function _scan(id: string, elements: Element<ElementType>[]): Element<ElementType> | null {
    let result: Element<ElementType> | null = null;
    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      if (elem.id === id) {
        result = elem;
        break;
      } else if (!result && elem.type === 'group') {
        groupQueue.push(elem as Element<'group'>);
        const resultInGroup = _scan(id, (elem as Element<'group'>)?.detail?.children || []);
        if (resultInGroup?.id === id) {
          result = resultInGroup;
          break;
        }
        groupQueue.pop();
      }
    }
    return result;
  }
  _scan(id, elements);
  return groupQueue;
}

export function getGroupQueueByElementPosition(elements: Element<ElementType>[], position: ElementPosition): Element<'group'>[] | null {
  const groupQueue: Element<'group'>[] = [];
  let currentElements: Element[] = elements;
  if (position.length > 1) {
    for (let i = 0; i < position.length - 1; i++) {
      const index = position[i];
      const group = currentElements[index] as Element<'group'>;
      if (group?.type === 'group' && Array.isArray(group?.detail?.children)) {
        groupQueue.push(group);
        currentElements = group.detail.children;
      } else {
        return null;
      }
    }
  }
  return groupQueue;
}

export function getElementSize(elem: Element): ElementSize {
  const { x, y, w, h, angle } = elem;
  const size: ElementSize = { x, y, w, h, angle };
  return size;
}

export function mergeElementAsset<T extends Element<LoadElementType>>(element: T, assets: ElementAssets): T {
  // const elem: T = { ...element, ...{ detail: { ...element.detail } } };
  const elem = element;
  let assetId: string | null = null;
  let assetItem: ElementAssetsItem | null = null;
  if (elem.type === 'image') {
    assetId = (elem as Element<'image'>).detail.src;
  } else if (elem.type === 'svg') {
    assetId = (elem as Element<'svg'>).detail.svg;
  } else if (elem.type === 'html') {
    assetId = (elem as Element<'html'>).detail.html;
  }

  if (assetId && assetId?.startsWith('@assets/')) {
    assetItem = assets[assetId];
  }

  if (assetItem?.type === elem.type && typeof assetItem?.value === 'string' && assetItem?.value) {
    if (elem.type === 'image') {
      (elem as Element<'image'>).detail.src = assetItem.value;
    } else if (elem.type === 'svg') {
      (elem as Element<'svg'>).detail.svg = assetItem.value;
    } else if (elem.type === 'html') {
      (elem as Element<'html'>).detail.html = assetItem.value;
    }
  }
  return elem;
}

export function filterElementAsset<T extends Element<LoadElementType>>(
  element: T
): {
  element: T;
  assetId: string | null;
  assetItem: ElementAssetsItem | null;
} {
  let assetId: string | null = null;
  let assetItem: ElementAssetsItem | null = null;
  let resource: string | null = null;

  if (element.type === 'image') {
    resource = (element as Element<'image'>).detail.src;
  } else if (element.type === 'svg') {
    resource = (element as Element<'svg'>).detail.svg;
  } else if (element.type === 'html') {
    resource = (element as Element<'html'>).detail.html;
  }

  if (typeof resource === 'string' && !isAssetId(resource)) {
    assetId = createAssetId(resource);
    assetItem = {
      type: element.type as LoadElementType,
      value: resource
    };
    if (element.type === 'image') {
      (element as Element<'image'>).detail.src = assetId;
    } else if (element.type === 'svg') {
      (element as Element<'svg'>).detail.svg = assetId;
    } else if (element.type === 'html') {
      (element as Element<'html'>).detail.html = assetId;
    }
  }

  return {
    element,
    assetId,
    assetItem
  };
}

export function isResourceElement(elem: Element): boolean {
  return ['image', 'svg', 'html'].includes(elem?.type);
}

export function findElementsFromListByPositions(positions: ElementPosition[], list: Element[]): Element[] {
  const elements: Element[] = [];
  positions.forEach((pos: ElementPosition) => {
    const elem = findElementFromListByPosition(pos, list);
    if (elem) {
      elements.push(elem);
    }
  });
  return elements;
}

export function findElementFromListByPosition(position: ElementPosition, list: Element[]): Element | null {
  let result: Element | null = null;
  let tempList: Element[] = list;
  for (let i = 0; i < position.length; i++) {
    const pos = position[i];
    const item = tempList[pos];
    if (i < position.length - 1 && item.type === 'group') {
      tempList = (item as Element<'group'>).detail.children;
    } else if (i === position.length - 1) {
      result = item;
    } else {
      break;
    }
  }
  return result;
}

export function findElementQueueFromListByPosition(position: ElementPosition, list: Element[]): Element[] {
  const result: Element[] = [];
  let tempList: Element[] = list;
  for (let i = 0; i < position.length; i++) {
    const pos = position[i];
    const item = tempList[pos];
    if (item) {
      result.push(item);
    } else {
      break;
    }

    if (i < position.length - 1 && item.type === 'group') {
      tempList = (item as Element<'group'>).detail.children;
    } else {
      break;
    }
  }
  return result;
}

export function getElementPositionFromList(id: string, elements: Element<ElementType>[]): ElementPosition {
  const result: ElementPosition = [];
  let over = false;
  const _loop = (list: Element<ElementType>[]) => {
    for (let i = 0; i < list.length; i++) {
      if (over === true) {
        break;
      }
      result.push(i);
      const elem = list[i];
      if (elem.id === id) {
        over = true;
        break;
      } else if (elem.type === 'group') {
        _loop((elem as Element<'group'>)?.detail?.children || []);
      }
      if (over) {
        break;
      }
      result.pop();
    }
  };
  _loop(elements);
  return result;
}
