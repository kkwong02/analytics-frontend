import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from "./Plot";
import { Row, Col } from "reactstrap";

import { fetch_data, add_request } from "../actions/bufferActions";
import { connect } from "react-redux";

const uuidv4 = require('uuid/v4')

class GraphEditor extends PureComponent {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(e) {
        e.preventDefault();

        let uuid = uuidv4();

        let request = {
            'f1' : {
                type: 'axis',
                xAxisId: e.target[0].name,
                name: e.target[0].value
            },
            'f2' : {
                type: 'scatter',
                yAxisId: e.target[1].name,
                yAxisId: e.target[1].name,
                name: e.target[1].value
            }
        }
        this.props.add_request(uuid, this.props.id, {});
        this.props.fetch_data(uuid, this.props.buffer.experiments, [e.target[0].value, e.target[1].value]);
    }

    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <Row>
                <Col>
                    { this.props.buffer.tool_id &&
                    <Plot {...this.props.buffer.tool}/>
                }
                </Col>
                </Row>
            </React.Fragment>
        );
    }
}

GraphEditor.propTypes = {
    fetch_data: PropTypes.func.isRequired,
    add_request: PropTypes.func.isRequired,
    buffer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    buffer: state.buffer
})

export default connect(mapStateToProps, {fetch_data, add_request})(GraphEditor);