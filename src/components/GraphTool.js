import React, {Component} from "react"
import createPlotlyComponent from "react-plotly.js/factory";

import Plotly from "plotly.js/lib/index-basic";

const Plot = createPlotlyComponent(Plotly);

class GraphTool extends Component {
    constructor(props) {
        super(props);
        this.onChange = this
            .onChange
            .bind(this);
    }

    onChange(e) {
        console.log(e.target.name);
        console.log(e.target.value);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-2 bg-light">
                        <input name="y-axis" onChange={this.onChange}/>
                    </div>
                    <div className="col-sm-8">
                        <Plot/>
                    </div>
                    <div className="col-sm-2 bg-light"/>
                </div>
                <div className="row justify-content-sm-center">
                    <div className="col-sm-8 bg-light pt-5 pb-5">
                        <input name="x-axis" onChange={this.onChange}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GraphTool;