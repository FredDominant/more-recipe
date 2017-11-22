import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = (props) => {
  if (props.user) {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="row" id="nav2">
            <div className="col-sm-6">
              <a className="navbar-brand"><span id="title"><h3 title="More Recipes and cooking tips">More Recipes</h3></span></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
            </div>

            <div className="col-sm-6" >
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <span className="nav-link"><span><i className="fa fa-user fa-lg" aria-hidden="true" /> </span>
                      <Link to="/profile">PROFILE </Link> <span className="sr-only">(current)</span></span>
                  </li>
                  <li className="nav-item active">
                    <span className="nav-link" data-toggle="modal" data-target="#addRecipe"href="#"><span><i className="fa fa-plus-square" aria-hidden="true" /> </span>
											ADD RECIPE<span className="sr-only">(current)</span></span>
                  </li>
                  <li className="nav-item active">
                    <span className="nav-link"><span><i className="fa fa-heart" aria-hidden="true" /> </span>
                      <Link to="/favourites">FAVOURITES  </Link> <span className="sr-only">(current)</span></span>
                  </li>
                  <li className="nav-item active">
                    <span className="nav-link"><span><i className="fa fa-sign-out" aria-hidden="true" /> </span>
                      <Link to="/">LOG OUT </Link> <span className="sr-only">(current)</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="row" id="nav2">
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-9">
                <a className="navbar-brand"><span id="title"><h3 title="More Recipes and cooking tips">More Recipes</h3></span></a>
              </div>
              <div className="col-sm-3">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-3" >
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" data-toggle="modal" data-target="#register">REGISTER<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" data-toggle="modal" data-target="#login">LOGIN<span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  user: PropTypes.string.isRequired
};

export default Navbar;
