import React, {Component} from 'react';

import {AppAside} from '@coreui/react';
import {Container, Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';

import Toolbox from '../components/Toolbox'

import MainContent from '../components/MainContent'

import {connect} from 'react-redux'
import {close_session, list_sessions} from '../actions/sessionActions'

class Main extends Component {
    constructor(props) {
        super(props);
        this.onClick = this
            .onClick
            .bind(this);
    }
    onClick() {
        this
            .props
            .close_session();
        this
            .props
            .list_sessions();
    }
    render() {
        return (
            <React.Fragment>
                <Toolbox/>
                <main className="main">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Button onClick={this.onClick}>Close Session</Button>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <MainContent/>
                </main>
                <AppAside fixed offCanvas={false}>
                    <div>
                        Data here?
                    </div>
                </AppAside>
            </React.Fragment>
        );
    }
}

export default connect(null, {close_session, list_sessions})(Main);