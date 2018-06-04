const uuid = require('uuid/v4');

export const X = 'x';
export const Y = 'y';
export const HORIZONTAL = 'horizontal';
export const VERITCAL = 'vertical';
export const TOP = 'top';
export const BOTTOM = 'bottom' ;
export const LEFT = 'left';
export const RIGHT = 'right';

// from https://stackoverflow.com/questions/1484506/random-color-generator
// 2018/05/20
const getRandomColor = () => {
    return '#' + Math.random().toString(16).substr(-6);
};

export class DataProps {
    constructor(type, name, xAxisId=0, yAxisId=0) {
        this.type = type;
        this.data = [];
        this.xAxisId = xAxisId;
        this.yAxisId = yAxisId;
        this.layout = null;
        this.name = name;

        this[type]();
    }

    line() {
        this.dot = true;
        this.stroke = getRandomColor();
        this.line = false;
        this.lineType = 'joint';
    }

    scatter() {
        this.line = false;
        this.shape = null;
        this.fill = getRandomColor();
    }

    bar() {
        this.barSize = null;
        this.barGap = 4;
        this.fill = getRandomColor;
    }
}

export class LegendProps {
    constructor () {
        this.layout = HORIZONTAL;
        this.align = LEFT;
    }
}

export class AxisProps {
    constructor(type, name) {
        this.axisType = type;
        this.orientation = type === X ? BOTTOM : LEFT;
        this.type = 'category';
        this.tickCount = 5;
        this.interval = 'preserveEnd';
        this.name = name;
        this.dataKey = type === X ? 'f1': 'f2' ;
        this.expression = ''; // the expression is used when fetching data.
        if (type === X){
            this.xAxisId = uuid();
        }
        else {
            this.yAxisId = uuid();
        }
    }
}

/**
 * Mostly for rendeirng the edit page (since there isn't much of a way of figuring out
 * what generates what unless we're going to sort them all on render, which is a waste)
 */
export class Plotter {
    constructor () {
        this.id = uuid();
        this.xAxis = null;
        this.yAxis = null;
        this.items = [];  // ids of all items that are created by the plotter.
    }
}

export class GraphProps {
    constructor(type) {
        this.graphType = type;
        this.axes = [];
        this.legend = null;
        this.referenceLines = [];
        this.plotAttrs = [];
        this.data = {};
        this.errorBars = null;
        this.layout = HORIZONTAL;
        this.plotters = []; // list of plotter objects. used to generate the UI
    }
}
