import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";

import {DragSource} from "react-dnd";

import {connect} from "react-redux";

class DataSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experiments: [] // list of experiments to select data from
        }

        this.fetch_fields = this
            .fetch_fields
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
    }

    componentDidUpdate() {
        if (this.state.experiments.length > 0) {
            this.fetch_fields();
        }
    }

    fetch_fields() {
        this
            .props
            .fetch_fields(this.state.experiments);
    }

    onChange(e) {
        this.setState({experiments: e.target.value})
    }

    render() {
        let fields;
        return (
            <div className="bg-white p-2">
                {/* A placeholder for selecting experiments to graph or whatever.*/}

                <Label>Experiments</Label>
                <Input onChange={this.onChange} name="experiments"/>

                <div>
                    {fields}
                </div>
            </div>
        );
    }
}

export default connect(null, {})(DataSelector);
