import type { Element, ElementType} from './element';

export interface Data<E extends Record<string, any> = Record<string, any>> {
    elements: Element<ElementType, E>[];
    // assets?: ElementAssets;
    // layout?: DataLayout;
}