import React, {Component} from 'react';

import {Provider} from 'react-redux';

import store from './store';

import Index from "./views/Index"

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AppHeader, AppSidebar} from '@coreui/react';
import Header from './components/Header';
import SidebarNav from './components/SidebarNav';

import Sessions from "./views/Sessions";
import Main from "./views/Main";


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="app">
            <AppHeader fixed>
                <Header/>
            </AppHeader>
            <div className="app-body">
                <AppSidebar fixed>
                    <SidebarNav/>
                </AppSidebar>
                <Router>
                  <main className="main">
                  <Switch>
                    <Route path="/session/:id" component={Main} />
                    <Route path="/" component={Sessions} />
                  </Switch>
                  </main>
                </Router>
            </div>
        </div>
        {/* <Index/> */}
      </Provider>
    );
  }
}

export default App;
