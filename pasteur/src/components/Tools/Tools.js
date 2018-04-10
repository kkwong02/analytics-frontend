import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap'
import Graph from '../Graph/Graph'

/**
 * Generates the default state and
 */
class ToolFactory {
    constructor(props) {
        this.props = props;
        this.tools = {
            'graph': this.buildGraph
        }
    }

    build() {

    }

    buildGraph(graphType) {
        settings = _graph_defaults[graphType] // default state.
    }


}

class ToolFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameName: null
        };
    }
    handleClose() {
        this.props.frameClose();
    }

    renderTool() {
        if (this.props.tool.toolType === 'plot') {
            return (<Graph settings={this.props.tool.plotSettings}/>)
        }
    }

    render() {
        return (
            <Card>
                <CardHeader>{this.props.tool.title}
                <button onClick={this.handleClose.bind(this)} type="button" className="close">
                    <span>&times;</span>
                </button>
                </CardHeader>
                <CardBody>
                    {this.renderTool()}
                </CardBody>
            </Card>
        )
    }

}

export default ToolFrame;