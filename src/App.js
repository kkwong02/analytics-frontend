import React, {Component} from 'react';

import {AppHeader, AppSidebar} from '@coreui/react';
import {Container} from 'reactstrap';
import Header from './components/Header';
import SidebarNav from './components/SidebarNav';
import Tool from './components/Tool';

import { Provider } from 'react-redux';

import store from './store';

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
            <SidebarNav />
          </AppSidebar>

          <main className="main">
            <div className="toolbox">
            {/* individual tool components here! */}
            </div>
            <Container fluid>
              <Tool />
            </Container>
          </main>
        </div>
      </div>
      </Provider>
    );
  }
}

export default App;
