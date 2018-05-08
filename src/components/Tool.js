import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap'
import PropTypes from 'prop-types'

import { toggle_minimize, toggle_edit } from "../actions/toolActions";

import GraphTool from './GraphTool'

import { connect } from "react-redux";
import ToolEditModal from './ToolEditModal';


class Tool extends Component {
    constructor(props) {
        super(props);
        this.toggle_minimize = this.toggle_minimize.bind(this);
        this.remove_card = this.remove_card.bind(this);
        this.toggle_edit = this.toggle_edit.bind(this);
    }

    /**
     * Toggles edit modal.
     */
    toggle_edit() {
        this.props.toggle_edit(this.props.index);
    }

    /**
     * Toggle minimize state of the card.
     */
    toggle_minimize() {
        this.props.toggle_minimize(this.props.index);
    }

    /**
     * removes the tool card.
     * TODO: Implement this.
     */
    remove_card() {
        if (typeof(this.props.params.id) === 'string') {
            // just remove from state if not saved on server
        }
        else if (typeof(this.props.params.id === 'number')){
            // delete from server then let the reducer delete from state
        }
        // if anything else (not really sure how, really) ignore
    }

    render() {
        return (
            <React.Fragment>
            <Card>
                <CardHeader>
                {this.props.params.tool.name}
                <div className='card-header-actions'>
                    <a className="card-header-action btn btn-setting" onClick={this.toggle_edit}>Edit</a>
                    <a className="card-header-action btn btn-minimize" onClick={this.toggle_minimize}>Minimize</a>
                    <a className="card-header-action btn btn-close" onClick={this.remove_card}>Close</a>
                </div>
                </CardHeader>
                <Collapse isOpen={this.props.params.isOpen}>
                    <CardBody>
                        <GraphTool params={this.props.params}/>
                    </CardBody>
                </Collapse>
            </Card>
            <ToolEditModal isOpen={this.props.params.edit} index={this.props.index} toggle={this.props.toggle_edit}/>
            </React.Fragment>
        );
    }
}

Tool.propTypes = {
    toggle_minimize: PropTypes.func.isRequired,
    toggle_edit: PropTypes.func.isRequired
};

export default connect(null, {toggle_minimize, toggle_edit})(Tool);