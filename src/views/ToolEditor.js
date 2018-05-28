import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
            <div>
                EDITOR!
                <button onClick={this.close.bind(this)}>close</button>
            </div>
        );
    }
}

export default ToolEditor;