import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class MainContent extends Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {
        return (
            <div />
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