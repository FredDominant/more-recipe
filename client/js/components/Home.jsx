import React from 'react';

import Search from './Search';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';

const Home = () => (
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
  // <div>
  //   <Navbar />
  //   <Login />
  //   <Signup />
  //   <br />
  //   <Search />
  //   <br />
  //   <Carousel />
  //   <div className="container recipes">
  //     <RecipeBody />
  //   </div>
  // </div>
);

// export default connect(null)(Home);
export default Home;
