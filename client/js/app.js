import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import * as activate from './react';
import { Navbar } from './components/Navbar';
/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className="container">	
					<h4 className="">Hello World! Welcome to my first React app</h4>
				</div>
			</div>
		);
	}
};
ReactDOM.render(<App/>, document.getElementById('root'));
