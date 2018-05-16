import React, {Component} from 'react';
import {tool_settings} from "../constants/_tools";
import { Collapse, ListGroup, ListGroupItem} from "reactstrap";

import ToolboxTool from "./ToolboxTool";

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

    render() {
        let tools = this
            .props
            .set
            .tools
            .map(tool => {
                return (<ToolboxTool key={tool.name} tool={tool}/>)
            });
        return (
            <React.Fragment>
                <div className="" onClick={this.toggle}>
                    {this.props.set.group_name}
                </div>
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
            <div className="toolbox">
                {tools}
            </div>
        );
    }
}

export default Toolbox;