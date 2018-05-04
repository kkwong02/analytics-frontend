import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap'

import GraphTool from './GraphTool'

class Tool extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                Title
                <div className='card-header-actions'>
                    <a className="card-header-action btn btn-setting" href='#settings'>Settings</a>
                    <a className="card-header-action btn btn-minimize" href='#minimize'>Minimize</a>
                    <a className="card-header-action btn btn-close" href='#close'>Close</a>
                </div>
                </CardHeader>
                <CardBody>
                    <GraphTool id={this.props.id}/>
                </CardBody>
            </Card>
        );
    }
}

Tool.propTypes = {

};

export default Tool;