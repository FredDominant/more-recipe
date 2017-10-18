import React from 'react';

/**
 * 
 * 
 * @export
 * @class Login
 * @extends {React.Component}
 */
export class Login extends React.Component {
  render() {
    return (
      <div>
        <div className="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
								<form className="form-group">
									<div className="container">
										<div className="input-group">
											<span className="input-group-addon" id="email-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
											<input type="email" class="form-control" placeholder="Email " aria-label="email" aria-describedby="email-addon" name="email" required/>
										</div>
										<br/>
										<div className="input-group">
											<span className="input-group-addon" id="password-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
											<input type="password" class="form-control" placeholder="Password" aria-label="password" aria-describedby="password-addon" name="password" required/>
										</div>
										<br/>
										<div className="input-group">
											<button type="submit" class="form-control btn btn-primary" id="register-button"> <span class="register-text"> Log in </span> </button>
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