import React, {Component, PureComponent} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    Button
} from "reactstrap";

import Proptypes from "prop-types";
import {connect} from "react-redux";

import {join_session} from "../actions/sessionActions"
import SessionCreateModal from '../components/SessionCreateModal';

class SessionTile extends PureComponent {
    constructor(props) {
        super(props);

        this.join = this.join.bind(this)
    }

    join() {
        this.props.join(this.props.session)
    }

    render() {
        return (
            <div className="col-2 mb-3">
                <Card onClick={this.join}>
                    <CardBody>
                        <CardTitle>{this.props.session.name}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class Sessions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false
        }
        this.create_session_toggle = this
            .create_session_toggle
            .bind(this);

    }

    render_session_list() {
        let sessions = this
            .props
            .session_list
            .map(session => {
                return (<SessionTile join={this.props.join_session} key={session.id} session={session}/>)
            });

        return sessions;
    }
    create_session_toggle() {
        // do something to bring up modal
        this.setState((prevState) => {
            return {create: !prevState.create}
        })
    }

    render() {

        let sessions;
        if (this.props.session_list.length > 0) {
            sessions = this.render_session_list();
        }
        return (
            <main className="main pt-5">
                <Container fluid>
                    <Row className="justify-content-center align-items-center">
                        <Col lg="10">
                            <Card>
                                <CardBody>
                                    <CardTitle>Pasteur Analytics</CardTitle>
                                    Please Select an existing session or create a new one.
                                    <div className="row">
                                        <Button onClick={this.create_session_toggle}>Create New Session</Button>
                                        {sessions}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <SessionCreateModal toggle={this.create_session_toggle} create={this.state.create}/>
                </Container>
            </main>
        );
    }
}

Sessions.Proptypes = {
    session_list: Proptypes.array.isRequired,
    join_session: Proptypes.func.isRequired
};

const mapStateToProps = state => ({session_list: state.session.session_list})

export default connect(mapStateToProps, {join_session})(Sessions);
