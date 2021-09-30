import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './pages/LandingPage/LandingPage';

ReactDOM.render(
<<<<<<< Updated upstream
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/list" component={App} />
    </Switch>
  </BrowserRouter>,
=======
  <React.StrictMode>
    <App />
  </React.StrictMode>,
=======
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
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  document.getElementById('root'),
);

reportWebVitals();
