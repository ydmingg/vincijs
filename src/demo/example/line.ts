import { Vinci } from "@src/vinci";
export const funLine = (Vinci:Vinci, Data:any) => { 
    // 数据
    const data = [
        {   
            id: "0131202line1",
            name: "line1",
            title: "线条",
            x: 50,
            y: 50,
            w: 400,
            h: 0,
            angle: 0,
            type: "line",
            detail: {
                // background: 'red',
                borderColor: "blue",
                borderWidth: 10,
                borderStyle: "solid"
                
            }
        }
    
    ]

    // 渲染元素
    Vinci.setData(data)
    Vinci.centerContent({ data: data });
    






}