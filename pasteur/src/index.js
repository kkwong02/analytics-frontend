import React from 'react';
import ReactDOM from 'react-dom';

// Styles
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

ReactDOM.render(<Full />, document.getElementById('root'));
