import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../validation/validator'
/**
 * 
 * 
 * @export
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
			isLoading: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	
	isValid() {
		const { errors, isValid } = validateInput(this.state)
		console.log('errors in isValid is', errors);
		console.log('isValid is', isValid)
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('isValid() is', this.isValid());
		if (this.isValid()) {
			this.setState({ errors: {}, isLoading: true });
			this.props.userLoginRequest(this.state).then(() => {
				this.setState({ isLoading: false }).catch(() => {})
			})
				// .then(() => {}, ({ data }) => this.setState({ errors: data }))
				// .catch(() => {});
		}
		
	}
	
	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
		const errors = this.state.errors;
		console.log('errors in render is', errors);
		return (
		<div>
			<div className="modal fade" id="login" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content container">
								<div className="row">
									<div className="col-sm-8 login-head">
										<span><h1 className="modal-title" id="login-title">More Recipes</h1></span>
									</div>
									<div className="col-sm-4 login-close">
										<button type="button" className="close cancel-login" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
								</div>
								<div className="modal-body">
									<div>
										<div className="container">
											{errors.email && <div className="alert alert-danger alert-dismissible" role="alert">{errors.email}
											</div>}	
											{errors.password && <div className="alert alert-danger alert-dismissible" role="alert">{errors.password}
											</div>}
											<br/>
										</div>
										<form className="form-group" onSubmit={this.handleSubmit}>
											<div className="container">
												<div className="input-group">
													<label className="control-label"></label> <br/>
													<span className="input-group-addon" id="email-addon"><i className="fa fa-envelope" aria-hidden="true"></i></span>
													<input type="text" 
													onChange={this.onChange} 
													name="email" 
													value={this.state.email} 
													className="form-control login-form" 
													placeholder="Email " aria-label="email" aria-describedby="email-addon" />
												</div>
												<br/>
											
												<div className="input-group"> 
													<label className="control-label"></label> <br/>
													<span className="input-group-addon" id="password-addon"><i className="fa fa-key" aria-hidden="true"></i></span>
													<input type="password" 
													onChange={this.onChange} 
													name="password" 
													value={this.state.password} 
													className="form-control login-form" 
													placeholder="Password" 
													aria-label="password" 
													aria-describedby="password-addon" />
												</div>
												<br/>
												<div className="input-group">
													<button type="submit"  className="form-control btn btn-primary" id="register-button"> <span className="register-text"> Log in </span> </button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
		</div>
		);
	}
}
Login.propTypes = {
	userLoginRequest: PropTypes.func.isRequired
}

export default Login;
