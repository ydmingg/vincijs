import { Vinci } from "../vinci/index";
import { signIn } from "./data";

export const Demo = () => { 
    const app = document.querySelector(".app-canvas") as HTMLDivElement;
    const vinci = new Vinci(app, app.clientWidth, app.clientHeight);

    const data = {
        elements:[
            // {   
            //     id: "0131202page1",
            //     name: "page1",
            //     title: "页面1",
            //     type: "group",
            //     x: 0,
            //     y: 0,
            //     width: 100,
            //     height: 100,
            //     detail: {
            //         background: 'red',
            //         borderWidth: 10,
            //         borderColor: '#3f51b5',
            //         children: [
            //             {},
            //             {},
            //             {},
        
            //         ]
            //     }
            // },
            {   
                uuid: "0131202rect1",
                name: "rect1",
                // title: "矩形1",
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
                uuid: "0131202text1",
                name: "text1",
                // title: "矩形1",
                x: 50,
                y: 300,
                w: 140,
                h: 40,
                angle: 0,
                type: "text",
                detail: {
                    text: "Piksel",
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
    }


    vinci.setData(data)


    // 渲染元素
    vinci.addElement(signIn)

    // 居中
    // vinci.centerContent();
}


// 标准化数据结构
const Data = [
    {   
        id: "0131202layer1",
        name: "layer1",
        title: "层1",
        type: "group",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        detail: {
            background: 'red',
            borderWidth: 10,
            borderColor: '#3f51b5',
            children: [
                {},
                {},
            ]
        }
    },
    {   
        id: "0131202rect1",
        name: "rect1",
        title: "矩形1",
        type: "rect",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        detail: {
            background: 'red',
            borderWidth: 10,
            borderColor: '#3f51b5',
        }
    },
]