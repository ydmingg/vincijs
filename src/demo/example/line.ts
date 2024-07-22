export const funLine = (Vinci, Data) => { 
    // 数据
    const data = [
        {   
            id: "0131202line1",
            name: "line1",
            title: "线条",
            x: 0,
            y: 0,
            w: 400,
            h: 0,
            angle: 0,
            type: "line",
            detail: {
                background: 'red',
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