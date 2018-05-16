const uuid = require(uuid/v4);
const X = 'x';
const Y = 'y';

class DataProps {
    constructor(type, data, dataKey, xAxisId=0, yAxisId=0) {
        this.data = data;
        this.dataKey = dataKey;
        this.xAxisId = xAxisId;
        this.yAxisId = yAxisId;
    }

    line() {

    }

    scatter() {

    }

    bar() {

    }
}

class LegendProps {
    constructor () {
        this.layout = 'horizontal',
        this.align = 'left'
    }
}

class AxisProps {
    constructor(type) {
        this.orientation = type === X ? 'bottom':'left';
        this.type = 'category';
        this.tickCount = 5;
        this.interval = 0;
        this.label = ''
        if (type === X){
            this.xAxisId = uuid()
        }
        else {
            this.yAxisId = uuid()
        }
    }
}

class GraphProps {
    constructor(type) {
        this.graphType = type;
        this.xAxes = [new AxisProps(X)];
        this.yAxes = [new AxisProps(Y)];
        this.legend = null;
        this.referenceLines = [];
        this.data = [];
        this.errorBars = null
    }
}