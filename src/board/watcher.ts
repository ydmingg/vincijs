import { BoardWatcherEventMap } from '../types';
import { EventEmitter } from '../tools';

export class BoardWatcher extends EventEmitter<BoardWatcherEventMap> { 
    
    constructor(opts) { 
        super();
     

    }
}