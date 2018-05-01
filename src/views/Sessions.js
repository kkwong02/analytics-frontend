import React, {Component} from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    CardDeck,
    Container,
    Row,
    Col
} from "reactstrap";

import {connect} from "react-redux";

class Sessions extends Component {
    render_session_list() {
        this
            .props
            .session_list
            .map(session => {
                return (
                    <Card key={session.id}>
                        <CardBody>
                            <CardTitle>{session.name}</CardTitle>
                        </CardBody>
                    </Card>
                )
            })
    }

    render() {
        console.log(this.props.session_list)
        return (
            <main className="main pt-5">
                <Container fluid>
                    <Row className="justify-content-center align-items-center">
                        <Col lg="10">
                            <Card>
                                <CardBody>
                                    <CardTitle>Pasteur Analytics</CardTitle>
                                    Please Select an existing session or create a new one.
                                    <CardDeck></CardDeck>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = state => ({session_list: state.session_list})

export default connect(mapStateToProps, {})(Sessions);