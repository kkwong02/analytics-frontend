import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Input, InputGroup, InputGroupAddon, Button, Modal, ModalBody, ModalHeader, ModalFooter, Alert } from 'reactstrap';
import { connect } from 'react-redux';

import { fetch_experiments } from '../actions/modelFetchActions';
import { buffer_update } from '../actions/bufferActions';

class ExperimentSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            search: null,
            order_by: null,
            empty: false
        };

        this.fetch_experiments = this.fetch_experiments.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
        this.toggleSelectAll = this.toggleSelectAll.bind(this);

        this.checked = this.checked.bind(this);
        this.save = this.save.bind(this);

    }
    save() {
        if (this.props.experiments.length > 0) {
            this.props.toggle();
            this.setState({empty: false});
        }
        else {
            this.setState({empty: true});
        }
    }

    onSearchChange(e){
        this.setState({search: e.target.value})
    }

    fetch_experiments() {
        let params = {};
        if (this.state.search) {
            params.search = this.state.search;
        }

        if (this.state.filter) {
            params.filter = this.state.filter;
        }
        if (this.state.order_by) {
            params.order_by = this.state.order_by;
        }
        this.props.fetch_experiments(params);
    }

    componentDidMount() {
        this.fetch_experiments();
    }

    onCheckChange(e) {
        let val = Number(e.target.value);
        let experiments = [...this.props.experiments];

        if (e.target.checked) {
            experiments.push(val);
        }
        else {
            experiments = experiments.filter(value => value !== val);
        }

        this.props.buffer_update({
            experiments: experiments
        });
    }

    toggleSelectAll(e) {
        if (e.target.checked) {
            this.props.buffer_update({
                experiments: this.props.experiments_list.map(exp => exp.id)
            });
        }
        else {
            this.props.buffer_update({
                experiments: []
            })
        }
    }

    checked(id) {
        return this.props.experiments.includes(id);
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
            <Modal size='lg' isOpen={this.props.isOpen}>
                <ModalHeader>
                Experiments
                </ModalHeader>
                <ModalBody>
                    <div>
                        { this.state.empty &&
                            <Alert color="danger">Please select at least one experiment!</Alert>
                        }

                        <InputGroup>
                            <Input placeholder="Search"/>
                            <InputGroupAddon addonType="append"><Button>Search</Button></InputGroupAddon>
                        </InputGroup>

                        <Table>
                            <thead>
                                <tr>
                                    <td><input type='checkbox' name="all" onChange={this.toggleSelectAll} /></td>
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
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.save}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

ExperimentSelector.propTypes = {
    buffer: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    experiments: state.buffer.experiments,
    experiments_list: state.buffer.experiments_list
});

export default connect(mapStatetoProps, {fetch_experiments, buffer_update})(ExperimentSelector);