import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from "reactstrap";

import Tool from "./Tool";
import { connect } from 'react-redux';

class MainContent extends Component {
    constructor(props){
        super(props);
        this.render_tools = this.render_tools.bind(this);
    }
    render_tools(){
        return this.props.tools_list.map((tool, index) => {
            return (<Tool key={tool.id} params={tool} index={index}/>)
        })
    }

    render() {
        return (
            <Container>
            {this.render_tools()}
            </Container>
        );
    }
}

MainContent.propTypes = {
    tools_list: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    tools_list: state.tools.tools_list
});

export default connect(mapStateToProps)(MainContent);