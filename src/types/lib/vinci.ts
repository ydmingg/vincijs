import type { CoreOptions } from './core';

export type VinciMode = 'select' | 'drag' | 'readOnly';

export type VinciFeature = 'ruler' | 'scroll' | 'scale' | 'info' | 'selectInGroup' | 'snapToGrid'; // TODO other feature

export interface VinciSettings {
  mode?: VinciMode;
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
}
