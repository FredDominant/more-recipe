import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar } from './Navbar';
import { Login } from './Login';
import { Signup } from './Signup';

export class Navigation extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<Login />
				<Signup />
			</div>
		) 
	}
}