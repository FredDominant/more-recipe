import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar } from './components/Navbar';
import { Search } from './components/search';
import { Signup } from './components/signup';
import { Login } from './components/login';
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
