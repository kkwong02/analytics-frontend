import React, {Component} from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from "reactstrap";

class SessionCreateModal extends Component {
    constructor(props){
        this.create_session = this.create_session.bind(this);
    }

    create_session(){
        // take new sesssion state and send to the server
        // server will handle whatever happens.
    }

    render() {
        return (
            <Modal>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <form action="create_session"></form>
                </ModalBody>
                <ModalFooter>
                    <Button>Save</Button>
                    <Button>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default SessionCreateModal;