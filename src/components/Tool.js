import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';

import { toggle_minimize, delete_tool } from '../actions/toolActions';

import { connect } from 'react-redux';

import Plot from './Plot';
import { buffer_clear, buffer_update } from '../actions/bufferActions';

import { Link } from 'react-router-dom';


class Tool extends Component {
    constructor(props) {
        super(props);
        this.toggle_minimize = this.toggle_minimize.bind(this);
        this.remove_card = this.remove_card.bind(this);
    }

    /**
     * Toggle minimize state of the card.
     */
    toggle_minimize() {
        this.props.toggle_minimize(this.props.id);
    }


    remove_card() {
        this.props.delete_tool(this.props.id);
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        {this.props.tool.name}
                        <div className='card-header-actions'>
                            <Link to={this.props.match.url + '/edit/' + this.props.id}>Edit</Link>
                            <a className="card-header-action btn btn-minimize" onClick={this.toggle_minimize}>Minimize</a>
                            <a className="card-header-action btn btn-close" onClick={this.remove_card}>Close</a>
                        </div>
                    </CardHeader>
                    <Collapse isOpen={this.props.isOpen}>
                        <CardBody>
                            <Plot {...this.props.tool}/>
                        </CardBody>
                    </Collapse>
                </Card>
            </React.Fragment>
        );
    }
}

Tool.propTypes = {
    toggle_minimize: PropTypes.func.isRequired,
};

export default connect(null, {toggle_minimize, delete_tool, buffer_clear, buffer_update})(Tool);