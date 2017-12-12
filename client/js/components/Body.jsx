import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import store from '../store/store';
import Home from './Home';
import Profile from './Profile';
import Recipe from './Recipe';
import UserHome from './UserHome';
import AddRecipePage from '../components/AddRecipePage';
import UserProfile from '../components/UserProfile';
// import UserDetails from '../components/UserDetails';

const checkAuth = (Component) => {
  if (!store.getState().auth.isAuthenticated) {
    return () => <Redirect to="/" />;
  }
  return () => <Component />;
};
const Body = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={checkAuth(UserHome)} />
    <Route path="/add-recipe" exact component={checkAuth(AddRecipePage)} />
    <Route path="/profile" component={checkAuth(UserProfile)} />
    <Route path="/recipe/:recipeId" component={Recipe} />
    <Route path="/user/:userId" component={Profile} />
    <Route component={Recipe} />
  </Switch>
);
export default Body;
