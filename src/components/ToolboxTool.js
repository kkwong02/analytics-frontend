import React, {PureComponent} from 'react';
import { Media, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

class ToolboxTool extends PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this
            .onClick
            .bind(this);
    }
    onClick() {
        console.log(this.props.tool.params);
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

ToolboxTool.propTypes = {};

export default ToolboxTool;