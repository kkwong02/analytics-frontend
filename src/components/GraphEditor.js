import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from "./Plot";
import { Row, Col } from "reactstrap";

import { fetch_data, add_request } from "../actions/toolActions";
import { connect } from "react-redux";

const uuidv4 = require('uuid/v4')

class GraphEditor extends PureComponent {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(e) {
        // need to get experiments from state!
        e.preventDefault();
        console.log(this.props);
        // let uuid = uuidv4();
        // this.props.add_request(uuid, this.props.id);
        // this.props.fetch_data(uuid);
    }

    render() {
        return (
            <React.Fragment>
                <Plot {...this.props}/>
                <Row>
                <Col>
                <form onSubmit={this.fetchData}>
                    <input name="x" type='text' placeholder='x' required/>
                    <input name="y" type='text' placeholder='y' required/>
                    <button>Graph</button>
                </form>
                </Col>

                </Row>
            </React.Fragment>
        );
    }
}

GraphEditor.propTypes = {
    fetch_data: PropTypes.func.isRequired,
    add_request: PropTypes.func.isRequired
};

export default connect(null, {fetch_data, add_request})(GraphEditor);