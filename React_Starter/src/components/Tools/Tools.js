import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap'
import Plot from 'react-plotly.js';


class PlotTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            layout:{},
            frames: [],
            config: {},
            query: {}
        }
    }
}

class ToolFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameName: null;
            data: null;
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>{this.state.frameName||this.propsToolName}</CardHeader>
                <CardBody>
                    {this.renderTool()}
                </CardBody>
            </Card>
            )
    }

    renderTool() {
        if this.props.toolType === 'plot' {
            return (
                <PlotTool/>
                )
        }
    }
}