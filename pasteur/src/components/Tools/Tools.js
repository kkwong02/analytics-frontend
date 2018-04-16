import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap'
import Graph from '../Graph/Graph'
import GraphEditor from '../Graph/GraphEditor'

class ToolFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
    }
    handleClose() {
        this.props.frameClose();
    }

    renderTool() {
        if (this.props.tool.toolType === 'graph') {
            return (<Graph settings={this.props.tool.plotSettings}/>)
        }
    }
    handleEdit() {
        this.setState({edit: true});
    }

    finishEdit() {
        this.setState({edit: false});
    }

    render() {
        let variables;

        return (
            <div>
            <Card>
                <CardHeader>{this.props.tool.title}
                <div className="card-actions">
                    <button onClick={this.handleEdit.bind(this)}>Edit</button>
                    <button onClick={this.handleClose.bind(this)} type="button" className="close">
                        <span>&times;</span>
                    </button>
                </div>

                </CardHeader>
                <CardBody>
                    {this.renderTool()}
                </CardBody>
            </Card>
            <GraphEditor isOpen={this.state.edit} finishEdit={this.finishEdit.bind(this)}/>
            </div>
        )
    }

}

export default ToolFrame;