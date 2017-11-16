import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Search from './Search';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';
import userLoginRequest from '../actions/LoginAction';

class Home extends React.Component {
	constructor(){
		super();
		this.changeAge = this.changeAge.bind(this);
		this.changeName = this.changeName.bind(this);
		this.onChange = this.onChange.bind(this);
		}
	changeAge() {
		this.props.setAge(23);
	}
	changeName() {
		this.props.setName('Fred Adewole');
	}
	
	onChange(e) {
		let value = e.target.value
		// console.log(value);
		this.props.getInput(value);
	}
	
  render() {
	const { userLoginRequest } = this.props;
    return (
			<div>
				<Navbar />
				<Login userLoginRequest = {userLoginRequest}/>
				<Signup />
				<Search />
				<Carousel />
				<div className="container recipes">
					<RecipeBody />
				</div>
      		</div>
    );
  }
}

Home.PropTypes = {
	userLoginRequest: PropTypes.func.isRequired
}
//export default Home;
export default connect(null, { userLoginRequest })(Home);
