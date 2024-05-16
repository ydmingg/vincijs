export class Calculator { 
    OPTS
    constructor(opts) { 
        this.OPTS = opts;
        
    }
    gridNumber(num: number, opts?: { ignore?: boolean }): number { 
        if (opts?.ignore === true) { 
            return num;
        }
        return Math.round(num);
    }
}