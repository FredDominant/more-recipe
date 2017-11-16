import React from 'react';
import PropTypes from 'prop-types';
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
			password: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		 this.props.userLoginRequest(this.state);
	}
	
	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	
  render() {
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
								<form className="form-group" onSubmit={this.handleSubmit}>
									<div className="container">
										<div className="input-group">
											<label className="control-label"></label> <br/>
											<span className="input-group-addon" id="email-addon"><i className="fa fa-envelope" aria-hidden="true"></i></span>
											<input type="email" 
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
											<button type="submit" className="form-control btn btn-primary" id="register-button"> <span className="register-text"> Log in </span> </button>
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
