import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from "reactstrap";

import Tool from "./Tool";
import { connect } from 'react-redux';

import Toolbox from "./Toolbox";

import { withRouter } from "react-router-dom";

const ToolWithRouter = withRouter(Tool);

class MainContent extends Component {
    constructor(props){
        super(props);
        this.render_tools = this.render_tools.bind(this);
    }
    render_tools(){
        return Array.from(this.props.tools_list).map(([key, value]) => {
            return (
                <Row key={key}>
                    <Col>
                        <ToolWithRouter id={key} {...value} location={this.props.match.url}/>
                    </Col>
                </Row>);
        });
    }

    render() {
        console.log(this.props.tools_list)
        return (
            <React.Fragment>
                <Toolbox from={this.props.location.pathname}/>
                <div>
                    <Button>Exit Session</Button>
                    <Button>Export</Button>
                </div>
                <Container>
                    {this.render_tools()}
                </Container>
            </React.Fragment>
        );
    }
}

MainContent.propTypes = {
    tools_list: PropTypes.instanceOf(Map).isRequired
};

const mapStateToProps = state => ({
    tools_list: state.tools.tools_list
});

export default connect(mapStateToProps)(MainContent);