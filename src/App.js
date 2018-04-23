import React, {Component} from 'react';
import {AppHeader, AppSidebar} from '@coreui/react';
import {Container} from 'reactstrap';
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Tool from './components/Tool'
import Toolbox from './components/Toolbox'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
        <Header/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed>
            <Sidebar />
          </AppSidebar>

          {/* <Toolbox hide></Toolbox> */}
          <main className="main">
            <Container fluid>
            <Tool></Tool>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
