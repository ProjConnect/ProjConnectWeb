import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import LandingPage from './pages/LandingPage/LandingPage';
import User from './pages/User';
import EditProfile from './pages/EditProfile';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/project/list" component={ProjectList} />
    <Route exact path="/profile" component={User} />
    <Route exact path="/profile/edit" component={EditProfile} />
    <Route exact path="/login" component={LandingPage} />
  </Switch>
);

export default Routes;
