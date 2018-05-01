import React, {Component} from 'react';
import {connect} from "react-redux";

import Sessions from "./Sessions";
import Main from "./Main";

import {AppHeader, AppSidebar} from '@coreui/react';
import Header from '../components/Header';
import SidebarNav from '../components/SidebarNav';


class Index extends Component {
    render() {
        let content;
        if (this.props.currrent_session) {
            content = <Main/>
        } else {
            content = <Sessions/>
        }
        return (
            <React.Fragment>
                <AppHeader fixed>
                    <Header/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed>
                        <SidebarNav/>
                    </AppSidebar>
                    {content}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({session: state.current_session});

export default connect(mapStateToProps, null)(Index)
