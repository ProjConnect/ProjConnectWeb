import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProjectList from './pages/ProjectList';
import ProjectRecommend from './pages/Recommend/RecommendPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import User from './pages/User';
import EditProfile from './pages/EditProfile';
import AddProject from './pages/AddProject/AddProject';
import PostRequestsPage from './pages/PostRequests/PostRequests';
import ModeratorPage from './pages/ModeratorPage/ModeratorPage';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/project/list" component={ProjectList} />
    <Route exact path="/project/recommend/:name" component={ProjectRecommend} />
    <Route exact path="/profile" component={User} />
    <Route exact path="/profile/edit" component={EditProfile} />
    <Route exact path="/project/new" component={AddProject} />
    <Route exact path="/requests" component={PostRequestsPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/mod" component={ModeratorPage} />
  </Switch>
);

export default Routes;
