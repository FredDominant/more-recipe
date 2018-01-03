import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import verifyRecoveryToken from '../utils/verifyRecoveryToken';
import resetPasswordValidator from '../validation/resetPasswordValidator';
import resetPassword from '../actions/resetPassword';

/**
 * @description renders component to change users' paswword
 *
 * @class ChangePassword
 * @extends {React.Component}
 */
class ChangePassword extends React.Component {
  /**
 * Creates an instance of ChangePassword.
 * @param {any} props
 * @memberof ChangePassword
 */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      token: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @param {any} event
   * @memberof ChangePassword
   * @returns {null} null
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof ChangePassword
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isvalid()) {
      const { password, confirmPassword } = this.state;
      const { token } = this.props.match.params;
      this.props.resetPassword({ token, password, confirmPassword });
    }
  }
  /**
   * @description validates for inputs
   * @memberof PasswordRecoveryForm
   * @returns {boolean} true or false
   */
  isvalid() {
    const { errors, isValid } = resetPasswordValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   *
   *
   * @returns {jsx} react component
   * @memberof ChangePassword
   */
  render() {
    if (!verifyRecoveryToken(this.props.match.params.token) || this.props.authenticated) {
      return <Redirect to="/home" />;
    }
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <br />
        <div className="container">
          <div className="change-password">
            <form className="form-group" onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="password">Enter Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  className="form-control reset-password"
                  id="password"
                  placeholder="Password"
                  name="password"
                />
                {errors.password && <small className="form-text text-muted">
                  <span className="error-text"> {errors.password} </span>
                </small>}
              </div>
              <br />
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  className="form-control reset-password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  name="confirmPassword"
                />
                {errors.confirmPassword && <small className="form-text text-muted">
                  <span className="error-text"> {errors.confirmPassword} </span>
                </small>}
              </div>
              <br />
              <div>
                <button
                  className="btn btn-primary"
                  id="reset-password-button"
                  onClick={this.onSubmit}
                >
                Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
ChangePassword.propTypes = {
  match: PropTypes.shape().isRequired,
  resetPassword: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};
const mapDispatchToProps = dispatch => ({
  resetPassword: userData => dispatch((resetPassword(userData)))
});
const mapStateToProps = state => ({
  fetching: state.isFetching,
  authenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

