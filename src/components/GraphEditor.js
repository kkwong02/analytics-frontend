import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from "./Plot";
import { Row, Col } from "reactstrap";

class GraphEditor extends PureComponent {

    render() {
        return (
            <Plot {...this.props}/>
        );
    }
}

GraphEditor.propTypes = {

};

export default GraphEditor;