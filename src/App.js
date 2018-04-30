import React, {Component} from 'react';

import {AppHeader, AppSidebar, AppAside} from '@coreui/react';
import {Container} from 'reactstrap';
import Header from './components/Header';
import SidebarNav from './components/SidebarNav';

import {Provider} from 'react-redux';

import store from './store';

import Tool from './components/Tool';
import Toolbox from './components/Toolbox'

class Content extends Component {
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
          <Toolbox/>
          <main className="main">
            <Container fluid>
              <Tool/>
            </Container>
          </main>
          <AppAside fixed offCanvas={false}>
            <div>
              Data here?
            </div>
          </AppAside>
        </div>
      </div>
    );
  }
}

class App extends Component {

  render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    );
  }
}

export default App;
