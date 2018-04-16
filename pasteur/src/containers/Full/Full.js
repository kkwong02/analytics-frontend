import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Toolbox from '../../components/Toolbox/';

import Dashboard from '../../views/Dashboard/';

class Full extends Component {
    constructor() {
        super();

        this.state = {
            toolFrames: [
                {
                    id: 1,
                    title: 'Plot 1',
                    minimized: false,
                    toolType: 'graph',
                    plotSettings: {
                        data: null,
                        layout: null,
                        frames: null,
                        config: null
                    }
                },
                {
                    id: 2,
                    title: 'Plot 2',
                    minimized: false,
                    toolType: 'graph',
                    plotSettings: {
                        data: null,
                        layout: null,
                        frames: null,
                        config: null
                    }
                }
            ], // a list of tools that have been added
            data: {}, // ??? I forgot what this is.
            edit: null, // an id of tool or null.
        }
    }

    handleFrameClose() {
        console.log("close");
    }

    handlePlotSettingChange(id) {
        console.log(id);
    }

    createNewFrame() {
        console.log('new!');
    }

    componentDidMount() {
        var socket = new WebSocket('ws://localhost/analytics/');

        let self = this;
        socket.onmessage = function (event) {
            this.setState({
                data: JSON.parse(event.data)
            });
        }.bind(this);

        // Testing socket connection.
        socket.onopen = function () {
            socket.send(JSON.stringify({action: 'get_fields'}));
        };
    }

    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <Toolbox/>
                    <main className="main">
                        <Container fluid>
                            <Dashboard frameClose={this.handleFrameClose.bind(this)} toolFrames={this.state.toolFrames}/>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

export default Full;
