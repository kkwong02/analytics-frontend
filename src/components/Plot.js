import React, { PureComponent } from "react";
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
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

function Graph(props) {
    const SpecificGraph = graphTypes[props.graphType]
    return <SpecificGraph data={this.props.data}/>
}

class Plot extends PureComponent {
    renderXAxes() {
        return this.props.XAxes.map((item, index) => {
            return (<XAxis key={index} label={item.label | item.dataKey} dataKey={item.dataKey} xAxisId={index}/>)
        })
    }
    renderYAxes() {
        return this.props.YAxes.map((item, index) => {
            return (<YAxis key={index} label={item.label | item.dataKey} dataKey={item.dataKey} yAxisId={index}/>)
        })
    }
    /**
     * Renders legend for plot. Will by default render a legend if there are multiple
     * things being plotted, unless expliclty hidden.
     */
    renderLegend() {
        if (this.props.data.length > 1 && !this.props.legend.hidden){
            return ( <Legend / > )
        }
    }

    renderData() {

    }

    render() {
        return (
            <ResponsiveContainer width='60%' aspect='1.25'>
                <Graph graphType={this.props.graphType} data={this.props.data}>
                { this.renderXAxes() }
                { this.renderYAxes() }
                { this.renderLegend() }
                { this.renderData() }
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                </Graph>
            </ResponsiveContainer>
        )
    }
}

export default Plot;