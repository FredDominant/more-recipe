import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from '../components/Login';
import Signup from '../components/Signup';
import logOutUser from '../actions/logoutUser';
/**
 *
 * @class Navbar
 *
 * @extends {React.Component}
 */
export class Navbar extends React.Component {
  /**
 * @description Creates an instance of Navbar.
 *
 * @param {any} props
 *
 * @memberof Navbar
 */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  /**
   * @description this method handles user logout
   *
   * @returns {function} function
   *
   * @param {any} event
   *
   * @memberof Navbar
   */
  handleLogout(event) {
    event.preventDefault();
    this.props.logOutUser();
    // this.context.router.history.push('/');
    this.props.history.push('/search');
  }
  /**
   *
   * @returns {component} react component
   *
   * @memberof Navbar
   */
  render() {
    const { firstname } = this.props;
    if (this.props.authenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="row" id="nav2">
              <div className="col-sm-10 col-xs-6">
                <div className="col-sm-9" id="nav-button">
                  <span id="title" className="navbar-brand">
                    <Link to="/">
                      <h3
                        className="more-recipes"
                        title="More Recipes and cooking tips"
                      >
                    More Recipes</h3></Link>
                  </span>
                  <button
                    className="navbar-toggler"
                    id="nav-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                </div>

              </div>
              <div className="col-sm-2 col-xs-6" id="navigation-icons">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {this.props.authenticated && <ul className="navbar-nav mr-auto">
                    <li className="dropdown nav-item active">
                      <span className="nav-link" ><span><i className="fas fa-user" /> </span>
                        <Link
                          to="#"
                          className="dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          { firstname }
                          <span className="caret" />
                        </Link>
                        <ul className="dropdown-menu">
                          <div className="container" id="dropdown-items">
                            <li className="nav-item active">
                              <span className="nav-link"><span><i className="fas fa-user" /> </span>
                                <Link to="/profile">
                                Profile</Link>
                                <span className="sr-only">(current)</span></span>
                            </li>
                            <li className="nav-item active">
                              <span className="nav-link">
                                <span><i className="fas fa-utensils" /></span>
                                <Link to="/user/recipes">
                                  <span> My Recipes</span></Link>
                                <span className="sr-only">(current)</span></span>
                            </li>
                            <li className="nav-item active">
                              <span className="nav-link">
                                <span>
                                  <i className="far fa-heart" />
                                </span>
                                <Link to="/favourites">
                                  <span> Favourites</span>
                                </Link> <span className="sr-only">(current)</span>
                              </span>
                            </li>
                            <li className="nav-item active">
                              <span className="nav-link">
                                <span>
                                  <i className="fas fa-plus-circle" />
                                </span>
                                <Link to="/add-recipe"> <span> Add Recipe</span>
                                </Link> <span className="sr-only">(current)</span></span>
                            </li>
                            <hr />
                            <li className="nav-item active">
                              <Link
                                to="/"
                                className="btn btn-default"
                                onClick={this.handleLogout}
                                role="button"
                                tabIndex={0}
                              >
                                <span>
                                  <i className="fas fa-sign-out-alt" />
                                </span> Logout
                              </Link>
                            </li>
                          </div>
                        </ul>
                      </span>
                    </li>
                  </ul>}
                </div>
              </div>
            </div>
          </nav>
          {this.props.children}
        </div>
      );
    }
    return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="row" id="nav2">
            <div className="col-sm-9" id="nav-button">
              <span id="title" className="navbar-brand">
                <Link to="/"><h3
                  className="more-recipes"
                  title="More Recipes and cooking tips"
                >More Recipes</h3></Link>
              </span>
              <button
                className="navbar-toggler"
                id="nav-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
            <div className="col-sm-3" id="navigation-icons">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link
                      to="#"
                      className="nav-link"
                      data-toggle="modal"
                      data-target="#register"
                    ><span><i className="fas fa-user-plus" /></span> REGISTER
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link
                      to="#"
                      className="nav-link"
                      data-toggle="modal"
                      data-target="#login"
                    >
                      <span><i className="fas fa-sign-in-alt" /></span> LOGIN
                      <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                </ul>
                <Login />
                <Signup />
              </div>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  firstname: PropTypes.string,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
Navbar.defaultProps = {
  firstname: '',
  history: {
    push: () => {}
  }
};
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  firstname: state.auth.user.firstname
});
export default connect(mapStateToProps, { logOutUser })(Navbar);
