import React, { Component } from 'react';
import { AppSidebarToggler } from '@coreui/react'

class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <AppSidebarToggler mobile />
            </React.Fragment>
        );
    }
}

export default Header;