import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap'
import createPlotlyComponent from "react-plotly.js/factory";

import Plotly from "plotly.js/lib/index-basic";

const Plot = createPlotlyComponent(Plotly);

class GraphTool extends Component {
    render() {
        return (
            <React.Fragment>
            <div className="row">
                <div className="col-sm-2 bg-light" />
                <div className="col-sm-8">
                    <Plot />
                </div>
                <div className="col-sm-2 bg-light" />
            </div>
            <div className="row justify-content-sm-center">
                <div className="col-sm-8 bg-light pt-5 pb-5" />
            </div>
            </React.Fragment>
        );
    }
}

class Tool extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                Title
                <div className='card-header-actions'>
                    <a className="card-header-action btn btn-setting" href='#'>Settings</a>
                    <a className="card-header-action btn btn-minimize" href='#'>Minimize</a>
                    <a className="card-header-action btn btn-close" href='#'>Close</a>
                </div>
                </CardHeader>
                <CardBody>
                    <GraphTool />
                </CardBody>
            </Card>
        );
    }
}

Tool.propTypes = {

};

export default Tool;