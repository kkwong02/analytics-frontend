import React, {PureComponent} from 'react';
import { Media, ListGroupItem } from 'reactstrap';
import { connect } from "react-redux";

import { add_tool } from "../actions/toolActions";
import { GraphProps } from "../toolFactories/GraphFactory";

class ToolboxTool extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this
            .onClick
            .bind(this);
    }
    onClick() {
        let tool;
        if (this.props.tool.type === 'graph') {
            tool = new GraphProps(this.props.tool.graphType);
        }
        this.props.add_tool(tool);
    }

    render() {
        return (
            <ListGroupItem onClick={this.onClick}>
                <Media>
                    <Media object src={this.props.tool.icon}/>
                    <Media className="ml-2" body>
                        {this.props.tool.name}
                    </Media>
                </Media>
            </ListGroupItem>
        )
    }
}


export default connect(null, {add_tool})(ToolboxTool);