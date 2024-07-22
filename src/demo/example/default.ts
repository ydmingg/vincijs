export const funDefault = (Vinci, Data) => { 
    // 数据
    const data = [
        {   
            id: "013120d2page1",
            name: "page1",
            title: "页面1",
            type: "group",
            x: 0,
            y: 0,
            w: 400,
            h: 400,
            detail: {
                background: '#ccc',
                borderWidth: 0,
                borderColor: '#3f51b5',
                children: []
            }
        },
        {   
            id: "0131202rectd1",
            name: "rect1",
            title: "矩形",
            x: 50,
            y: 100,
            w: 100,
            h: 100,
            angle: 0,
            type: "rect",
            detail: {
                background: 'red',
                
            }
        },
        {
            id: "0131202recstd1",
            name: "rect2",
            title: "矩形",
            x: 120,
            y: 130,
            w: 100,
            h: 100,
            angle: 0,
            type: "rect",
            detail: {
                background: 'rgba(0,0,255,.5)',
                // overflow: 'hidden'
            }
        },
        {   
            id: "0131202psage1",
            name: "page1",
            title: "页面1",
            type: "group",
            x: 50,
            y: 0,
            w: 100,
            h: 100,
            detail: {
                background: '#ccc',
                borderWidth: 8,
                borderColor: '#3f51b5',
                children: []
            }
        },
        {   
            id: "0131202page1",
            name: "page1",
            title: "页面1",
            type: "group",
            x: 100,
            y: 0,
            w: 100,
            h: 100,
            detail: {
                background: '#ccc',
                borderWidth: 8,
                borderColor: '#3f51b5',
                children: []
            }
        },
        {   
            id: "0131202rdectd1",
            name: "rect1",
            title: "矩形",
            x: 300,
            y: 100,
            w: 100,
            h: 100,
            angle: 0,
            type: "rect",
            detail: {
                background: 'blue',
                // borderWidth: 10,
                // borderColor: '#3f51b5',
                // draggable: true
    
            }
        },
        {   
            id: "0131202texd1",
            name: "text1",
            title: "文字",
            x: 50,
            y: 300,
            w: 300,
            h: 40,
            angle: 0,
            type: "text",
            detail: {
                text: "Piksel 协同设计",
                color: "black",
                fontSize: 40,
                fontFamily: "DM Sans",
                opacity: 1,
                textAlign: "left",
                lineHeight: 40,
                fontWeight: "bold"
    
            }
        },
    
    ]

    // 渲染元素
    Vinci.setData(data)
    Vinci.centerContent({ data: data });
    // console.time()
    // for (let i = 0; i < 500; i++) {
    //     const rectDev1 = {
    //         id: "rect1"+ i,
    //         name: "rect",
    //         type: "rect",
    //         x: 0,
    //         y: 0,
    //         w: 200,
    //         h: 200,
    //         detail: {
    //             background: "#00ff00"
    //         }
    //     }

    //     Vinci.addElement(rectDev1)
    // }
    // console.timeEnd();
    
    // 插入元素
    // Vinci.addElement(Data.svgData)
    // 居中
    // Vinci.centerContent();
    // 获取data
    // console.log(Vinci.getData());
    // 切换试图
    // Vinci.setMode('drag');
    // 选择元素
    const getData = Vinci.getData()
    // console.log(getData[0].id);
    Vinci.selectElement(getData[1].id)
    
    // Vinci.selectElement(getData[0].id)
    // 更新元素
    // const getData = Vinci.getData()
    // const el = getData![0]
    // el.detail.borderColor = "blue"
    // Vinci.updateElement(el)
    // 删除元素
    // const ID = Vinci.getData()![0].id;
    // Vinci.deleteElement(ID)
    // 删除元素后重新渲染
    // const ID = Vinci.getData()![0].id;
    // Vinci.moveElement(ID, [1, 2]);
    // console.log(Vinci.getData());
    // 修改画布
    // Vinci.resize({
    //     width:200,
    //     height: 200,
    //     background: "#EFEFEF"
    // })
    // 开/关（标尺，滚动条，缩放，信息显示，）
    // Vinci.enable('ruler')
    // Vinci.enable('scroll')
    // Vinci.enable('scale')
    // Vinci.enable('info')
    // Vinci.setMode('drag');
    // Vinci.disable('scroll')
    // Vinci.disable('info')
    // Vinci.disable('ruler')





}