import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import Recipe from './Recipe';
import UserHome from './UserHome';
import AddRecipePage from '../components/AddRecipePage';
import UserProfile from '../components/UserProfile';
// import UserDetails from '../components/UserDetails';

const Body = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/home" exact component={UserHome} />
    <Route path="/add-recipe" exact component={AddRecipePage} />
    <Route path="/profile" component={UserProfile} />
    {/* <Route path="/user/recipes" component={UserRecipes} /> */}
    {/* <Route path="/user/favourites" component={UserFavourites} /> */}
    <Route path="/recipe/:recipeId" component={Recipe} />
    <Route path="/user/:userId" component={Profile} />
    <Route component={Recipe} />
  </Switch>
);
export default Body;
