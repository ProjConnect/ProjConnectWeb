import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { Routes } from './routes';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/designItens.scss';
import './index.css';

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById('root'),
);

reportWebVitals();
