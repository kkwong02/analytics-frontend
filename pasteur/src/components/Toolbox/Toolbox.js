import React, {Component} from 'react';
import tools from './_tools'

class Toolbox extends Component {
    render() {
        return (
            <div className="toolbox">
                <div className="toolbox-header">Toolbox</div>
            </div>
            )
    }

    renderCategory(name, tools) {
        // Render the category. expects a name string and list of tools.
    }
    renderTool(tool) {
        // Renders each individual tool and attaches listeners.
    }

}

export default Toolbox