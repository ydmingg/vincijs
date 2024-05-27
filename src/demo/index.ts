import { Vinci } from "../vinci/index";
import { signIn,svgData } from "./data";

export const Demo = () => { 
    const app = document.querySelector("#app") as HTMLDivElement;
    const vinci = new Vinci(app, app.clientWidth, app.clientHeight);

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
        {   
            id: "013120d2page1",
            name: "page1",
            title: "页面1",
            type: "group",
            x: -100,
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
            id: "0131202psage1",
            name: "page1",
            title: "页面1",
            type: "group",
            x: -50,
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
            x: 0,
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
            id: "0131202rectd1",
            name: "rect1",
            title: "矩形",
            x: 100,
            y: 100,
            w: 100,
            h: 100,
            angle: 0,
            type: "rect",
            detail: {
                background: 'red',
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
    vinci.setData(data1)
    // 插入元素
    vinci.addElement(svgData)
    // 居中
    vinci.centerContent();
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
    vinci.disable('info')
    vinci.disable('ruler')

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



