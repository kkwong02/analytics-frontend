import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Plot } from "../constants/plotly";

import { Row, Col } from "reactstrap";

class GraphEditor extends PureComponent {
    render() {
        return (
            <div><Plot /></div>
        );
    }
}

GraphEditor.propTypes = {

};

export default GraphEditor;