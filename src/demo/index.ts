import { Vinci } from "../vinci/index";
import Data from "./data";

export const Demo = () => { 
    const app = document.querySelector("#app") as HTMLDivElement;
    const vinci = new Vinci(
        app,
        app.clientWidth,
        app.clientHeight,
    );

    // const data = {
    //     elements:[
    //         // {
    //         //     id: "0131202page1",
    //         //     name: "page1",
    //         //     title: "页面1",
    //         //     type: "group",
    //         //     x: 0,
    //         //     y: 0,
    //         //     width: 100,
    //         //     height: 100,
    //         //     detail: {
    //         //         background: 'red',
    //         //         borderWidth: 10,
    //         //         borderColor: '#3f51b5',
    //         //         children: [
    //         //             {},
    //         //             {},
    //         //             {},
        
    //         //         ]
    //         //     }
    //         // },
    //         {
    //             id: "0131202rect1",
    //             name: "rect1",
    //             // title: "矩形1",
    //             x: 100,
    //             y: 100,
    //             w: 100,
    //             h: 100,
    //             angle: 0,
    //             type: "rect",
    //             detail: {
    //                 background: 'red',
    //                 // borderWidth: 10,
    //                 // borderColor: '#3f51b5',
    //                 // draggable: true
        
    //             }
    //         },
    //         {
    //             id: "0131202text1",
    //             name: "text1",
    //             // title: "矩形1",
    //             x: 50,
    //             y: 300,
    //             w: 140,
    //             h: 40,
    //             angle: 0,
    //             type: "text",
    //             detail: {
    //                 text: "Piksel",
    //                 color: "black",
    //                 fontSize: 40,
    //                 fontFamily: "DM Sans",
    //                 opacity: 1,
    //                 textAlign: "left",
    //                 lineHeight: 40,
    //                 fontWeight: "bold"
        
    //             }
    //         },
        
    //     ]
    // }
    
    const data1 = [
        // {   
        //     id: "0131202rectd1",
        //     name: "rect1",
        //     title: "矩形",
        //     x: 50,
        //     y: 100,
        //     w: 100,
        //     h: 100,
        //     angle: 0,
        //     type: "rect",
        //     detail: {
        //         background: 'red',
        //         visibility: false,
                
        //     }
        // },
        // {
        //     id: "0131202recstd1",
        //     name: "rect2",
        //     title: "矩形",
        //     x: 120,
        //     y: 130,
        //     w: 100,
        //     h: 100,
        //     angle: 0,
        //     type: "rect",
        //     detail: {
        //         background: 'rgba(0,0,255,.5)',
        //         // overflow: 'hidden'
        //     }
        // },
        
        {   
            id: "013120e2recstd1",
            name: "rect3",
            title: "矩形",
            x: 80,
            y: 150,
            w: 500,
            h: 200,
            angle: 0,
            type: "rect",
            detail: {
                background: 'green',
                borderRadius: 20
            }
        },
        // {   
        //     id: "013120d2page1",
        //     name: "page1",
        //     title: "页面1",
        //     type: "group",
        //     x: 0,
        //     y: 0,
        //     w: 400,
        //     h: 400,
        //     detail: {
        //         background: '#ccc',
        //         borderWidth: 0,
        //         borderColor: '#3f51b5',
        //         children: []
        //     }
        // },
        // {   
        //     id: "0131202psage1",
        //     name: "page1",
        //     title: "页面1",
        //     type: "group",
        //     x: 50,
        //     y: 0,
        //     w: 100,
        //     h: 100,
        //     detail: {
        //         background: '#ccc',
        //         borderWidth: 8,
        //         borderColor: '#3f51b5',
        //         children: []
        //     }
        // },
        // {   
        //     id: "0131202page1",
        //     name: "page1",
        //     title: "页面1",
        //     type: "group",
        //     x: 100,
        //     y: 0,
        //     w: 100,
        //     h: 100,
        //     detail: {
        //         background: '#ccc',
        //         borderWidth: 8,
        //         borderColor: '#3f51b5',
        //         children: []
        //     }
        // },
        // {   
        //     id: "0131202rectd1",
        //     name: "rect1",
        //     title: "矩形",
        //     x: 150,
        //     y: 100,
        //     w: 100,
        //     h: 100,
        //     angle: 0,
        //     type: "rect",
        //     detail: {
        //         background: 'red',
        //         // borderWidth: 10,
        //         // borderColor: '#3f51b5',
        //         // draggable: true
    
        //     }
        // },
        // {   
        //     id: "0131202texd1",
        //     name: "text1",
        //     title: "文字",
        //     x: 50,
        //     y: 300,
        //     w: 300,
        //     h: 40,
        //     angle: 0,
        //     type: "text",
        //     detail: {
        //         text: "Piksel 协同设计",
        //         color: "black",
        //         fontSize: 40,
        //         fontFamily: "DM Sans",
        //         opacity: 1,
        //         textAlign: "left",
        //         lineHeight: 40,
        //         fontWeight: "bold"
    
        //     }
        // },
    
    ]

    // 渲染元素
    vinci.setData(data1)
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

    //     vinci.addElement(rectDev1)
    // }
    // console.timeEnd();
    
    // 插入元素
    // vinci.addElement(Data.svgData)
    // 居中
    // vinci.centerContent();
    // 获取data
    // console.log(vinci.getData());
    // 切换试图
    // vinci.setMode('drag');
    // 选择元素
    // const getData = vinci.getData()
    // vinci.selectElement(getData![0].id)
    // 更新元素
    // const getData = vinci.getData()
    // const el = getData![0]
    // el.detail.borderColor = "blue"
    // vinci.updateElement(el)
    // 删除元素
    // const ID = vinci.getData()![0].id;
    // vinci.deleteElement(ID)
    // 删除元素后重新渲染
    // const ID = vinci.getData()![0].id;
    // vinci.moveElement(ID, [1, 2]);
    // console.log(vinci.getData());
    // 修改画布
    // vinci.resize({
    //     width:200,
    //     height: 200,
    //     background: "#EFEFEF"
    // })
    // 开/关（标尺，滚动条，缩放，信息显示，）
    // vinci.enable('ruler')
    // vinci.enable('scroll')
    // vinci.enable('scale')
    // vinci.enable('info')
    vinci.setMode('drag');
    vinci.disable('scroll')
    vinci.disable('info')
    vinci.disable('ruler')
    
    
    // 自定义缩放比例
    // const { x, y } = vinci.getViewCenter()
    vinci.centerContent({ data: data1 });
    // vinci.scale({
    //     scale: 0.8,
    //     point: {
    //         x: x,
    //         y: y
    //     }
    // });
    const scale1 = vinci.getViewInfo().viewScaleInfo.scale * 100 + "%";
    console.log("缩放比例：",scale1);
    
    // 选择元素
    // if (!getData) return;
    // vinci.selectElement(getData[2].id)

    // 下一层，上一层，顶层，底层
    // const getData = vinci.getData()
    // const elId = getData![2].id
    // document.documentElement.addEventListener('click', () => {
    //     const getData = vinci.getData();

    //     if (getData && getData.length > 2) {
    //       vinci.zIndex(elId, "down");
          
    //     }
    // });
    
    // 显示隐藏
    // document.documentElement.addEventListener('click', () => {
    //     vinci.visibility(elId, false)
    // })

    vinci.getImageBlobURL({ devicePixelRatio: 1 }).then((res) => { 
        const img = document.createElement('img')
        const { blobURL } = res
        img.src = blobURL!.toString()
        console.log(img);
        
        const popup = document.querySelector("#popup") as HTMLDivElement
        popup.appendChild(img)
        
    })


    
}


// 标准化数据结构
// const Data = [
//     {   
//         id: "0131202layer1",
//         name: "layer1",
//         title: "层1",
//         type: "group",
//         x: 0,
//         y: 0,
//         width: 100,
//         height: 100,
//         detail: {
//             background: 'red',
//             borderWidth: 10,
//             borderColor: '#3f51b5',
//             children: [
//                 {},
//                 {},
//             ]
//         }
//     },
//     {   
//         id: "0131202rect1",
//         name: "rect1",
//         title: "矩形1",
//         type: "rect",
//         x: 0,
//         y: 0,
//         width: 100,
//         height: 100,
//         detail: {
//             background: 'red',
//             borderWidth: 10,
//             borderColor: '#3f51b5',
//         }
//     },
// ]