import React, {PureComponent} from 'react';
import { Media, ListGroupItem } from 'reactstrap';

import { add_tool } from "../actions/toolActions";
import { connect } from "react-redux";

class ToolboxTool extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this
            .onClick
            .bind(this);
    }
    onClick() {
        console.log(this.props.tool.params);
        this.props.add_tool({name:this.props.tool.name, params:this.props.tool.params});
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