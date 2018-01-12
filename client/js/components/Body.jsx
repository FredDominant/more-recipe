import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import store from '../store/store';
import Home from './Home';
import { LOGOUT } from '../actions/actionTypes';
import Recipe from './Recipe';
import UserHome from './UserHome';
import AddRecipePage from '../components/AddRecipePage';
import UserProfile from '../components/UserProfile';
import UserRecipePage from '../components/UserRecipePage';
import UpdateRecipe from '../components/UpdateRecipe';
import Favourites from '../components/Favourites';
import ChangePassword from '../components/ChangePassword';
import SearchPage from '../components/SearchPage';
import CheckAuth from '../utils/checkAuth.jsx';

const Body = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={CheckAuth(UserHome)} />
    <Route path="/add-recipe" exact component={CheckAuth(AddRecipePage)} />
    <Route path="/profile" exact component={CheckAuth(UserProfile)} />
    <Route path="/favourites" exact component={CheckAuth(Favourites)} />
    <Route path="/user/recipes" exact component={CheckAuth(UserRecipePage)} />
    <Route path="/recipe/:recipeId" exact component={Recipe} />
    <Route path="/search" exact component={SearchPage} />
    <Route path="/recipe/edit/:recipeId" exact component={CheckAuth(UpdateRecipe)} />
    <Route path="/user/password-reset/:token" exact component={ChangePassword} />
    <Route component={Recipe} />
  </Switch>
);
export default Body;
