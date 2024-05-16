import type { CoreEventMap } from '../types';

const eventChange = 'change';

export type vinciEvent = CoreEventMap & {
    [eventChange]: {
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
