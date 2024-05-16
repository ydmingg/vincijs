

// 标尺参数
const rulerData = {
    size: 16,
    background: '#FFFFFFA8',
    borderColor: '#00000080',
    scaleColor: '#000000',
    textColor: '#00000080',
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 100,
    gridColor: '#AAAAAA20',
    gridKeyColor: '#AAAAAA40',
    lineSize: 1,
    selectedAreaColor: '#196097',
}

// 标尺
function calcRulerScaleList(opts: { axis: 'X' | 'Y'; scale: number; viewLength: number; viewOffset: number }) { 
    const { scale, viewLength, viewOffset } = opts;
    // console.log(opts);

    
    
}