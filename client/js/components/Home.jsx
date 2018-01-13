import React from 'react';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import Footer from './Footer';

const Home = () => (
  <div>
    <Navbar />
    <br />
    <Search />
    <br />
    <div className="container-fluid">
      <Carousel />
      <div className="recipes">
        <RecipeBody />
      </div>
    </div>
    <Footer />
  </div>
);

export default Home;
