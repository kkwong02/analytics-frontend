import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plot from './Plot';
import { Row, Col, Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

import { fetch_data, add_request, buffer_update } from '../actions/bufferActions';
import { connect } from 'react-redux';

import {Plotter, AxisProps, DataProps} from '../toolFactories/GraphFactory';
import Select from 'react-select';

const uuidv4 = require('uuid/v4');
const re = /('[^']+')/g;

class PlotterFrame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xAxis: '',
            yAxis: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate(){
        let x = this.state.xAxis.match(re);
        let y = this.state.yAxis.match(re);

        if (x&&y) {
            console.log('send');
        }
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>Plot </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label>X-Axis</Label>
                                    <Input onChange={this.onChangeHandler} name="xAxis" value={this.state.x}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Y-Axis</Label>
                                    <Input onChange={this.onChangeHandler} name="yAxis" value={this.state.y}/>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

// hard coding a scatter plot maker in because... i hate life right now.
class GraphEditor extends Component {
    constructor(props) {
        super(props);

        this.fetchData = this.fetchData.bind(this);
        this.newPlotter = this.newPlotter.bind(this);

        this.state = {

        };
    }

    createAxis(type) {
        let axis = new AxisProps(type);
        this.props.buffer_update({
            tool: {
                ...this.props.buffer.tool,
                axes: [...this.props.buffer.tool.axes, axis]
            }
        });
    }

    fetchData(request, plotter) {
        let uuid = uuidv4();
        this.props.add_request(uuid, plotter);
        this.props.fetch_data(uuid, ...request);
    }

    newPlotter(){
        this.props.buffer_update({
            tool: {
                ...this.props.buffer.tool,
                plotters: [...this.props.buffer.tool.plotters, new Plotter()]
            }
        });
    }

    handleData(request_id) {
        let request = this.props.buffer.request[request_id];
        let objs = this.props.buffer.experiments.map(exp => {
            let data;
            if (request.plotter.objects.hasOwnProperty(exp)) {
                data = {...this.buffer.tool.data[request.plotter.objects[exp]]};
                data.data = this.buffer.responses[request_id].filter(item => item.experiment === exp)[0];
                return data;
            }
            else {
                data = new DataProps(this.props.buffer.tool.type, '', request.plotter.xAxis, request.plotter.yAxis);
            }
        });
        this.props.buffer_update(objs);

    }

    renderPlotters() {
        return this.props.buffer.tool.plotters.map(plotter => {
            return (
                <PlotterFrame key={plotter.id} {...plotter}/>
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
                        <Button onClick={this.newPlotter}>New</Button>
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