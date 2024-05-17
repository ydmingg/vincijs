import { ActiveStore, StoreSharer,ViewScaleInfo, ViewSizeInfo } from '../types';
import { Store } from '../tools';

const defaultActiveStorage = {
    width: 0,
    height: 0,
    devicePixelRatio: 1,
    contextWidth: 0,
    contextHeight: 0,
    data: null,
    scale: 1,
    offsetLeft: 0,
    offsetRight: 0,
    offsetTop: 0,
    offsetBottom: 0
};

export class Sharer implements StoreSharer<Record<string | number | symbol, any>>{   
    ACTIVESTORE: Store<ActiveStore>
    SHARESTORE: Store<{
        [string: string | number | symbol]: any;
    }>;
    constructor() { 
        const activeStore = new Store<ActiveStore>({
            defaultStorage: defaultActiveStorage
        });
        const sharedStore = new Store({
            defaultStorage: {}
        });

        this.ACTIVESTORE = activeStore
        this.SHARESTORE = sharedStore

        
    }
    // getActiveStorage<T extends keyof ActiveStore>(key: T): ActiveStore[T] {
    //     return this.ACTIVESTORE.get(key);
    // }

    // setActiveStorage<T extends keyof ActiveStore>(key: T, storage: ActiveStore[T]) {
    //     return this.ACTIVESTORE.set(key, storage);
    // }

    // getActiveStoreSnapshot(opts?: { deepClone?: boolean }): ActiveStore {
    //     return this.ACTIVESTORE.getSnapshot(opts);
    // }

    // getSharedStorage(key: string | number | symbol): any {
    //     return 111
    // }

    // setSharedStorage(key: string | number | symbol, storage: any) {
    //     return 222
    // }

    // getSharedStoreSnapshot(opts?: { deepClone?: boolean }): Record<string, any> {
    //     return this.ACTIVESTORE.getSnapshot(opts);
    // }

    // get/set active info
    // getActiveViewScaleInfo(): ViewScaleInfo {
    //     const viewScaleInfo: ViewScaleInfo = {
    //         scale: this.ACTIVESTORE.get('scale'),
    //         offsetTop: this.ACTIVESTORE.get('offsetTop'),
    //         offsetBottom: this.ACTIVESTORE.get('offsetBottom'),
    //         offsetLeft: this.ACTIVESTORE.get('offsetLeft'),
    //         offsetRight: this.ACTIVESTORE.get('offsetRight')
    //     };
    //     return viewScaleInfo;
    // }
    
    // setActiveViewScaleInfo(viewScaleInfo: ViewScaleInfo) {
    //     const { scale, offsetTop, offsetBottom, offsetLeft, offsetRight } = viewScaleInfo;
    //     this.ACTIVESTORE.set('scale', scale);
    //     this.ACTIVESTORE.set('offsetTop', offsetTop);
    //     this.ACTIVESTORE.set('offsetBottom', offsetBottom);
    //     this.ACTIVESTORE.set('offsetLeft', offsetLeft);
    //     this.ACTIVESTORE.set('offsetRight', offsetRight);
    // }
    
    // setActiveViewSizeInfo(size: ViewSizeInfo) {
        
        
    //     this.ACTIVESTORE.set('width', size.width);
    //     this.ACTIVESTORE.set('height', size.height);
    //     this.ACTIVESTORE.set('devicePixelRatio', size.devicePixelRatio);
    //     this.ACTIVESTORE.set('contextWidth', size.contextWidth);
    //     this.ACTIVESTORE.set('contextHeight', size.contextHeight);
    // }
    
    // getActiveViewSizeInfo(): ViewSizeInfo {
    //     const sizeInfo: ViewSizeInfo = {
    //         width: this.ACTIVESTORE.get('width'),
    //         height: this.ACTIVESTORE.get('height'),
    //         devicePixelRatio: this.ACTIVESTORE.get('devicePixelRatio'),
    //         contextWidth: this.ACTIVESTORE.get('contextWidth'),
    //         contextHeight: this.ACTIVESTORE.get('contextHeight')
    //     };
    //     return sizeInfo;
    // }

}