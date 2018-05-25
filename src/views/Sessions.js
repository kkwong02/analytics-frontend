import React, {Component, PureComponent} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardDeck,
    Container,
    Row,
    Col,
    Button
} from "reactstrap";

import Proptypes from "prop-types";
import {connect} from "react-redux";

import {list_sessions} from "../actions/sessionActions"
import SessionCreateModal from '../components/SessionCreateModal';

import { Link } from "react-router-dom";


class SessionTile extends PureComponent {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.delete_session(this.props.session);
    }


    render() {
        return (
            <Link to={'/sessions/' + String(this.props.session.id)}>
                <Card onClick={this.join}>
                    <CardBody>
                        <CardTitle>{this.props.session.name}</CardTitle>
                    </CardBody>
                </Card>
            </Link>
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

    componentDidMount() {
        this.props.list_sessions();
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
            <Container fluid className="pt-5">
                <Row className="justify-content-center align-items-center">
                    <CardDeck>
                        <Card onClick={this.create_session_toggle}>
                            <CardBody>Create Session</CardBody>
                        </Card>
                        {sessions}
                    </CardDeck>
                </Row>
                <SessionCreateModal toggle={this.create_session_toggle} create={this.state.create}/>
            </Container>
        );
    }
}

Sessions.Proptypes = {
    session_list: Proptypes.array.isRequired,
    join_session: Proptypes.func.isRequired
};

const mapStateToProps = state => ({session_list: state.session.session_list})

export default connect(mapStateToProps, {list_sessions})(Sessions);
