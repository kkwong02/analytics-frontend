import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Container } from "reactstrap";

import { connect } from "react-redux";

import { buffer_update } from "../actions/bufferActions";

import ExperimentSelector from "../components/ExperimentSelector";

class ToolEditor extends Component {
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
        console.log("edit mount")
    }

    buffer_reset() {
        let tool = this.props.tools.get(this.props.match.params.id);
        console.log(this.props)
        this.props.buffer_update({id: this.props.id, tool: tool.tool, experiments: tool.experiments});
    }
    componentWillUnmount() {
        console.log("unmount");
    }
    render() {
        return (
            <React.Fragment>
                <div className="bg-white">
                data select
                </div>
                <Container>
                <button onClick={this.close.bind(this)}>close</button>
                </Container>
                <div className="bg-white">
                Preferences
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    tools: state.tools.tools_list
})

export default connect(mapStateToProps, {buffer_update})(ToolEditor);