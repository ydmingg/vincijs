import type { CoreEventMap } from '../types';
import {
  middlewareEventRuler,
  // middlewareEventScale,
  // middlewareEventSelect,
  // middlewareEventSelectClear,
  // middlewareEventTextEdit,
  // middlewareEventTextChange
} from '../core';


const vinciEventChange = 'change';

export type vinciEvent = CoreEventMap & {
    [vinciEventChange]: {
    //   data: Data;
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

export interface vinciEventKeys {
  change: typeof vinciEventChange;
  ruler: typeof middlewareEventRuler;
  // scale: typeof middlewareEventScale;
  // select: typeof middlewareEventSelect;
  // clearSelect: typeof middlewareEventSelectClear;
  // textEdit: typeof middlewareEventTextEdit;
  // textChange: typeof middlewareEventTextChange;
}

const innerEventKeys: vinciEventKeys = {
  change: vinciEventChange,
  ruler: middlewareEventRuler,
  // scale: middlewareEventScale,
  // select: middlewareEventSelect,
  // clearSelect: middlewareEventSelectClear,
  // textEdit: middlewareEventTextEdit,
  // textChange: middlewareEventTextChange
};

const eventKeys = {} as vinciEventKeys;
Object.keys(innerEventKeys).forEach((keyName: string) => {
  Object.defineProperty(eventKeys, keyName, {
    value: innerEventKeys[keyName as keyof vinciEventKeys],
    writable: false
  });
});

export { eventKeys };