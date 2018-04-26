import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';



class Tool extends PureComponent {
    render() {
        return (
            <div>

            </div>
        );
    }
}

Tool.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Tool;