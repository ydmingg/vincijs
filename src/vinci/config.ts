import type { VinciSettings, VinciStorage, VinciMode } from '../types';

export const defaultMode: VinciMode = 'select';

export const defaultSettings: Required<VinciSettings> = {
  mode: defaultMode
};

export function getDefaultStorage(): VinciStorage {
  const storage: VinciStorage = {
    mode: defaultMode,
    enableRuler: false,
    enableScale: false,
    enableScroll: false,
    enableSelect: false,
    enableTextEdit: false,
    enableDrag: false,
    enableInfo: false
  };
  return storage;
}
