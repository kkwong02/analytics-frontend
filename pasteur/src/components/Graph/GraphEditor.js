import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

class GraphEditor extends Component {
    cancelEdit() {
        this.props.finishEdit();
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.cancelEdit.bind(this)}>Edit</ModalHeader>
                <ModalBody>No idea what goes here.</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.cancelEdit.bind(this)} >Cancel</Button>
                    <Button color="primary">Save</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default GraphEditor;