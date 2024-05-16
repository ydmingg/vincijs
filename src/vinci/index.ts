import { Core } from '../core/index';
import { changeMode } from './mode';
import { Store } from '../tools';
import { VinciStorage } from '../types';
import { getDefaultStorage } from './config';
import type { vinciEvent } from './event';

export class Vinci{ 
    CORE: any
    OPTS: any
    STORE: Store<VinciStorage> = new Store<VinciStorage>({
        defaultStorage: getDefaultStorage()
    });

    constructor(app: HTMLDivElement, appWidth: number, appHeight: number) { 
        const opts = {appWidth,appHeight}
        const { width, height } = { width: appWidth, height: appHeight }
        const core = new Core<vinciEvent>(app, { width, height })
        this.CORE = core
        this.OPTS = opts
        // 初始化
        this.init();

    }

    init() { 
        const core = this.CORE;
        const store = this.STORE
        changeMode('select', core, store);
    }





}