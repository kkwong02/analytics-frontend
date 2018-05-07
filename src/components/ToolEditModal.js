import React, { PureComponent } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { toggle_edit } from "../actions/toolActions";
import { connect } from "react-redux";

class ToolEditModal extends PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.props.toggle_edit(this.props.index);
    }
    render() {
        return (
            <Modal size='lg' isOpen={this.props.isOpen} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}></ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, {toggle_edit})(ToolEditModal);