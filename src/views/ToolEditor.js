import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Container } from "reactstrap";

import { connect } from "react-redux";

class ToolEditor extends Component {
    close() {
        this.props.history.push(this.props.prev);
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log("edit mount")
    }
    componentWillUnmount() {
        console.log("unmount");
    }
    render() {
        return (
            <React.Fragment>
                <div>
                data select
                </div>
                <Container>
                <button onClick={this.close.bind(this)}>close</button>
                </Container>
                <div>
                Preferences
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    buffer: state.buffer,
    tools: state.tools.tools_list
})

export default connect(mapStateToProps)(ToolEditor);