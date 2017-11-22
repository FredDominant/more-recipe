import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import signupValidator from '../validation/SignupValidator';
import signupUser from '../actions/signupUser';
/**
 * @description this class creates a signup form
 *
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
/**
 * Creates an instance of Signup.
 * @param {any} props
 * @memberof Signup
 */
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
 * @description handles form change events
 * @returns {null} null
 * @param {any} event
 * @memberof Signup
 */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @return {dispatch} react-redux dispatch
   * @param {any} event
   * @memberof Signup
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      const { firstname, lastname, email, password, confirmPassword } = this.state;
      this.props.dispatch(signupUser({ firstname, lastname, email, password, confirmPassword }));
    }
  }
  /**
   *
   * @returns {boolean} boolean
   * @memberof Signup
   */
  isValid() {
    const { isValid, errors } = signupValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @description react render method
   *
   * @returns {component} react component
   * @memberof Signup
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="modal fade" id="register" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content container">
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
                  <div className="container">
                    {errors.firstname && <div className="alert alert-danger" role="alert">{errors.firstname}</div>}
                    {errors.lastname && <div className="alert alert-danger" role="alert">{errors.lastname}</div>}
                    {errors.email && <div className="alert alert-danger" role="alert">{errors.email}</div>}
                    {errors.password && <div className="alert alert-danger" role="alert">{errors.password}</div>}
                    {errors.confirmPassword && <div className="alert alert-danger" role="alert">{errors.confirmPassword}</div>}
                  </div>
                  <form className="form-group" onSubmit={this.onSubmit}>
                    <div className="container">
                      <div className="input-group">
                        <span className="input-group-addon" id="firstName-addon"><i className="fa fa-user" aria-hidden="true" /></span>
                        <input
                          type="text"
                          value={this.state.firstname}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="First Name"
                          aria-label="firstName"
                          aria-describedby="firstName-addon"
                          name="firstname"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span className="input-group-addon" id="lastName-addon"><i className="fa fa-user" aria-hidden="true" /></span>
                        <input
                          type="text"
                          alue={this.state.lastname}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="Last Name"
                          aria-label="lastName"
                          aria-describedby="lastName-addon"
                          name="lastname"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span className="input-group-addon" id="email-addon"><i className="fa fa-envelope" aria-hidden="true" /></span>
                        <input
                          type="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="Email "
                          aria-label="email"
                          aria-describedby="email-addon"
                          name="email"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span className="input-group-addon" id="password-addon"><i className="fa fa-key" aria-hidden="true" /></span>
                        <input
                          type="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="Password"
                          a
                          ria-label="password"
                          aria-describedby="password-addon"
                          name="password"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span className="input-group-addon" id="confirmPassword-addon"><i className="fa fa-key" aria-hidden="true" /></span>
                        <input
                          type="password"
                          value={this.state.confirmPassword}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="Confirm password"
                          aria-label="confirmPassword"
                          aria-describedby="confirmPassword-addon"
                          name="confirmPassword"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <button type="submit" className="form-control btn btn-primary signup-form" id="register-button"> <span className="register-text"> Register </span> </button>
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

Signup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(null)(Signup);
