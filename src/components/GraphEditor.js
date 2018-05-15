import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, ScatterChart, Scatter, Tooltip, ReferenceLine, LineChart, BarChart, Line, Bar, ComposedChart } from "recharts";

import { Row, Col } from "reactstrap";

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
        let XAxes = this.props.XAxes.map((item, index) => {
            return (<XAxis key={index} label={item.label | item.dataKey} dataKey={item.dataKey} xAxisId={index}/>)
        })
    }
    renderYAxes() {

    }
    renderLegend() {

    }

    renderData() {

    }

    render() {
        return (
            <ResponsiveContainer height={300} width='60%'>
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

class GraphEditor extends PureComponent {

    render() {
        let data = [{x:1, y1:1, y2:382}, {x: 2, y1: 2, y2:332}, {x: 3, y1: 3, y2:210}]

        return (
            <Plot graphType='scatter' data={data}/>
        );
    }
}

GraphEditor.propTypes = {

};

export default GraphEditor;