import React, {PureComponent} from "react"


import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js/lib/index-basic";
const Plot = createPlotlyComponent(Plotly);


class GraphTool extends PureComponent {
    render() {
        return (
            <Plot
                data={this.props.params.tool.params.data}
                layout={this.props.params.tool.params.layout}
                config={this.props.params.tool.params.config}
            />
        );
    }
}

export default GraphTool;