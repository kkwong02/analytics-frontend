import React, {Component} from 'react';
import { Badge } from 'reactstrap';
import Draggable from 'react-draggable'; 

class DataField extends Component {
    constructor() {
        super();
    }
    handleDragStart() {
        console.log("dragstart");
    }

    render() {
        return (
            <Draggable>
                <Badge onDragStart={this.handDragStart} color="primary" className="p-1 m-2" >{this.props.fieldName}</Badge>
            </Draggable>
        )
    }
}

export default DataField;