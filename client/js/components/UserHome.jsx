import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search';
import Navbar from './Navbar';
import Carousel from './Carousel';

export default class UserHome extends React.Component {
  render() {
    return (
      <div>
				<Navbar user="registered"/>
				<Search />
        <div className="container-fluid">
          <Carousel />
        </div>
      </div>
    );
  }
}