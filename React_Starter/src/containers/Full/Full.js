import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Toolbox from '../../components/Toolbox/';

import Dashboard from '../../views/Dashboard/';


class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <Toolbox />
          <main className="main">
            <Container fluid>
            </Container>
          </main>
          <Aside />
        </div>
      </div>
    );
  }
}

export default Full;
