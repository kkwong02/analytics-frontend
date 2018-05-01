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

class SessionTile extends PureComponent {
    constructor(props) {
        super(props);
        this.on_click_handler = this
            .on_click_handler
            .bind(this);
    }

    on_click_handler() {
        // dispatch SERVER/SESSION.JOIN Action
        console.log("Connect to session", this.props.session.id);
    }

    render() {
        return (
            <div className="col-2 mb-3">
                <Card onClick={this.on_click_handler}>
                    <CardBody>
                        <CardTitle>{this.props.session.name}</CardTitle>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

class Sessions extends Component {
    constructor(props){
        super(props);
        this.create_session_click = this.create_session_click.bind(this);

    }

    render_session_list() {
        let sessions = this
            .props
            .session_list
            .map(session => {
                return (<SessionTile key={session.id} session={session}/>)
            });

        return sessions;
    }
    create_session_click(){
        // do something to bring up modal
        console.log("Create Session");
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
                                    <Button onClick={this.create_session_click}>Create New Session</Button>
                                        {sessions}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}

Sessions.Proptypes = {
    session_list: Proptypes.array.isRequired
};

const mapStateToProps = state => ({session_list: state.session.session_list})

export default connect(mapStateToProps, {})(Sessions);
