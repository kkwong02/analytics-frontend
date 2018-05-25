import React, {PureComponent} from 'react';
import { Media, ListGroupItem } from 'reactstrap';
import { connect } from "react-redux";

import { add_tool } from "../actions/toolActions";
import { GraphProps } from "../toolFactories/GraphFactory";

import { Route } from "react-router-dom";

class ToolboxTool extends PureComponent {
    constructor(props) {
        super(props);
        this.createTool = this
            .createTool
            .bind(this);
    }
    createTool(e) {
        // let tool;
        // if (this.props.tool.type === 'graph') {
        //     tool = new GraphProps(this.props.tool.graphType);
        // }
        // this.props.add_tool(tool);

    }

    render() {
        return (
            <Route render={(history) => (
                <ListGroupItem onClick={() => {
                    let tool;

                    if (this.props.tool === 'graph') {
                        new GraphProps(this.props.tool.graphType);
                    }
                    this.props.add_tool(tool);
                    history.push('/')
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