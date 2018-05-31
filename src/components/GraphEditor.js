import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plot from './Plot';
import { Row, Col, Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

import { fetch_data, add_request, buffer_update } from '../actions/bufferActions';
import { connect } from 'react-redux';

import {Plotter} from '../toolFactories/GraphFactory';

const uuidv4 = require('uuid/v4');

// hard coding a scatter plot maker in because... i hate life right now.
class GraphEditor extends Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.newPlot = this.newPlot.bind(this);

        this.state = {

        };
    }

    fetchData(e) {
        e.preventDefault();
    }

    newPlot(){
        this.props.buffer_update({
            tool: {
                ...this.props.buffer.tool,
                plotters: [...this.props.buffer.tool.plotters, new Plotter()]
            }
        });
    }

    renderPlotters() {
        return this.props.buffer.tool.plotters.map(plotter => {
            return (
                <Row key={plotter.id}>
                    <Col>
                        <Card>
                            <CardHeader>Plot </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label>X-Axis</Label>
                                        <Input name="x-axis" value={''}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Y-Axis</Label>
                                        <Input name="y=axis" value={''}/>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>Preview</CardHeader>
                            <CardBody>
                                {/* if statement here because this will render before
                                parent's componentdidmount updates the buffer */}
                                { this.props.buffer.tool_id &&
                                    <Plot {...this.props.buffer.tool}/>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Plot Data</h3>
                        <Button onClick={this.newPlot}>New</Button>
                    </Col>
                </Row>
                { this.props.buffer.tool_id && this.renderPlotters() }
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

export default connect(mapStateToProps, {fetch_data, add_request, buffer_update})(GraphEditor);