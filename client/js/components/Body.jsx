import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import Recipe from './Recipe';
import UserHome from './UserHome';

const Body = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={UserHome} />
    <Route path="/profile" component={Profile} />
    <Route path="/recipe/:recipeId" component={Recipe} />
    <Route path="/user/:userId" component={Profile} />
    <Route component={Recipe} />
  </Switch>
);
export default Body;
