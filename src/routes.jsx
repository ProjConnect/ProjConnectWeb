import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProjectList from './pages/ProjectList';
import ProjectRecommend from './pages/Recommend/RecommendPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import User from './pages/User';
import EditProfile from './pages/EditProfile';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/project/list" component={ProjectList} />
    <Route exact path="/project/recommend" component={ProjectRecommend} />
    <Route exact path="/profile" component={User} />
    <Route exact path="/profile/edit" component={EditProfile} />
    <Route exact path="/login" component={LoginPage} />
  </Switch>
);

export default Routes;
