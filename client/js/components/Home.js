import React from 'react';
import ReactDOM from 'react-dom';

import { Search } from './Search';
import { Navbar } from './Navbar';
import { Signup } from './Signup';
import { Login } from './Login';

export class Home extends React.Component {
  render() {
    return (
			<div>
				<Navbar />
				<Login />
				<Signup />
				<Search />
				<div className="container-fluid">
					<h3>All recipes page - Home page</h3>
				</div>
      </div>
    );
  }
}