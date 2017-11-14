import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';

export default class Recipe extends React.Component {
  render() {
    return (
			<div>
				<Navbar user="registered"/>
				<div className="container-">
					<h3>Not found</h3>
				</div>
      </div>
    );
  }
}