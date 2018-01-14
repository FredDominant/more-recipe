import React from 'react';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import Footer from './Footer';
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
      <div className="recipes">
        <RecipeBody />
        <br />
      </div>
      <br />
    </div>
    <br />
    <Footer />
  </div>
);
export default UserHome;

