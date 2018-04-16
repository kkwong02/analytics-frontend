import React, { Component } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory'
import DateField from '../Data'


var Plotly = require('plotly.js/lib/index-basic');
const Plot = createPlotlyComponent(Plotly);

class Graph extends Component {
    render() {
        let datafields;

        return (
            <div className="row">
                <div className="col">
                    <Plot
                        data={this.props.settings.data}
                        layout={this.props.settings.layout}
                        frames={this.props.settings.frames}
                        config={this.props.settings.config}/>
                </div>
                <div className="col-sm-3 bg-light">
                { datafields }
                </div>
            </div>
        )
    }
}


export default Graph;