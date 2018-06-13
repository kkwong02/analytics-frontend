import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';

import { connect } from 'react-redux';

import { buffer_update, buffer_clear } from '../actions/bufferActions';
import { edit_tool } from '../actions/toolActions';


import ExperimentSelector from '../components/ExperimentSelector';

import GraphEditor from '../components/GraphEditor';

class ToolEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            select_experiments: false,
        };
        this.toggleExperimentSelector = this.toggleExperimentSelector.bind(this);
        this.buffer_reset = this.buffer_reset.bind(this);
        this.save = this.save.bind(this);
    }

    toggleExperimentSelector () {
        this.setState({select_experiments: !this.state.select_experiments});
    }

    close() {
        this.props.history.push(this.props.prev);
    }

    save() {
        this.props.edit_tool(this.props.buffer.tool_id, this.props.buffer.tool, this.props.buffer.experiments);
        this.close();
    }

    componentDidMount() {
        let tool = this.props.tools.get(this.props.match.params.id);
        if (!tool) {
            this.close.bind(this)();
        }
        else {
            this.buffer_reset();
        }
        if (this.props.match.params[0] === 'new') {
            this.setState({select_experiments: true});
        }
    }

    buffer_reset() {
        let tool = this.props.tools.get(this.props.match.params.id);
        this.props.buffer_update({
            tool_id: this.props.match.params.id,
            tool: tool.tool,
            experiments: tool.experiments
        });
    }
    componentWillUnmount() {
        this.props.buffer_clear();
    }
    render() {
        return (
            <React.Fragment>
                <div className="toolbox">
                    <Button onClick={this.toggleExperimentSelector}>Select Experiments</Button>
                    data select
                </div>
                <Container>
                    <Row>
                        <Col>
                            <Button onClick={this.close.bind(this)}>Cancel</Button>
                            <Button onClick={this.save}>Save</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <GraphEditor />
                        </Col>
                    </Row>
                    <ExperimentSelector toggle={this.toggleExperimentSelector} isOpen={this.state.select_experiments}/>
                </Container>
                {/* Hiding for now to reduce screen clutter.
                <div className="bg-white">Preferences
                TODO: Add missing style for this!</div> */}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tools: state.tools.tools_list,
    buffer: state.buffer
});

export default connect(mapStateToProps, {buffer_update, buffer_clear, edit_tool})(ToolEditor);