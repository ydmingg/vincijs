import { Vinci } from "./vinci";

const app = document.querySelector(".app-canvas") as HTMLDivElement;
const vinci = new Vinci(app, app.clientWidth, app.clientHeight);

// const data = [
//     // {   
//     //     id: "0131202page1",
//     //     name: "page1",
//     //     title: "页面1",
//     //     type: "group",
//     //     x: 0,
//     //     y: 0,
//     //     width: 100,
//     //     height: 100,
//     //     detail: {
//     //         background: 'red',
//     //         borderWidth: 10,
//     //         borderColor: '#3f51b5',
//     //         children: [
//     //             {},
//     //             {},
//     //             {},

//     //         ]
//     //     }
//     // },
//     {   
//         id: "0131202rect1",
//         name: "rect1",
//         title: "矩形1",
//         type: "rect",
//         x: 100,
//         y: 100,
//         width: 100,
//         height: 100,
//         detail: {
//             background: 'red',
//             // borderWidth: 10,
//             // borderColor: '#3f51b5',
//             draggable: true

//         }
//     }

// ]

//
// vinci.setData(data)