import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router'

import { Navbar } from './Navbar';
import { Search } from './search';
import { Signup } from './signup';
import { Login } from './login';
/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
	render() {
		return (
			<div className="main-body">
				<Navbar />
				<Search />
				<Signup />
				<Login />
			</div>
		);
	}
};
ReactDOM.render(<App />, document.getElementById('root'));
