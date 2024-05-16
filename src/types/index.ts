import Konva from "konva";

export interface CoreOptions {
  width: number;
  height: number;
  devicePixelRatio?: number;
  // createCustomContext2D?: (opts: { width: number; height: number; devicePixelRatio: number };
}

export type BoardBaseEventMap = {
    loadSource: void;
  };
export type BoardExtendEventMap = BoardBaseEventMap & Record<string, any>;


// 

export interface BoardContent { 
    lastContent: Konva.Group;
    viewContent: Konva.Group;
    // helperContent: Konva.Group;
    boardContent: Konva.Group;
    view: () => void;
}


// core
export type CursorType =
  | 'resize-left'
  | 'resize-right'
  | 'resize-top'
  | 'resize-bottom'
  | 'resize-top-left'
  | 'resize-top-right'
  | 'resize-bottom-left'
  | 'resize-bottom-right'
  | 'drag-default'
  | 'drag-active'
  | 'default';


// core
export interface CoreEventCursor {
  type: CursorType | string | null;
  // groupQueue?: Element<'group'>[];
  // element?: Element<ElementType>;
}

export interface CoreEventChange {
  type: string;
  // data: Data;
}
export type CoreEventMap = BoardBaseEventMap & {
  cursor: CoreEventCursor;
  change: CoreEventChange;
  [key: string]: any;
};


export type VinciMode = 'select' | 'drag' | 'readOnly';


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