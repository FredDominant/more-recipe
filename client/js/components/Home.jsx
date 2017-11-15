import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Search from './Search';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Carousel from './Carousel';
import RecipeBody from './RecipeBody';

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
    return (
			<div>
				<Navbar />
				<Login />
				<Signup />
				<Search />
				<Carousel />
				<div className="container recipes">
					<RecipeBody />
				</div>
				
				{/* <div>
					<h4>this was entered: {this.props.form.value}</h4>
					<input type="text" 
					name="value" 
					value={this.props.form.value} 
					onChange={this.onChange}/> <br/>
					<button onClick={this.clickMe}>update State</button> <br/>
					<button onClick={this.changeName}>Change Name</button>
					<br />
					<button onClick={this.changeAge}>Change Age</button>
					<h4>Name: {this.props.user.Name}</h4>
					<h3>Age: {this.props.user.Age}</h3>
				</div>
				<div className="container-fluid">
					<h3>All recipes page - Home page</h3>
				</div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
	return {
		user: state.changer,
		form: state.getValue
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setName: (newName) => {
			dispatch({
				type: 'Name',
				payload: newName
			});
		},
		setAge: (newAge) => {
			dispatch({
				type: 'Age',
				payload: newAge
			});
		},
		getInput: (input) => {
			dispatch({
				type: 'input',
				payload: input
			})
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
