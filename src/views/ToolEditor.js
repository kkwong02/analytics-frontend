import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Container } from "reactstrap";

class ToolEditor extends Component {
    close() {
        this.props.history.push(this.props.prev);
    }
    componentDidMount() {
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

export default ToolEditor;