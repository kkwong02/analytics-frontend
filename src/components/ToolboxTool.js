import React, {PureComponent} from 'react';
import { Media, ListGroupItem } from 'reactstrap';
import { connect } from "react-redux";

import { add_tool } from "../actions/toolActions";
import { GraphProps } from "../toolFactories/GraphFactory";

import { Route } from "react-router-dom";

const uuidv4 = require('uuid/v4')


class ToolboxTool extends PureComponent {
    constructor(props) {
        super(props);
        this.createTool = this
            .createTool
            .bind(this);
    }
    createTool(e) {
        let tool;
        if (this.props.tool.type === 'graph') {
            tool = new GraphProps(this.props.tool.graphType);
        }
        this.props.add_tool(tool);

    }

    render() {
        return (
            <Route render={() => (
                <ListGroupItem onClick={() => {
                    let tool;

                    if (this.props.tool.type === 'graph') {
                        tool = new GraphProps(this.props.tool.graphType);
                    }
                    let uuid = uuidv4();

                    this.props.add_tool(tool, uuid);

                    this.props.history.push(this.props.location.pathname + '/new/' + uuid);
                }} >
                    <Media>
                        <Media object src={this.props.tool.icon}/>
                        <Media className="ml-2" body>
                            {this.props.tool.name}
                        </Media>
                    </Media>
                </ListGroupItem>
            )}>
            </Route>
        )
    }
}


export default connect(null, {add_tool})(ToolboxTool);