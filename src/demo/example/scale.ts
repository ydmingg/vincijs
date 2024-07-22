import { Vinci } from "@src/vinci";
import Data from "@src/demo/data";

export const funScale = (Vinci, Data) => { 
    // 数据
    const data = [
        {   
            id: "0131202rectd1",
            name: "rect1",
            title: "矩形",
            x: 50,
            y: 100,
            w: 1000,
            h: 1000,
            angle: 0,
            type: "rect",
            detail: {
                background: 'red',
                visibility: false,
                
            }
        }
    
    ]

    // 渲染元素
    Vinci.setData(data)

    // 自定义缩放比例
    // const { x, y } = vinci.getViewCenter()
    Vinci.centerContent({ data: data });
    // vinci.scale({
    //     scale: 0.8,
    //     point: {
    //         x: x,
    //         y: y
    //     }
    // });
    const scale1 = Vinci.getViewInfo().viewScaleInfo.scale * 100 + "%";
    console.log("缩放比例：",scale1);
}