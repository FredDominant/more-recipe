import React from 'react';
import ReactDOM from 'react-dom';

import { Search } from './Search';
import { Navbar } from './Navbar';
import { Signup } from './Signup';
import { Login } from './Login';

export class Recipe extends React.Component {
  render() {
    return (
			<div>
				<Navbar user="registered"/>
				<div className="container-fluid">
					<h3>Recipe details page</h3>
				</div>
      </div>
    );
  }
}