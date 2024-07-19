import type { CoreOptions } from './core';
import type { MiddlewareSelectorStyle, MiddlewareInfoStyle, MiddlewareRulerStyle, MiddlewareScrollerStyle } from './middleware';

export type VinciMode = 'select' | 'drag' | 'readOnly';

export type VinciFeature = 'ruler' | 'scroll' | 'scale' | 'info' | 'selectInGroup' | 'snapToGrid';  // TODO other feature

export interface VinciSettings {
  mode?: VinciMode;
  styles?: {
    selector?: Partial<MiddlewareSelectorStyle>;
    info?: Partial<MiddlewareInfoStyle>;
    ruler?: Partial<MiddlewareRulerStyle>;
    scroller?: Partial<MiddlewareScrollerStyle>;
    // layoutSelector?: Partial<MiddlewareLayoutSelectorStyle>;
  };
}

export type VinciOptions = CoreOptions & VinciSettings;

export interface VinciStorage {
  mode: VinciMode;
  enableRuler: boolean;
  enableScale: boolean;
  enableScroll: boolean;
  enableSelect: boolean;
  enableTextEdit: boolean;
  enableDrag: boolean;
  enableInfo: boolean;
  middlewareStyles: Required<VinciSettings['styles']>;
}
