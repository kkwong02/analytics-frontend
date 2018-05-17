import React, { PureComponent } from "react";
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
    ComposedChart
} from "recharts";


const graphTypes = {
        scatter: ScatterChart,
        line: LineChart,
        bar: BarChart,
        composed: ComposedChart
}

const graphContents = {
    scatter: Scatter,
    line: Line,
    bar: Bar
}

const axisTypes = {
    x: XAxis,
    y: YAxis,
    z: ZAxis
}


function Axis(props, key) {
    const SpecificAxis = axisTypes[props.axisType]
    return <SpecificAxis {...props} key={key}/>
}

function Data(props) {
    const SpecificItem = graphContents[props.type]
    return <SpecificItem {...props}/>
}

class Plot extends PureComponent {

    renderAxes() {
        let axes = this.props.axes.map((axis, i) => Axis(axis, i));
        return axes;
    }
    /**
     * Renders legend for plot. Will by default render a legend if there are multiple
     * things being plotted, unless expliclty hidden.
     */
    renderLegend() {
        if (this.props.data.length > 1 && !this.props.legend.hidden){
            return ( <Legend {...this.props.legend} /> )
        }
    }

    renderData() {
        let data = this.props.data.map((item, i) => <Data key={i} {...item} />);
        return data;
    }

    render() {
        const Graph = graphTypes[this.props.graphType];

        return (
            <ResponsiveContainer minHeight={300} width='60%' aspect={1.25}>
                <Graph graphType={this.props.graphType} data={this.props.data}>
                { this.renderAxes() }
                { this.renderLegend() }
                { this.renderData() }
                <Tooltip />
                <CartesianGrid />
                </Graph>
            </ResponsiveContainer>
        )
    }
}

export default Plot;