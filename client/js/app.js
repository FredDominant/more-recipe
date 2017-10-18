import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import * as activate from './react';
import { Navbar } from './components/Navbar';
import { Search } from './components/search';
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
				<Register />
			</div>
		);
	}
};
ReactDOM.render(<App/>, document.getElementById('root'));
