const uuid = require('uuid/v4');

const X = 'x';
const Y = 'y';
const HORIZONTAL = 'horizontal';
// const VERITCAL = 'vertical';
// const TOP = 'top';
const BOTTOM = 'bottom' ;
const LEFT = 'left';
// const RIGHT = 'right';

export class DataProps {
    constructor(type, data, dataKey, name, xAxisId=0, yAxisId=0) {
        this.type = type;
        this.data = data;
        this.dataKey = dataKey;
        this.xAxisId = xAxisId;
        this.yAxisId = yAxisId;
        this.layout = null;
        this.name = name;
        this[type]();
    }

    line() {
        this.dot = true;
        this.stroke = 'black';
        this.line = false;
        this.lineType = 'joint'
    }

    scatter() {
        this.line = false;
        this.shape = null;
        this.fill = 'black';
    }

    bar() {
        this.barSize = null;
        this.barGap = 4;
        this.fill = 'black';
    }
}

export class LegendProps {
    constructor () {
        this.layout = HORIZONTAL;
        this.align = LEFT;
    }
}

export class AxisProps {
    constructor(type) {
        this.axisType = type;
        this.orientation = type === X ? BOTTOM : LEFT;
        this.type = 'category';
        this.tickCount = 5;
        this.interval = 'preserveEnd';
        this.label = ''
        if (type === X){
            this.xAxisId = uuid()
        }
        else {
            this.yAxisId = uuid()
        }
    }
}
;
export class GraphProps {
    constructor(type) {
        this.graphType = type;
        this.axes = [new AxisProps(X), new AxisProps(Y)];
        this.legend = null;
        this.referenceLines = [];
        this.data = [];
        this.errorBars = null
        this.layout = HORIZONTAL;
    }
}