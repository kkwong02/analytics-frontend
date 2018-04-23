import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// styles
import './scss/style.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
