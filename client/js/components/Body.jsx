import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import store from '../store/store';
import Home from './Home';
import Profile from './Profile';
import Recipe from './Recipe';
import UserHome from './UserHome';
import AddRecipePage from '../components/AddRecipePage';
import UserProfile from '../components/UserProfile';
import UserRecipePage from '../components/UserRecipePage';
import UpdateRecipe from '../components/UpdateRecipe';
import Favourites from '../components/Favourites';

const checkAuth = (Component) => {
  if (!store.getState().auth.isAuthenticated) {
    return () => <Redirect to="/" />;
  }
  return props => <Component {...props} />;
};
const Body = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={checkAuth(UserHome)} />
    <Route path="/add-recipe" exact component={checkAuth(AddRecipePage)} />
    <Route path="/profile" exact component={checkAuth(UserProfile)} />
    <Route path="/favourites" exact component={checkAuth(Favourites)} />
    <Route path="/user/recipes" exact component={checkAuth(UserRecipePage)} />
    <Route path="/recipe/:recipeId" exact component={Recipe} />
    <Route path="/recipe/edit/:recipeId" exact component={checkAuth(UpdateRecipe)} />
    <Route path="/user/:userId" exact component={Profile} />
    <Route component={Recipe} />
  </Switch>
);
export default Body;
