import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {AppHeader, AppSidebar } from '@coreui/react';
import Header from './components/Header';
import SidebarNav from './components/SidebarNav';

import Sessions from './views/Sessions';
import Main from './views/Main';

import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="app">
                <AppHeader fixed>
                    <Header/>
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed>
                        <SidebarNav/>
                    </AppSidebar>
                    { this.props.connected ? (
                        <Router>
                            <main className="main">
                                <Switch>
                                    <Route path="/sessions/:id" component={Main} />
                                    <Route path="/sessions" component={Sessions} exact />
                                    <Route path="/" render={() => (
                                        <Redirect to='/sessions' />
                                    )} />
                                </Switch>
                            </main>
                        </Router>
                    ) :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    connected: state.websocket.connected
});

export default connect(mapStateToProps, {})(App);
