import { Vinci } from "@src/vinci";
import data from "@src/demo/data";
import { funDefault, funScale, funOverflow, funLine } from "./example";

export const Demo = () => { 
    const app = document.querySelector("#app") as HTMLDivElement;
    const vinci = new Vinci(
        app,
        app.clientWidth,
        app.clientHeight,
    );

    // 设置显示方式
    vinci.setMode('select');
    vinci.disable('scroll')
    vinci.disable('info')
    vinci.disable('ruler')

    // funDefault(vinci, data);
    // funScale(vinci, data);
    // funOverflow(vinci, data);
    funLine(vinci, data);




    
}