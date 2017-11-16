import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import AddRecipe from './AddRecipe';

export default class UserHome extends React.Component {
  render() {
    return (
      <div>
				<Navbar user="registered"/>
        <AddRecipe />
				<Search />
        <div className="container-fluid">
          <Carousel />
          <div className="container recipes">
            < RecipeBody />
          </div>
        </div>
      </div>
    );
  }
}