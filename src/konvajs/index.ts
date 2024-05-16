import Konva from "konva";

// export type elementAttrsType = { 
//     stage: Konva.Stage
//     layer: Konva.Layer
//     group: Konva.Group
//     circle: Konva.Circle
//     rect: Konva.Rect
//     text: Konva.Text
//     image: Konva.Image
//     line: Konva.Line
//     label: Konva.Label
//     tag: Konva.Tag
//     path: Konva.Path
//     arrow: Konva.Arrow
//     transformer: Konva.Transformer
//     regularPolygon: Konva.RegularPolygon
// }


// export type elementType = { 
//     stageConfig: Konva.StageConfig
//     nodeConfig: Konva.NodeConfig
//     imageConfig: Konva.ImageConfig
//     regularPolygonConfig: Konva.RegularPolygonConfig
//     arrowConfig: Konva.ArrowConfig
//     pathConfig: Konva.PathConfig
// }


export class newElements { 
    static stage(data: Konva.StageConfig) { return new Konva.Stage(data) }
    static layer() { return new Konva.Layer() }
    static group(data: Konva.NodeConfig) { return new Konva.Group(data) }
    static rect(data: Konva.NodeConfig) { return new Konva.Rect(data) }
    static circle(data: Konva.NodeConfig) { return new Konva.Circle(data) }
    static text(data: Konva.NodeConfig) { return new Konva.Text(data)}
    static image(data: Konva.ImageConfig) { return new Konva.Image(data) }
    static transformer() { return new Konva.Transformer() }
    static regularPolygon(data: Konva.RegularPolygonConfig) { return new Konva.RegularPolygon(data) }
    static line(data: Konva.NodeConfig) { return new Konva.Line(data) }
    static label(data: Konva.NodeConfig) { return new Konva.Label(data) }
    static tag(data: Konva.NodeConfig) { return new Konva.Tag(data) }
    static arrows(data: Konva.ArrowConfig) { return new Konva.Arrow(data) }
    static path(data: Konva.PathConfig) { return new Konva.Path(data) }

}
