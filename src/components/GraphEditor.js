import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Plot from './Plot';
import { Row, Col, Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';

import { fetch_data, add_request, buffer_update } from '../actions/bufferActions';
import { connect } from 'react-redux';

import {Plotter, AxisProps} from '../toolFactories/GraphFactory';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

const uuidv4 = require('uuid/v4');

class AxisSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [],
        };

        this.createAxis = this.createAxis.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props) {
        return {options: props.axes.map(axis => ({
            value: axis.yAxisId || axis.xAxisId ,
            label: axis.name
        }))};
    }

    handleChange(selectedOption) {
        this.props.selectAxis(selectedOption, this.props.type);
    }

    createAxis(option){
        this.props.createAxis(this.props.type, option.label);
    }

    render() {
        return (
            <Select.Creatable
                placeholder='Select axis'

                onNewOptionClick={this.createAxis}
                promptTextCreator = {
                    label => {
                        return (`Create new axis "${label}"`);
                    }
                }
                options={this.state.options}
                required
                value={this.props.value}
                onChange={this.handleChange}
            />
        );
    }
}
class PlotterFrame extends Component {
    constructor(props) {
        super(props);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.selectAxis = this.selectAxis.bind(this);
        this.plot = this.plot.bind(this);
        this.createAxis = this.createAxis.bind(this);
    }
    selectAxis(selectedOption, axis) {
        this.props.setPlotter(this.props.plotter.id, {
            [`${axis}AxisId`]: selectedOption? selectedOption.value: null
        });
    }

    createAxis(axisType, axisLabel) {
        this.props.createAxis(axisType, axisLabel, this.props.plotter.id);
    }

    onChangeHandler(e) {
        this.props.setPlotter(this.props.plotter.id, {[`${e.target.name}Label`]: e.target.value});
    }

    plot(e) {
        e.preventDefault();
        this.props.fetchData([this.props.plotter.xAxisLabel, this.props.plotter.yAxisLabel], this.props.plotter.id);
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardHeader>Plot </CardHeader>
                        <CardBody>
                            <Form onSubmit={this.plot}>
                                <FormGroup row>
                                    <Label>X-Axis</Label>
                                    <Col>
                                        <Input onChange={this.onChangeHandler} name="xAxis" value={this.props.plotter.xAxisLabel}/>
                                    </Col>
                                    <Col sm={3}>
                                        <AxisSelect
                                            axes={this.props.axes.filter(axis => axis.axisType === 'x')}
                                            type='x'
                                            createAxis={this.createAxis}
                                            setPlotter={this.props.setPlotter}
                                            selectAxis={this.selectAxis}
                                            value={this.props.plotter.xAxisId}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label>Y-Axis</Label>
                                    <Col>
                                        <Input onChange={this.onChangeHandler} name="yAxis" value={this.props.plotter.yAxisLabel}/>
                                    </Col>
                                    <Col sm={3}>
                                        <AxisSelect
                                            axes = {
                                                this.props.axes.filter(axis => axis.axisType === 'y')
                                            }
                                            type='y'
                                            createAxis={this.createAxis}
                                            setPlotter={this.props.setPlotter}
                                            selectAxis={this.selectAxis}
                                            value={this.props.plotter.yAxisId}
                                        />
                                    </Col>
                                </FormGroup>
                                <Button>Plot</Button>
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
        this.setPlotter= this.setPlotter.bind(this);

        this.state = {

        };
    }

    createAxis(type, name, plotter) {
        let axis = new AxisProps(type, name);
        let plotters = [...this.props.tool.plotters];

        let plotterId = plotters.findIndex(item => item.id === plotter);
        plotters[plotterId][`${type}AxisId`] = axis[`${type}AxisId`];

        this.props.buffer_update({
            tool: {
                ...this.props.tool,
                axes: [...this.props.tool.axes, axis],
                plotters: plotters
            }
        });
    }

    setPlotter(id, value) {
        let plotter = this.props.tool.plotters.findIndex(plotter => plotter.id === id);

        let newPlotters = this.props.tool.plotters.slice();
        newPlotters[plotter] = Object.assign(newPlotters[plotter], value);


        this.props.buffer_update({
            tool: {
                ...this.props.tool,
                plotters: newPlotters
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

    renderPlotters() {
        return this.props.tool.plotters.map(plotter => {
            return (
                <PlotterFrame
                    key={plotter.id}
                    plotter={plotter}
                    fetchData={this.fetchData}
                    axes={this.props.tool.axes}
                    createAxis={this.createAxis.bind(this)}
                    setPlotter={this.setPlotter}
                />
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