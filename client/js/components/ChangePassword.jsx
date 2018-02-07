import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import Footer from './Footer';
import verifyRecoveryToken from '../utils/verifyRecoveryToken';
import resetPasswordValidator from '../validation/resetPasswordValidator';
import resetPassword from '../actions/resetPassword';

/**
 * @description renders component to change users' paswword
 *
 * @class ChangePassword
 *
 * @extends {React.Component}
 */
export class ChangePassword extends React.Component {
  /**
 * @description Creates an instance of ChangePassword.
 *
 * @param {object} props
 *
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
   * @param {object} event
   *
   * @memberof ChangePassword
   *
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
   *
   * @param {object} event
   *
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
   *
   * @memberof PasswordRecoveryForm
   *
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
   * @returns {node} react component
   *
   * @memberof ChangePassword
   */
  render() {
    if (this.props.authenticated) {
      return this.props.history.push('/');
    }
    if (!verifyRecoveryToken(this.props.match.params.token)) {
      // return <Redirect to="/" />;
      return this.props.history.push('/');
    }
    const { password, confirmPassword, errors } = this.state;
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-lg-4" />
            <div className="col-md-4 col-sm-4 col-lg-4 change-password">
              <form className="form-group" onSubmit={this.onSubmit}>
                <div className="container reset-password-container mt-7 mb-7">
                  <div className="">
                    <label htmlFor="password">Enter Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={this.onChange}
                      className="form-control reset-password mb-2"
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
                      value={confirmPassword}
                      onChange={this.onChange}
                      className="form-control reset-password mb-2"
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
                      className="btn btn-primary reset-password mb-2"
                      id="reset-password-button"
                      onClick={this.onSubmit}
                    >
                    Reset Password { this.props.fetching && <span>  <MDSpinner /> </span>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4 col-xs-8 col-sm-4 col-lg-4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
ChangePassword.propTypes = {
  match: PropTypes.shape().isRequired,
  resetPassword: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

ChangePassword.defaultProps = {
  history: {
    push: () => {}
  }
};
const mapDispatchToProps = dispatch => ({
  resetPassword: userData => dispatch((resetPassword(userData)))
});
const mapStateToProps = state => ({
  fetching: state.isFetching,
  authenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

