import React, {Component} from 'react';
import {tool_settings} from "../constants/_tool_defaults";
import {Media, Collapse, ListGroup, ListGroupItem} from "reactstrap";

class ToolSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        }

        this.toggle = this
            .toggle
            .bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render_tool(tool) {
        return (
            <ListGroupItem key={tool.name}>
                <Media>
                    <Media object data-src={tool.icon} />
                    <Media body>{tool.name}</Media>
                </Media>
            </ListGroupItem>
        );
    }

    render() {
        let tools = this.props.set.tools.map(tool => this.render_tool(tool));
        return (
            <React.Fragment>
                <ListGroupItem onClick={this.toggle}>
                    {this.props.set.group_name}
                </ListGroupItem>
                <Collapse isOpen={this.state.collapsed}>
                    <ListGroupItem>
                        <ListGroup>
                            {tools}
                        </ListGroup>
                    </ListGroupItem>
                </Collapse>
            </React.Fragment>
        )
    }
}

class Toolbox extends Component {

    render() {
        let tools = tool_settings.map((set, index) => {
            return (<ToolSet key={index} set={set}/>)
        });
        return (
            <ListGroup>
                {tools}
            </ListGroup>
        );
    }
}

export default Toolbox;