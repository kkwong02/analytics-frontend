import React, { Component } from 'react';
import {Card, CardHeader, CardBody, CardBlock } from 'reactstrap'

class Tool extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                <span>{this.props.windowName}</span>
                <div className="card-header-actions">
                    <a className="card-header-action btn" href="#">Settings</a>
                    <a className="card-header-action btn" href="#">-</a>
                    <a className="card-header-action btn" href="#">x</a>
                </div>
                </CardHeader>
                <CardBody>
                    Tool here.
                </CardBody>
            </Card>
        );
    }
}

export default Tool;