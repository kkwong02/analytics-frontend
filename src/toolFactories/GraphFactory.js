const uuid = require('uuid/v4');

export const X = 'x';
export const Y = 'y';
export const HORIZONTAL = 'horizontal';
export const VERITCAL = 'vertical';
export const TOP = 'top';
export const BOTTOM = 'bottom' ;
export const LEFT = 'left';
export const RIGHT = 'right';

export class DataProps {
    constructor(type, dataKey, expId, name, xAxisId=0, yAxisId=0) {
        this.type = type;
        this.data = [];
        this.dataKey = dataKey;
        this.xAxisId = xAxisId;
        this.yAxisId = yAxisId;
        this.layout = null;
        this.name = name;
        this.experiment = expId;

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
    constructor(type, dataKey) {
        this.axisType = type;
        this.orientation = type === X ? BOTTOM : LEFT;
        this.type = 'category';
        this.tickCount = 5;
        this.interval = 'preserveEnd';
        this.label = '';
        this.dataKey = dataKey;
        if (type === X){
            this.xAxisId = uuid();
        }
        else {
            this.yAxisId = uuid();
        }
    }
};

export class PlotProps {
    /**
     * Object used to generate the data objects.
     * @param {string} XAxis - uuid of XAxis
     * @param {string} yAxis  - uuid of YAxis
     * @param {Object} vars - variables with fn mapping
     */
    constructor(XAxis, YAxis, vars) {
        this.XAxisId = XAxis;
        this.YAxisId = YAxis;
        this.vars = vars;
        this.data = []
    }
};

export class GraphProps {
    constructor(type) {
        this.graphType = type;
        this.axes = [];
        this.legend = null;
        this.referenceLines = [];
        this.plots = [];
        this.data = [];
        this.errorBars = null;
        this.layout = HORIZONTAL;
        this.PlotProps = [];
    }
}

/**
 * Factory class for generating a graph using server response
 */
export class ResponseGraphFactory {
    /**
     * Graph object constructor
     * @param {Object} tool - the entire tool object.
     * @param {array} responseData - "data" in the response payload.
     * @param {array} experiments - a list of experiments objects (with name)
     */
    constructor(tool, responseData, experiments) {
        tool.tool.PlotProps.forEach(plot => {
            // get the related dataProps object by id
            // update the .data property
        });
    }
}