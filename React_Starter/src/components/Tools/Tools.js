import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap'
import createPlotlyComponent from 'react-plotly.js/factory'

var Plotly = require('plotly.js/lib/index-basic');
const Plot = createPlotlyComponent(Plotly);


class PlotTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            layout: {autosize: true},
            frames: null,
            config: {
                displayModeBar: false,
            }
        };
    }

    render() {
        return (<Plot
            data={this.state.data}
            layout={this.state.layout}
            frames={this.state.frames}
            config={this.state.config}
        />)
    }
}

class ToolFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameName: null,
        };
    }

    renderTool() {
        if (this.props.toolType === 'plot') {
            return (<PlotTool />)
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>Tool</CardHeader>
                <CardBody>
                {this.renderTool()}
                </CardBody>
            </Card>
            )
    }

}

export default ToolFrame;