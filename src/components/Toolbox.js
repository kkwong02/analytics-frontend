import React, {Component, PureComponent} from 'react';
import {tool_settings} from "../constants/_tool_defaults";
import {Media, Collapse, ListGroup, ListGroupItem} from "reactstrap";

class Tool extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this
            .onClick
            .bind(this);
    }
    onClick() {
        console.log(this.props.tool.default);
    }

    render() {
        return (
            <ListGroupItem onClick={this.onClick}>
                <Media>
                    <Media object data-src={this.props.tool.icon}/>
                    <Media body>{this.props.tool.name}</Media>
                </Media>
            </ListGroupItem>
        )
    }
}

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
                return (<Tool key={tool.name} tool={tool}/>)
            });
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