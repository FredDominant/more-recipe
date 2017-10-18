import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 
 * 
 * @class Navbar
 * @extends {React.Component}
 */
export class Navbar extends React.Component {
  render() {
    return(
			<div className="container-fluid">
				<nav className="row navbar navbar-expand-lg navbar-light bg-light">
						<div className="col-sm-4">
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<a className="nav-link" href="#" title="More Recipes home"><i className="fa fa-home fa-lg" aria-hidden="true"></i> <span>Recipes  |</span></a>
									</li>
									<li className="nav-item active" data-toggle="modal" data-target="#register">
										<a className="nav-link" href="#" title="Create More Recipes account"><i className="fa fa-user-plus fa-lg" aria-hidden="true"></i> <span> Register |</span></a>
									</li>
									<li className="nav-item active">
										<a className="nav-link" href="#" title="Log in to your More Recipes account"><i className="fa fa-user-circle fa-lg" aria-hidden="true"></i> <span> Log in |</span></a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-4">
						</div>
						<div className="col-sm-4 icons">
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<a className="nav-link" href="#"><i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i></a>
									</li>
									<li className="nav-item active">
										<a className="nav-link" href="#"><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a>
									</li>
									<li className="nav-item active">
										<a className="nav-link" href="#"><i class="fa fa-instagram fa-2x" aria-hidden="true"></i></a>
									</li>
									<li className="nav-item active">
										<a className="nav-link" href="#"><i class="fa fa-youtube-play fa-2x" aria-hidden="true"></i></a>
									</li>
									<li className="nav-item active">
										<a className="nav-link" href="#"><i class="fa fa-pinterest-p fa-2x" aria-hidden="true"></i></a>
									</li>
								</ul>
							</div>
						</div>
				</nav>
			</div>
		);
  }
}
