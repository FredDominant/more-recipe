import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from '../components/Login';
import Signup from '../components/Signup';
import logOutUser from '../actions/logoutUser';
/**
 *
 *
 * @class Navbar
 * @extends {React.Component}
 */
class Navbar extends React.Component {
  /**
 * Creates an instance of Navbar.
 * @param {any} props
 * @memberof Navbar
 */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  // /**
  //  *
  //  * @returns {null} null
  //  * @memberof Navbar
  //  */
  // componentWillMount() {
  //   // document.body.classList.remove('modal-open');
  //   // $('div.modal-backdrop ').removeClass('modal-backdrop fade show');
  // }
  /**
   * @description this method handles user logout
   * @returns {function} function
   * @param {any} event
   * @memberof Navbar
   */
  handleLogout(event) {
    event.preventDefault();
    this.props.logOutUser();
    this.context.router.history.push('/');
  }
  /**
   *
   * @returns {component} react component
   * @memberof Navbar
   */
  render() {
    if (this.props.authenticated) {
      return (
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="row" id="nav2">
              <div className="col-sm-6">
                <span id="title" className="navbar-brand">
                  <Link to="/home"><h2 className="more-recipes" title="More Recipes and cooking tips">More Recipes</h2></Link>
                </span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
              </div>
              <div className="col-sm-6" id="navigation-icons">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {this.props.authenticated && <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <span className="nav-link"><span><i className="fas fa-user" /> </span>
                        <Link to="/profile">PROFILE </Link> <span className="sr-only">(current)</span></span>
                    </li>
                    <li className="nav-item active">
                      <span className="nav-link"><span><i className="fas fa-plus-circle" /> </span>
                        <Link to="/add-recipe">ADD RECIPE  </Link> <span className="sr-only">(current)</span></span>
                    </li>
                    <li className="nav-item active">
                      <span className="nav-link"><span><i className="fab fa-gratipay" /> </span>
                        <Link to="/favourites">FAVOURITES  </Link> <span className="sr-only">(current)</span></span>
                    </li>
                    <li className="nav-item active">
                      <a><button
                        className="btn btn-warning"
                        onClick={this.handleLogout}
                      ><span><i className="fas fa-sign-out-alt" /> </span>LOGOUT </button></a>
                    </li>
                  </ul>}
                  {!this.props.authenticated && <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link" data-toggle="modal" data-target="#register"><span><i className="fas fa-user-plus" /></span> REGISTER<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item active">
                      <a className="nav-link" data-toggle="modal" data-target="#login"><span><i className="fas fa-sign-in-alt" /></span> LOGIN<span className="sr-only">(current)</span></a>
                    </li>
                  </ul>}
                </div>
              </div>
            </div>
          </nav>
          {/* <Login />
          <Signup /> */}
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="row" id="nav2">
            <div className="col-sm-6">
              <span id="title" className="navbar-brand">
                <Link to="/home"><h2 className="more-recipes" title="More Recipes and cooking tips">More Recipes</h2></Link>
              </span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
            </div>
            <div className="col-sm-6" id="navigation-icons">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" data-toggle="modal" data-target="#register"><span><i className="fas fa-user-plus" /></span> REGISTER<span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item active">
                    <a className="nav-link" data-toggle="modal" data-target="#login"><span><i className="fas fa-sign-in-alt" /></span> LOGIN<span className="sr-only">(current)</span></a>
                  </li>
                </ul>
                <Login />
                <Signup />
              </div>
            </div>
          </div>
        </nav>
        {/* <Login />
      <Signup /> */}
      </div>
    );
  }
}
Navbar.contextTypes = {
  router: PropTypes.object.isRequired
};

Navbar.propTypes = {
  // user: PropTypes.string,
  logOutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};
Navbar.defaultProps = {
};
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logOutUser })(Navbar);
