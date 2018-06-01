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
            xAxisId: null,
            yAxisId: null,
            xVal: '',
            yVal: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidUpdate(){
        let x = this.state.xVal.match(re);
        let y = this.state.yVal.match(re);

        if (x&&y) {
            console.log('send');
            this.props.fetchData([this.state.xVal, this.state.yVal], this.props.plotter);
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
                                    <Input type="select" />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Y-Axis</Label>
                                    <Input onChange={this.onChangeHandler} name="yAxis" value={this.state.y}/>
                                    <Input type="select"/>
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
                ...this.props.tool,
                axes: [...this.props.tool.axes, axis]
            }
        });
    }

    fetchData(request, plotter) {
        let uuid = uuidv4();
        this.props.add_request(uuid, plotter);
        this.props.fetch_data(uuid, this.props.experiments, request);
    }

    newPlotter(){
        this.props.buffer_update({
            tool: {
                ...this.props.tool,
                plotters: [...this.props.tool.plotters, new Plotter()]
            }
        });
    }

    handleData(request_id) {

    }

    renderPlotters() {
        return this.props.tool.plotters.map(plotter => {
            return (
                <PlotterFrame key={plotter.id} plotter={plotter} fetchData={this.fetchData}/>
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
                                { this.props.tool_id &&
                                    <Plot {...this.props.tool}/>
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
                { this.props.tool_id && this.renderPlotters() }
            </React.Fragment>
        );
    }
}

GraphEditor.propTypes = {
    fetch_data: PropTypes.func.isRequired,
    add_request: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    experiments: state.buffer.experiments,
    tool: state.buffer.tool,
    tool_id: state.buffer.tool_id,
    experiments_list: state.buffer.experiments_list
});

export default connect(mapStateToProps, {fetch_data, add_request, buffer_update})(GraphEditor);