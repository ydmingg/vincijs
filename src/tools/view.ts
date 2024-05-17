export interface ViewContextSize {
    contextWidth: number;
    contextHeight: number;
}

export interface ViewSizeInfo extends ViewContextSize {
    width: number;
    height: number;
    devicePixelRatio: number;
}
