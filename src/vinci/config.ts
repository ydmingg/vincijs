import type { VinciSettings, VinciStorage, VinciMode } from '../types';
import { istype } from '../tools';

export const defaultMode: VinciMode = 'select';

export const defaultSettings: Required<Pick<VinciSettings, 'mode'>> = {
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
    enableInfo: false,
    middlewareStyles: {
      selector: {},
      info: {},
      ruler: {},
      scroller: {},
      // layoutSelector: {}
    }
  };
  return storage;
}

export function parseStyles(opts: VinciSettings) {
  const styles: Required<VinciSettings['styles']> = {
    selector: {},
    ruler: {},
    info: {},
    scroller: {},
    // layoutSelector: {}
  };
  if (opts.styles) {
    // selector
    const { selector, info, ruler, scroller } = opts.styles;
    if (istype.string(selector?.activeColor)) {
      styles.selector.activeColor = selector?.activeColor;
    }
    if (istype.string(selector?.activeAreaColor)) {
      styles.selector.activeAreaColor = selector?.activeAreaColor;
    }
    if (istype.string(selector?.lockedColor)) {
      styles.selector.lockedColor = selector?.lockedColor;
    }
    if (istype.string(selector?.referenceColor)) {
      styles.selector.referenceColor = selector?.referenceColor;
    }

    // info
    if (istype.string(info?.textBackground)) {
      styles.info.textBackground = info?.textBackground;
    }
    if (istype.string(info?.textColor)) {
      styles.info.textColor = info?.textColor;
    }

    // ruler
    if (istype.string(ruler?.background)) {
      styles.ruler.background = ruler?.background;
    }
    if (istype.string(ruler?.borderColor)) {
      styles.ruler.borderColor = ruler?.borderColor;
    }
    if (istype.string(ruler?.scaleColor)) {
      styles.ruler.scaleColor = ruler?.scaleColor;
    }
    if (istype.string(ruler?.textColor)) {
      styles.ruler.textColor = ruler?.textColor;
    }
    if (istype.string(ruler?.gridColor)) {
      styles.ruler.gridColor = ruler?.gridColor;
    }
    if (istype.string(ruler?.gridPrimaryColor)) {
      styles.ruler.gridPrimaryColor = ruler?.gridPrimaryColor;
    }
    if (istype.string(ruler?.selectedAreaColor)) {
      styles.ruler.selectedAreaColor = ruler?.selectedAreaColor;
    }

    // scroller
    if (istype.string(scroller?.thumbBackground)) {
      styles.scroller.thumbBackground = scroller?.thumbBackground;
    }
    if (istype.string(scroller?.thumbBorderColor)) {
      styles.scroller.thumbBorderColor = scroller?.thumbBorderColor;
    }
    if (istype.string(scroller?.hoverThumbBackground)) {
      styles.scroller.hoverThumbBackground = scroller?.hoverThumbBackground;
    }
    if (istype.string(scroller?.hoverThumbBorderColor)) {
      styles.scroller.hoverThumbBorderColor = scroller?.hoverThumbBorderColor;
    }
    if (istype.string(scroller?.activeThumbBackground)) {
      styles.scroller.activeThumbBackground = scroller?.activeThumbBackground;
    }
    if (istype.string(scroller?.activeThumbBorderColor)) {
      styles.scroller.activeThumbBorderColor = scroller?.activeThumbBorderColor;
    }

    // layoutSelector
    // if (istype.string(layoutSelector?.activeColor)) {
    //   styles.layoutSelector.activeColor = layoutSelector?.activeColor;
    // }
  }
  return styles;
}
