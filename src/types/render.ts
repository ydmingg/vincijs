import type { LoaderEventMap} from './loader';

export interface RendererEventMap {
    load: LoaderEventMap['load'];
}