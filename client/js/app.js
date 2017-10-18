import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import * as activate from './react';
import { Navbar } from './components/Navbar';
import { Search } from './components/search';
import { Signup } from './components/signup';
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
			</div>
		);
	}
};
ReactDOM.render(<App/>, document.getElementById('root'));
