import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";
import { connect } from "react-redux";

import { fetch_experiments } from "../actions/modelFetchActions";

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
        e.persist();
        if (e.target.checked) {
            this.setState(prevState => {
                return {selected: [...prevState.selected, e.target.value]}
            })
        }
        else {
            this.setState(prevState => ({
                selected: prevState.selected.filter(item => item !== e.target.value)
            }))
        }
    }

    toggleSelectAll(e) {
        if (e.target.checked) {
            this.setState({selected: this.props.experiments_list.map(exp => exp.id)})
        }
        else {
            this.setState({selected: []})
        }
    }

    renderTable() {
        return this.props.experiments_list.map(exp => {
            return (
                <tr key={exp.id}>
                    <td><input type="checkbox" value={exp.id} onChange={this.onCheckChange}/></td>
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
});

export default connect(mapStatetoProps, {fetch_experiments})(ExperimentSelector);