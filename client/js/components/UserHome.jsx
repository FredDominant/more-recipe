import React from 'react';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
/**
 *
 * @description
 * @class UserHome
 * @extends {React.Component}
 */

const UserHome = () => (
  <div>
    <Navbar />
    <br />
    <Search />
    <br />
    <div className="container-fluid">
      <Carousel />
      <div className="container recipes">
        <RecipeBody />
      </div>
    </div>
  </div>
);
export default UserHome;

