import React, {Component} from 'react';
import {AppHeader, AppSidebar} from '@coreui/react';
import {Container} from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed/>
        <div className="app-body">
          <AppSidebar fixed>
            Nav goes here.
          </AppSidebar>
          <main className="main">
            <Container fluid>
            <a href="/">Test</a>
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
