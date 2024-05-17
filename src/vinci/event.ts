import type { CoreEventMap, Data } from '../types';
import { eventChange } from '../tools';

import {
  middlewareEventRuler,
  middlewareEventScale,
  middlewareEventSelect,
  middlewareEventSelectClear,
  middlewareEventTextEdit,
  middlewareEventTextChange
} from '../core';

const idrawEventChange = eventChange;

export type IDrawEvent = CoreEventMap & {
  [idrawEventChange]: {
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

export interface IDrawEventKeys {
  change: typeof idrawEventChange;
  ruler: typeof middlewareEventRuler;
  scale: typeof middlewareEventScale;
  select: typeof middlewareEventSelect;
  clearSelect: typeof middlewareEventSelectClear;
  textEdit: typeof middlewareEventTextEdit;
  textChange: typeof middlewareEventTextChange;
}

const innerEventKeys: IDrawEventKeys = {
  change: idrawEventChange,
  ruler: middlewareEventRuler,
  scale: middlewareEventScale,
  select: middlewareEventSelect,
  clearSelect: middlewareEventSelectClear,
  textEdit: middlewareEventTextEdit,
  textChange: middlewareEventTextChange
};

const eventKeys = {} as IDrawEventKeys;
Object.keys(innerEventKeys).forEach((keyName: string) => {
  Object.defineProperty(eventKeys, keyName, {
    value: innerEventKeys[keyName as keyof IDrawEventKeys],
    writable: false
  });
});

export { eventKeys };
