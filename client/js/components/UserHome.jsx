import React from 'react';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import AddRecipe from './AddRecipe';
/**
 *
 * @description
 * @class UserHome
 * @extends {React.Component}
 */

const UserHome = () => (
  <div>
    <Navbar user={'registered'} />
    {/* <AddRecipe /> */}
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

