import React, { PureComponent } from 'react';
import {
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    ZAxis,
    Legend,
    ScatterChart,
    Scatter,
    Tooltip,
    ReferenceLine,
    LineChart,
    BarChart,
    Line,
    Bar,
    Label,
    ComposedChart
} from 'recharts';

const graphTypes = {
    scatter: ScatterChart,
    line: LineChart,
    bar: BarChart,
    composed: ComposedChart
};

class Plot extends PureComponent {

    renderAxes() {
        let axes = this.props.axes.map((axis) => {
            if (axis.axisType === 'x') {
                return (<XAxis key={axis.xAxisId} xAxisId={axis.xAxisId} type={axis.type} dataKey={axis.dataKey} allowDuplicatedCategory={false}
                >
                    <Label
                        value={axis.name}
                        position={axis.orientation}
                    />
                </XAxis>);
            }
            else {
                return (<YAxis key={axis.yAxisId} yAxisId={axis.yAxisId} type={'number'} dataKey={axis.dataKey}
                >
                    <Label
                        value={axis.name}
                        position={axis.orientation}
                        angle={-90}
                    />
                </YAxis>);
            }
        });
        return axes;
    }

    renderData() {
        let data = this.props.data.map(plot => {

            switch (plot.plotType) {
            case 'scatter':
                return (
                    <Scatter key={plot.id} {...plot} />);
            case 'bar':
                return (<Bar key={plot.id} {...plot}/>);
            case 'line':
                return (<Line key={plot.id} {...plot} />);
            default:
                return;
            }
        });
        return data;
    }

    renderRefLine() {
        if (this.props.referenceLine) {
            return (<ReferenceLine />);
        }
    }
    legendClick(e) {
        // TODO: show options for item on click
        console.log("IMPLEMENT ME!");
    }

    render() {
        const Graph = graphTypes[this.props.graphType];

        return (
            <ResponsiveContainer minHeight={300} width='100%' aspect={2}>
                <Graph
                    margin={{top: 40, right: 40, bottom: 40, left: 40}}>
                    { this.renderAxes() }
                    { this.renderData() }
                    {/* { this.renderRefLine() } */}
                    <Tooltip />
                    <Legend
                        layout='vertical' align='right' verticalAlign='middle'
                        wrapperStyle={{
                            paddingLeft: '20px'
                        }}
                        onClick={this.legendClick}
                    />
                    <CartesianGrid />
                </Graph>
            </ResponsiveContainer>
        );
    }
}

export default Plot;