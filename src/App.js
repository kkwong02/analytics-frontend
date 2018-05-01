import React, {Component} from 'react';

import {Provider} from 'react-redux';

import store from './store';

import Index from "./views/Index"

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Index/>
        </div>
      </Provider>
    );
  }
}

export default App;
