import React from 'react';
import { connect } from 'react-redux';

import Search from './Search';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';

const Home = () => (
  <div>
    <Navbar />
    <Login />
    <Signup />
    <br />
    <Search />
    <br />
    <Carousel />
    <div className="container recipes">
      <RecipeBody />
    </div>
  </div>
);

export default connect(null)(Home);
