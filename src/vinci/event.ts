import type { CoreEventMap, Data } from '../types';

import {
    eventChange,
    middlewareEventRuler,
    middlewareEventScale,
    middlewareEventSelect,
    middlewareEventSelectClear,
    middlewareEventTextEdit,
    middlewareEventTextChange
} from '../core';

const VinciEventChange = eventChange;

export type VinciEvent = CoreEventMap & {
  [VinciEventChange]: {
    data: Data;
    type:
      | 'updateElement'
      | 'deleteElement'
      | 'moveElement'
      | 'addElement'
      | 'dragElement'
      | 'resizeElement'
      | 'setData'
      | 'undo'
      | 'redo'
      | 'changeLayout' // TODO
      | 'other';
  };
};

export interface VinciEventKeys {
  change: typeof VinciEventChange;
  ruler: typeof middlewareEventRuler;
  scale: typeof middlewareEventScale;
  select: typeof middlewareEventSelect;
  clearSelect: typeof middlewareEventSelectClear;
  textEdit: typeof middlewareEventTextEdit;
  textChange: typeof middlewareEventTextChange;
}

const innerEventKeys: VinciEventKeys = {
  change: VinciEventChange,
  ruler: middlewareEventRuler,
  scale: middlewareEventScale,
  select: middlewareEventSelect,
  clearSelect: middlewareEventSelectClear,
  textEdit: middlewareEventTextEdit,
  textChange: middlewareEventTextChange
};

const eventKeys = {} as VinciEventKeys;
Object.keys(innerEventKeys).forEach((keyName: string) => {
  Object.defineProperty(eventKeys, keyName, {
    value: innerEventKeys[keyName as keyof VinciEventKeys],
    writable: false
  });
});

export { eventKeys };
