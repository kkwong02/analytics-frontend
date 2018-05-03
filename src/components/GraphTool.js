import React, {Component} from "react"
import createPlotlyComponent from "react-plotly.js/factory";

import { add_request, fetch_data } from "../actions/toolActions";
import {connect} from "react-redux"

import Plotly from "plotly.js/lib/index-basic";
const Plot = createPlotlyComponent(Plotly);

const uuidv4 = require('uuid/v4')

class GraphTool extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let uuid = uuidv4();
        let request = {
            experiments: [1],
            expressions: [e.target[0].value]
        };
        this.props.add_request(uuid, request);
        this.props.fetch_data(uuid, request);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-2 bg-light">
                        <form onSubmit={this.onSubmit}>
                            <input name="y-axis" onChange={this.onChange}/>
                            <button>Submit</button>
                        </form>
                    </div>
                    <div className="col-sm-8">
                        <Plot/>
                    </div>
                    <div className="col-sm-2 bg-light"/>
                </div>
                <div className="row justify-content-sm-center">
                    <div className="col-sm-8 bg-light pt-5 pb-5">
                        <form onSubmit={this.onSubmit}>
                            <input name="x-axis" onChange={this.onChange}/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, {add_request, fetch_data})(GraphTool)