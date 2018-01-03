import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MDSpinner from 'react-md-spinner';

import loginValidator from '../validation/LoginValidator';
import loginUser from '../actions/loginUser';
import PasswordRecoveryForm from '../components/PasswordRecoveryForm';

/**
 *
 *
 * @export
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  /**
 * Creates an instance of Login.
 * @param {any} props
 * @memberof Login
    */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
  }
  /**
   * @returns {null} null
   *
   * @param {any} event
   * @memberof Login
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @description this method toggles display of password recovery
   * @returns {null} null
   * @memberof Login
   */
  onForgotPassword() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('recover-password').style.display = 'block';
    console.log(this);
  }
  /**
   * @returns {dispatch} dispatch
   *
   * @param {any} event
   * @memberof Login
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const { email, password } = this.state;
      this.props.login({ email, password });

      if (this.props.authenticated) {
        this.context.router.history.push('/home');
      }
    }
  }
  /**
 *
 *
 * @returns {boolean} boolean
 * @memberof Login
 */
  isValid() {
    const { errors, isValid } = loginValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
 *
 * @returns {html} html
 * @memberof Login
 */
  render() {
    const { errors } = this.state;
    if (this.props.authenticated) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <div className="modal fade" id="login" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content container">
              <div className="row">
                <div className="col-sm-8 login-head">
                  <span><h1 className="modal-title" id="login-title">More Recipes</h1></span>
                </div>
                <div className="col-sm-4 login-close">
                  <button type="button" className="close cancel-login" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <div id="login-form">
                  <div className="container error-body">
                    {errors.email && <div className="alert alert-danger alert-dismissible" role="alert">{errors.email}
                    </div>}
                    {this.props.errorMessage && <div className="alert alert-danger alert-dismissible" role="alert">{this.props.errorMessage}
                    </div>}
                    {errors.password && <div className="alert alert-danger alert-dismissible" role="alert">{errors.password}
                    </div>}
                    <br />
                  </div>
                  <form className="form-group" onSubmit={this.handleSubmit}>
                    <div className="container">
                      <div className="input-group">
                        <label htmlFor="#" className="control-label" /> <br />
                        <span className="input-group-addon" id="email-addon"><i className="fa fa-envelope" aria-hidden="true" /></span>
                        <input
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          className="form-control login-form"
                          placeholder="Email "
                          aria-label="email"
                          aria-describedby="email-addon"
                        />

                      </div>
                      <br />
                      <div className="input-group">
                        <label htmlFor="#" className="control-label" /> <br />
                        <span className="input-group-addon" id="password-addon"><i className="fa fa-key" aria-hidden="true" /></span>
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          className="form-control login-form"
                          placeholder="Password"
                          aria-label="password"
                          aria-describedby="password-addon"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <button
                          type="submit"
                          className="form-control btn btn-primary register-button"
                        > <span className="register-text"> Log in  {this.props.fetching && <span> <MDSpinner /></span>}</span>
                        </button>
                      </div>
                      <br />
                      <small>
                        <h6 id="forgot-password"><a onClick={this.onForgotPassword} role="presentation">Forgot password? No problem</a></h6>
                      </small>
                    </div>
                  </form>
                </div>
                <div id="recover-password">
                  <PasswordRecoveryForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired
};
Login.defaultProps = {
  errorMessage: null
};
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.errorMessage,
  fetching: state.isFetching
});
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
