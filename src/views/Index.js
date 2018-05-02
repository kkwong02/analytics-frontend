import React, {Component} from 'react';
import {connect} from "react-redux";

import Proptypes from "prop-types";
import Sessions from "./Sessions";
import Main from "./Main";

import {AppHeader, AppSidebar} from '@coreui/react';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';


class Index extends Component {
    render() {
        let content;

        if (this.props.current_session !== null) {
            content = <Main/>
        } else {
            content = <Sessions/>
        }
        return (
            <div className="app">
                <AppHeader fixed>
                    <Header/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed>
                        <SidebarNav/>
                    </AppSidebar>
                    {content}
                </div>
            </div>
        );
    }
}

Index.Proptypes = {
    current_session: Proptypes.object.isRequired
}

const mapStateToProps = state => ({current_session: state.session.current_session});

export default connect(mapStateToProps)(Index)
