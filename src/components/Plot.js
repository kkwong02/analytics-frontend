import React, { PureComponent } from 'react';
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    ZAxis,
    Legend,
    ScatterChart,
    Scatter,
    Tooltip,
    ReferenceLine,
    LineChart,
    BarChart,
    Line,
    Bar,
    Label,
    ComposedChart
} from 'recharts';

const graphTypes = {
    scatter: ScatterChart,
    line: LineChart,
    bar: BarChart,
    composed: ComposedChart
};

const graphContents = {
    scatter: Scatter,
    line: Line,
    bar: Bar
};

const axisTypes = {
    x: XAxis,
    y: YAxis,
    z: ZAxis
};

function Axis(props, key) {
    const SpecificAxis = axisTypes[props.axisType];
    return (
        <SpecificAxis {...props} key={key}>
            <Label
                value={props.label}
                position={props.orientation}
                angle={props.type === 'y' ? -90 : 0}
            />
        </SpecificAxis>
    );
}

class Plot extends PureComponent {

    renderAxes() {
        let axes = this.props.axes.map((axis) => {
            if (axis.axisType === 'x') {
                return (<XAxis key={axis.xAxisId} {...axis} />);
            }
            else {
                return (<YAxis key={axis.yAxisId} {...axis}/>);
            }
        });
        return axes;
    }
    /**
     * Renders legend for plot. Will by default render a legend if there are multiple
     * things being plotted, unless expliclty hidden.
     */
    renderLegend() {
        if (this.props.data.length > 1 && !this.props.legend.hidden){
            return ( <Legend {...this.props.legend} /> );
        }
    }

    renderData() {
        let data = this.props.data.map(plot => <Scatter key={plot.id} name={plot.name} fill={plot.fill} data={plot.data}/>);
        return data;
    }

    renderRefLine() {
        if (this.props.referenceLine) {
            return (<ReferenceLine />);
        }
    }

    render() {
        const Graph = graphTypes[this.props.graphType];

        return (
            <ResponsiveContainer minHeight={300} width='100%' aspect={2}>
                <Graph graphType={this.props.graphType}>
                    {/* { this.renderAxes() } */}
                    {/* { this.renderLegend() } */}
                    <XAxis dataKey={'f1'} name="Time [min]" type={'category'} allowDuplicatedCategory={false}/>
                    <YAxis dataKey={'f2'} name="CFU [CFU/ml]" type={'number'}/>
                    { this.renderData() }
                    {/* { this.renderRefLine() } */}
                    <Tooltip />
                    <Legend />
                    <CartesianGrid />
                </Graph>
            </ResponsiveContainer>
        );
    }
}

export default Plot;