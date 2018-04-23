import React, { Component } from 'react';
import '../../public/open-iconic.min.svg'

/**
 * Component for Open-iconic icon sprite.
 *
 */
class Icon extends Component {
    getBaseClassName() {
        return this.props.baseClassName || "icon"
    }
    render() {
        return (
            <svg className="{this.getBaseClassName()}">
                <use xlinkHref={} />
            </svg>
        );
    }
}

export default Icon;