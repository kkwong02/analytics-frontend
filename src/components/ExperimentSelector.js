import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from "reactstrap";
import { connect } from "react-redux";

import { fetch_experiments } from "../actions/modelFetchActions";
class ExperimentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            search: null,
            order_by: null,
            selected: []
        }

        this.fetch_experiments = this.fetch_experiments.bind(this);
        this.save_experiment_set = this.save_experiment_set.bind(this);
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
    }

    save_experiment_set() {
        // ?????????
    }

    componentDidMount() {
        this.fetch_experiments();
    }

    renderTable() {
        <tr>
            <td><input type="checkbox"/></td>
        </tr>
    }

    render() {
        return (
            <div>
            {this.renderTable}
            </div>
        );
    }
}

ExperimentSelector.propTypes = {
    experiment_list: PropTypes.array.isRequired
};

const mapStatetoProps = state => ({
    experiments: state.tools.experiments
});

export default connect(mapStatetoProps, {fetch_experiments})(ExperimentSelector);