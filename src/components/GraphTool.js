import React, {PureComponent} from "react"
import { Plot } from "../constants/plotly"

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