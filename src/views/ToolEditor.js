import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';

import { buffer_update, buffer_clear } from '../actions/bufferActions';

import ExperimentSelector from '../components/ExperimentSelector';

import GraphEditor from '../components/GraphEditor';

class ToolEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            select_experiments: false
        }
    }

    close() {
        this.props.history.push(this.props.prev);
    }
    componentDidMount() {
        let tool = this.props.tools.get(this.props.match.params.id);
        if (!tool) {
            this.close.bind(this)();
        }
        else {
            this.buffer_reset.bind(this)();
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
                data select
                </div>
                <Container>
                    <Row>
                        <Col>
                            <GraphEditor />
                            <button onClick={this.close.bind(this)}>close</button>
                        </Col>
                    </Row>
                    <ExperimentSelector isOpen={this.state.select_experiments}/>
                </Container>
                <div className="bg-white">Preferences
                TODO: Add missing style for this!</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tools: state.tools.tools_list
})

export default connect(mapStateToProps, {buffer_update, buffer_clear})(ToolEditor);