import React from 'react';

export class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	
	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
	}
	render() {
		return (
			<div>
				<div className="modal fade" id="register" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="row">
								<div className="col-md-9">
									<span><h1 className="modal-title" id="signup-title" >More Recipes</h1></span>
									<span><h6 className="signup-text">Register to view cool awesome recipes, rate and review recipes, and create your own recipes and menus.</h6></span>
								</div>
								<div className="col-md-3">	
									<button type="button" className="close cancel-signup" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
							</div>
							<div className="modal-body">
								<div>
								<form className="form-group" onSubmit={this.onSubmit}>
									<div className="container">
										<div className="input-group">
											<span className="input-group-addon" id="firstName-addon"><i className="fa fa-user" aria-hidden="true"></i></span>
											<input type="text" value={this.state.firstname} onChange={this.onChange} className="form-control" placeholder="First Name" aria-label="firstName" aria-describedby="firstName-addon" name="firstname"/>
										</div>
										<br/>
										<div className="input-group">
											<span className="input-group-addon" id="lastName-addon"><i className="fa fa-user" aria-hidden="true"></i></span>
											<input type="text" value={this.state.lastname} onChange={this.onChange} className="form-control" placeholder="Last Name" aria-label="lastName" aria-describedby="lastName-addon" name="lastname"/>
										</div>
										<br/>
										<div className="input-group">
											<span className="input-group-addon" id="email-addon"><i className="fa fa-envelope" aria-hidden="true"></i></span>
											<input type="email" value={this.state.email} onChange={this.onChange}className="form-control" placeholder="Email " aria-label="email" aria-describedby="email-addon" name="email"/>
										</div>
										<br/>
										<div className="input-group">
											<span className="input-group-addon" id="password-addon"><i className="fa fa-key" aria-hidden="true"></i></span>
											<input type="password" value={this.state.password} onChange={this.onChange}className="form-control" placeholder="Password" aria-label="password" aria-describedby="password-addon" name="password"/>
										</div>
										<br/>
										<div className="input-group">
											<span className="input-group-addon" id="confirmPassword-addon"><i className="fa fa-key" aria-hidden="true"></i></span>
											<input type="password" value={this.state.confirmPassword} onChange={this.onChange} className="form-control" placeholder="Confirm password" aria-label="confirmPassword" aria-describedby="confirmPassword-addon" name="confirmPassword"/>
										</div>
										<br/>
										<div className="input-group">
											<button type="submit" className="form-control btn btn-primary" id="register-button"> <span className="register-text"> Register </span> </button>
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
