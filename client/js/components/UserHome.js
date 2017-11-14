import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search';
import Navbar from './Navbar';

export default class UserHome extends React.Component {
  render() {
    return (
      <div>
				<Navbar user="registered"/>
				<Search />
        <div className="container-fluid">
          <h3>Registered user's home page</h3>
        </div>
      </div>
    );
  }
}