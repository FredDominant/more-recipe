import React from 'react';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import UpdateRecipe from './UpdateRecipe';
/**
 *
 * @description
 * @class UserHome
 * @extends {React.Component}
 */

const UserHome = () => (
  <div>
    <Navbar />
    <UpdateRecipe />
    <Search />
    <div className="container-fluid">
      <Carousel />
      <div className="container recipes">
        <RecipeBody />
      </div>
    </div>
  </div>
);
export default UserHome;

