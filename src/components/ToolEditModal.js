import React, {Component} from 'react';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button} from "reactstrap";
import {toggle_edit, delete_tool, save_tool } from "../actions/toolActions";
import {connect} from "react-redux";

import GraphEditor from "./GraphEditor";
import ExperimentSelector from "./ExperimentSelector";

import { buffer_clear, buffer_update } from "../actions/bufferActions";

const EXP = 'EXPERIMENTS';
const DATA = 'DATA';

class ToolEditModal extends Component {
    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);

        this.update = this.update.bind(this);

        this.steps = [EXP, DATA];
        this.state = {
            current: 0// default to getting and setting data
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.current) {
            return {current: nextProps.current}
        }
        return prevState;
    }

    /**
     * Go to next step. Handler function.
     */
    next() {
        this.setState((prevState) => ({
            current: prevState.current += 1
        }));
    }

    /**
     * Go to previous step. Handler function.
     */
    prev() {
        this.setState((prevState) => ({
            current : prevState.current -= 1
        }));
    }
    /**
     * Updates the buffer state. Passed to children in body.
     * @param {Object} content - the contents of the state. needs to be the entire state.
     */
    update(content) {
    }

    /**
     * Handler for cancelling creation or editing.
     * Deletes tool if it's newly created (not saved to server).
     */
    cancel() {

        if (typeof(this.props.id) === 'string') {
            this.props.delete_tool(this.props.id);
        }
        else {
            this.props.toggle_edit(this.props.id);
        };
    }

    componentWillUnmount () {
    }

    /**
     * Handler for saving edits. Saves the buffer state to the tool state, saves to server
     * and closes modal.
     */
    save() {
        this.props.save_tool(this.props.id, this.props.buffer.tool)
        this.props.toggle_edit(this.props.id);
    }

    renderContent() {
        if (this.state.current === 0) {
            return (<ExperimentSelector />)
        }
        else if (this.state.current === 1) {
            return (<GraphEditor id={this.props.id}/>)
        }
    }

    render() {
        return (
            <Modal size='lg' isOpen={this.props.isOpen} >
            <ModalHeader toggle={this.cancel}>
            {this.props.buffer.tool.name}
            </ModalHeader>
            <ModalBody>
                {this.renderContent()}
            </ModalBody>
            <ModalFooter>
                <Button disabled={this.state.current === 0} onClick={this.prev}>Back</Button>
                <Button disabled={this.state.current === this.steps.length -1} onClick={this.next}>Next</Button>
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

const mapStateToProps = state => ({
    buffer: state.buffer
})

export default connect(mapStateToProps, {toggle_edit, delete_tool, save_tool, buffer_clear, buffer_update})(ToolEditModal);