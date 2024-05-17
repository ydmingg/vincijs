import type { Element, ElementPosition } from './element';
import type { RecursivePartial } from './util';

export type ModifyType = 'updateElement' | 'addElement' | 'deleteElement' | 'moveElement';
export type ModifiedElement = Omit<RecursivePartial<Element>, 'uuid'>;

export interface ModifyContentMap {
    updateElement: { position: ElementPosition; beforeModifiedElement: ModifiedElement; afterModifiedElement: ModifiedElement };
    addElement: { position: ElementPosition; element: Element };
    deleteElement: { position: ElementPosition; element: Element };
    moveElement: { from: ElementPosition; to: ElementPosition };
}
  

export interface ModifyOptions<T extends ModifyType = ModifyType> {
    type: T;
    content: ModifyContentMap[T];
}
