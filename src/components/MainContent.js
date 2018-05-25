import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from "reactstrap";

import Tool from "./Tool";
import { connect } from 'react-redux';

import Toolbox from "./Toolbox";

class MainContent extends Component {
    constructor(props){
        super(props);
        this.render_tools = this.render_tools.bind(this);
    }
    render_tools(){
        return Array.from(this.props.tools_list).map(([key, value]) => {
            return (<Tool key={key} id={key} {...value} location={this.props.match.url}/>)
        })
    }

    render() {
        return (
            <React.Fragment>
            <Toolbox from={this.props.location.pathname}/>
            {this.render_tools()}
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