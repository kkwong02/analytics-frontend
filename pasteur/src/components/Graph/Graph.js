import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory'


var Plotly = require('plotly.js/lib/index-basic');
const Plot = createPlotlyComponent(Plotly);

class Graph extends Component {
    render() {
        return (
            <Plot
                data={this.props.settings.data}
                layout={this.props.settings.layout}
                frames={this.props.settings.frames}
                config={this.props.settings.config}/>
        )
    }
}


export default Graph;