import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import { connect } from "react-redux";

import { fetch_experiments } from "../actions/modelFetchActions";
import { update_buffer } from "../actions/toolActions";
class ExperimentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            search: null,
            order_by: null,
        }

        this.fetch_experiments = this.fetch_experiments.bind(this);
        this.save_experiment_set = this.save_experiment_set.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);

        this.checked = this.checked.bind(this);

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let tool = nextProps.tools.get(nextProps.id);
        return ({...prevState, tool: tool});
    }

    onSearchChange(e){
        this.setState({search: e.target.value})
    }

    fetch_experiments() {
        let params = {}
        if (this.state.search) {
            params.search = this.state.search
        }

        if (this.state.filter) {
            params.filter = this.state.filter
        }
        if (this.state.order_by) {
            params.order_by = this.state.order_by
        }
        this.props.fetch_experiments(params);
;    }

    save_experiment_set() {
        // ?????????
    }

    componentDidMount() {
        this.fetch_experiments();
    }

    onCheckChange(e) {
        let val = Number(e.target.value);
        let experiments = [...this.state.tool.buffer.experiments];

        if (e.target.checked) {
            experiments.push(val);
        }
        else {
            experiments = experiments.filter(value => value !== val);
        }

        this.props.update_buffer(this.props.id, {
            experiments: experiments
        })
    }

    toggleSelectAll(e) {
        if (e.target.checked) {
            this.props.update_buffer(this.props.id, {
                experiments: this.props.experiments_list.map(exp => exp.id)
            })
        }
        else {
            this.props.update_buffer(this.props.id, {
                experiments: []
            })
        }
    }


    checked(id) {
        return this.state.tool.buffer.experiments.includes(id)
    }

    renderTable() {
        return this.props.experiments_list.map(exp => {
            return (
                <tr key={exp.id}>
                    <td><input type="checkbox" checked={this.checked(exp.id)} value={exp.id} onChange={this.onCheckChange}/></td>
                    <td>{exp.friendly_name}</td>
                    <td>{exp.user}</td>
                    <td>{new Date(exp.create_timestamp).toDateString()}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <h4>Select Experiments</h4>
                <InputGroup>
                    <Input placeholder="Search"/>
                    <InputGroupAddon addonType="append"><Button>Search</Button></InputGroupAddon>
                </InputGroup>
                <Table>
                    <thead>
                        <tr>
                            <td><input type='checkbox' onChange={this.toggleSelectAll}/></td>
                            <td>Name</td>
                            <td>Scientist</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

ExperimentSelector.propTypes = {
    experiments_list: PropTypes.array.isRequired,
};

const mapStatetoProps = state => ({
    experiments_list: state.tools.experiments_set,
    tools: state.tools.tools_list
});

export default connect(mapStatetoProps, {fetch_experiments, update_buffer})(ExperimentSelector);