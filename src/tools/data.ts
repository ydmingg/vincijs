export function deepClone<T = any>(target: T): T {
    
    function _clone(t: T) {
      
      const type = is(t);
      
      if (['Null', 'Number', 'String', 'Boolean', 'Undefined'].indexOf(type) >= 0) {
        return t;
      } else if (type === 'Array') {
        const arr: any[] = [];
        (t as any[]).forEach((item: any) => {
          arr.push(_clone(item));
        });
  
        return arr;
      } else if (type === 'Object') {
        const obj: { [key: string | symbol]: any } = {};
        const keys = Object.keys(t as any);
  
        keys.forEach((key) => {
          // console.log(obj[key]);
          obj[key] = _clone((t as Record<string, any>)[key]);
        });
  
        const symbolKeys = Object.getOwnPropertySymbols(t);
        symbolKeys.forEach((key) => {
          obj[key] = _clone((t as Record<symbol, any>)[key]);
        });
        // console.log(obj);
  
        return obj;
      }
    }
    return _clone(target) as T;
}


function is(target: any): string {
    return Object.prototype.toString
      .call(target)
      .replace(/[\]|\[]{1,1}/gi, '')
      .split(' ')[1];
}