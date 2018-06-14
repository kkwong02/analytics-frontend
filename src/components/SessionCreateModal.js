import React, {Component} from 'react';
import Proptype from 'prop-types';

import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import {connect} from 'react-redux';
import {join_session} from '../actions/sessionActions';
import {withRouter} from 'react-router-dom';


class SessionCreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            name: '',
            project: null
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.join_session({
            name: this.state.name,
            project: this.state.project
        });
    }

    componentDidUpdate(prevProps) {
        // props.session should only exist after session is successfully created.
        if (this.props.session && !prevProps.session) {
            this.props.history.push(`/sessions/${this.props.session.id}`);
        }
    }

    render() {

        return (
            <Modal size="lg" toggle={this.props.toggle} isOpen={this.props.create}>
                <ModalHeader toggle={this.props.toggle}>New Session</ModalHeader>
                <ModalBody>
                    <Form id="newSessionForm" onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Session Name</Label>
                            <Input onChange={this.onChange} name="name"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="project">Project</Label>
                            {/* TODO: Add autocomplete for this later. */}
                            <Input name="project" onChange={this.onChange}/>

                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" form="newSessionForm">Save</Button>
                    <Button onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    session: state.session.current_session
});

SessionCreateModal.Proptypes = {
    join_session: Proptype.func.isRequired
};

export default withRouter(connect(mapStateToProps, {join_session})(SessionCreateModal));