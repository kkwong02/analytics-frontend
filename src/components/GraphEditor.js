import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from './Plot';
import { Row, Col, Button } from 'reactstrap';

import { fetch_data, add_request } from '../actions/bufferActions';
import { connect } from 'react-redux';

const uuidv4 = require('uuid/v4');

class GraphEditor extends PureComponent {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(e) {
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        {/* if statement here because this will render before
                        parent's componentdidmount updates the buffer */}
                        { this.props.buffer.tool_id &&
                            <Plot {...this.props.buffer.tool}/>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Plot Data</h3>
                        <Button>New</Button>
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
});

export default connect(mapStateToProps, {fetch_data, add_request})(GraphEditor);