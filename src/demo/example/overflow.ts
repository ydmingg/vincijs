export const funOverflow = (Vinci,Data) => { 
    // 数据
    const data = [
        {   
            id: "0131202rectd1",
            name: "rect1",
            title: "矩形",
            x: 0,
            y: 0,
            w: 200,
            h: 200,
            angle: 0,
            type: "rect",
            detail: {
                background: 'red',
                visibility: false,
                
            }
        },
        {   
            id: "0131202rdectd1",
            name: "rect1",
            title: "矩形",
            x: 300,
            y: 0,
            w: 200,
            h: 200,
            angle: 0,
            type: "rect",
            detail: {
                background: 'red',
                visibility: false,
                
            }
        },
        {   
            id: "0131202rectdsd1",
            name: "rect1",
            title: "矩形",
            x: 600,
            y: 0,
            w: 200,
            h: 200,
            angle: 0,
            type: "rect",
            detail: {
                background: 'red',
                visibility: false,
                
            }
        },
    
    ]

    // 渲染元素
    Vinci.setData(data)
    // 下一层，上一层，顶层，底层
    const getData = Vinci.getData()
    const elId = getData[2].id

    document.documentElement.addEventListener('click', () => {
        const getData = Vinci.getData();

        if (getData && getData.length > 2) {
            Vinci.zIndex(elId, "down");
          
        }
    });
    
    // 显示隐藏
    document.documentElement.addEventListener('click', () => {
        Vinci.visibility(elId, false)
    })

    Vinci.getImageBlobURL({ devicePixelRatio: 1 }).then((res) => { 
        const img = document.createElement('img')
        const { blobURL } = res
        img.src = blobURL!.toString()
        console.log(img);
        
        const popup = document.querySelector("#popup") as HTMLDivElement
        popup.appendChild(img)
        
    })
}