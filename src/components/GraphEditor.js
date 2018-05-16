import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Plot from "./Plot";
import { Row, Col } from "reactstrap";

class GraphEditor extends PureComponent {

    render() {
        let data = [{x:1, y1:1, y2:382}, {x: 2, y1: 2, y2:332}, {x: 3, y1: 3, y2:210}]

        return (
            <Plot graphType='scatter' data={data}/>
        );
    }
}

GraphEditor.propTypes = {

};

export default GraphEditor;