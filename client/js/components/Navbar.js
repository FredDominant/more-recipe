import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render() {
    if (this.props.user) {
			return (
				<div className="container-fluid">
					<nav class="navbar navbar-expand-lg navbar-light bg-light">
						<div className="row" id="nav2">
							<div className="col-sm-6">
								<a class="navbar-brand" href="#"><span id="title"><h3 title="More Recipes and cooking tips">More Recipes</h3></span></a>
								<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
									<span class="navbar-toggler-icon"></span>
								</button>
							</div>
							
							<div className="col-sm-6" >
								<div class="collapse navbar-collapse" id="navbarSupportedContent">
									<ul class="navbar-nav mr-auto">
										<li class="nav-item active">
											<a class="nav-link" href="#"><span><i className="fa fa-user fa-lg" aria-hidden="true"></i> </span> <Link to='/profile'>Profile </Link> <span class="sr-only">(current)</span></a>
										</li>
										<li class="nav-item active">
											<a class="nav-link" href="#"><span><i className="fa fa-plus-square" aria-hidden="true"></i> </span> <Link to='/add'>Add Recipes </Link> <span class="sr-only">(current)</span></a>
										</li>
										<li class="nav-item active">
											<a class="nav-link" href="#"><span><i className="fa fa-heart" aria-hidden="true"></i> </span> <Link to='/favourites'>Favourites  </Link> <span class="sr-only">(current)</span></a>
										</li>
										<li class="nav-item active">
											<a class="nav-link" href="#"><span><i className="fa fa-sign-out" aria-hidden="true"></i> </span> <Link to='/'>Log out </Link> <span class="sr-only">(current)</span></a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
				</div>
			)
		}
		return (
			<div className="container-fluid">
				<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<div className="row" id="nav2">
						<div className="col-sm-9">
							<a class="navbar-brand" href="#"><span id="title"><h3 title="More Recipes and cooking tips">More Recipes</h3></span></a>
							<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
						</div>
						<div className="col-sm-3" >
							<div class="collapse navbar-collapse" id="navbarSupportedContent">
								<ul class="navbar-nav mr-auto">
									<li class="nav-item active">
										<a class="nav-link" data-toggle="modal" data-target="#register"href="#"><span><i className="fa fa-user-plus fa-lg" aria-hidden="true"></i> </span>Register |<span class="sr-only">(current)</span></a>
									</li>
									<li class="nav-item active">
										<a class="nav-link" data-toggle="modal" data-target="#login"href="#"><span><i className="fa fa-user fa-lg" aria-hidden="true"></i> </span>Login<span class="sr-only">(current)</span></a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
  }
}
