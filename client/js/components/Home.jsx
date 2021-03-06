import React from 'react';

import Search from './Search';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import Footer from './Footer';
import TopRecipes from './TopRecipes';

const Home = props => (
  <div>
    <br />
    <Search {...props} />
    <br />
    <div className="container-fluid">
      <Carousel />
      <div className="top-recipes">
        <TopRecipes />
      </div>
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

export default Home;
