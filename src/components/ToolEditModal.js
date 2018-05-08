import React, {PureComponent} from 'react';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button} from "reactstrap";
import {toggle_edit} from "../actions/toolActions";
import {connect} from "react-redux";

import GraphEditor from "./GraphEditor";
import ExperimentSelector from "./ExperimentSelector";

const EXP = 'EXPERIMENTS';
const DATA = 'DATA';

class ToolEditModal extends PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);

        this.steps = [EXP, DATA];
        this.state = {
            current: 1 // default to getting and setting data
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.current) {
            return {current: nextProps.current}
        }
        return prevState;
    }

    next() {
        this.setState((prevState) => ({
            current: prevState.current += 1
        }));
    }

    prev() {
        this.setState((prevState) => ({
            current : prevState.current -= 1
        }));
    }

    toggle() {
        this.props.toggle_edit(this.props.id);
    }

    cancel() {
        // if newly created (non-number id),
        //  remove tool component from state
        // else
        //  just close modal
    }

    save() {
        //
    }

    render() {
        return (
            <Modal size='lg' isOpen={this.props.isOpen} >
            <ModalHeader toggle={this.toggle}>
            {this.props.title}
            </ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
                <Button color='danger' onClick={this.cancel}>
                Cancel
                </Button>
                <Button color='success' onClick={this.save}>
                Save
                </Button>
            </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, {toggle_edit})(ToolEditModal);