import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { tool_settings } from "../constants/_tool_defaults";
import { Media } from "reactstrap";

class Toolbox extends PureComponent {
    render_tool(tool){

    }

    render_toolsets() {
        tool_settings.map(group => {

        })
    }

    render() {
        return (
            <div className="toolbox">

            </div>
        );
    }
}

Toolbox.propTypes = {

};

export default Toolbox;