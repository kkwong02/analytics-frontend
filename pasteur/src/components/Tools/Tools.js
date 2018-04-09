import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap'
import createPlotlyComponent from 'react-plotly.js/factory'

var Plotly = require('plotly.js/lib/index-basic');
const Plot = createPlotlyComponent(Plotly);

class PlotTool extends Component {
    render() {
        return (<Plot
            data={this.props.settings.data}
            layout={this.props.settings.layout}
            frames={this.props.settings.frames}
            config={this.props.settings.config}/>)
    }
}

class ToolFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameName: null
        };
    }

    renderTool() {
        if (this.props.tool.toolType === 'plot') {
            return (<PlotTool settings={this.props.tool.plotSettings}/>)
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>{this.props.tool.title}</CardHeader>
                <CardBody>
                    {this.renderTool()}
                </CardBody>
            </Card>
        )
    }

}

export default ToolFrame;