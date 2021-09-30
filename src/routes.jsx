import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import LandingPage from './pages/LandingPage/LandingPage';
import User from './pages/User';
import EditProfile from './pages/EditProfile';
import NavBar from './components/Navbars/Navbar';

export const Routes = () => (
  <div>
    <Route exact path="/">
      <Redirect to="/Login" />
    </Route>
    <NavBar />
    <Switch>
      <Route exact path="/Lista-projetos" component={ProjectList} />
      <Route exact path="/Perfil" component={User} />
      <Route exact path="/Editar-perfil" component={EditProfile} />
      <Route exact path="/Login" component={LandingPage} />
    </Switch>
  </div>
);

export default Routes;