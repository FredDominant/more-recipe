import React from 'react';
import axios from 'axios';

/**
 * 
 * 
 * @export
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		axios.post('/api/v1/users/signin', this.state)
			.then(() => 'No errors')
			.catch(error => error);
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	
  render() {
    return (
      <div>
        <div className="modal fade" id="login" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="row">
								<div className="col-md-9">
									<span><h1 className="modal-title" id="login-title">More Recipes</h1></span>
								</div>
								<div className="col-md-3">
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
											className="form-control" 
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
											className="form-control" 
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