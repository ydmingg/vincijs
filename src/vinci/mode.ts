import { VinciMode } from "../types";

function isValidMode(mode: string | VinciMode) {
    return ['select', 'drag', 'readOnly'].includes(mode);
}

  
export function changeMode(mode,core,store) { 
    let enableScale: boolean = false;
    let enableScroll: boolean = false;
    let enableSelect: boolean = false;
    let enableTextEdit: boolean = false;
    let enableDrag: boolean = false;
    let enableRuler: boolean = false;
    const enableInfo: boolean = true;

    let innerMode: VinciMode = 'select';
    store.set('mode', innerMode);

    if (isValidMode(mode)) { innerMode = mode; }
    if (innerMode === 'select') { 
        enableScale = true;
        enableScroll = true;
        enableSelect = true;
        enableTextEdit = true;
        enableDrag = false;
        enableRuler = true;
    } else if (innerMode === 'drag') {
        enableScale = true;
        enableScroll = true;
        enableSelect = false;
        enableTextEdit = false;
        enableDrag = true;
        enableRuler = true;
    } else if (innerMode === 'readOnly') {
        enableScale = false;
        enableScroll = false;
        enableSelect = false;
        enableTextEdit = false;
        enableDrag = false;
        enableRuler = false;
    }


    store.set('enableScale', enableScale);
    store.set('enableScroll', enableScroll);
    store.set('enableSelect', enableSelect);
    store.set('enableTextEdit', enableTextEdit);
    store.set('enableDrag', enableDrag);
    store.set('enableRuler', enableRuler);
    store.set('enableInfo', enableInfo);



}