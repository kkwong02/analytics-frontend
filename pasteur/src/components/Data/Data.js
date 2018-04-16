import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import { DragSource } from "react-dnd";

class DataField extends Component {
    constructor() {
        super();
    }
    handleDragStart() {
        console.log("dragstart");
    }

    render() {
        return (
            <Badge onDragStart={this.handDragStart} color="primary" className="p-1 m-2" >{this.props.fieldName}</Badge>
        )
    }
}
