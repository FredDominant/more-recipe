import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr';

import loginValidator from '../validation/LoginValidator';
import loginUser from '../actions/loginUser';

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
   * @returns {dispatch} dispatch
   *
   * @param {any} event
   * @memberof Login
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const { email, password } = this.state;
      toastr.options = {
        closeButton: true
      };
      toastr.success('You are now logged in');
      this.props.login({ email, password });

      if (this.props.authenticated) {
        this.context.router.history.push('/home');
      }
    }
  }
  /**
 *
 * @returns {html} html
 * @memberof Login
 */
  render() {
    const errors = this.state.errors;
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
                <div>
                  <div className="container error-body">
                    {errors.email && <div className="alert alert-danger alert-dismissible" role="alert">{errors.email}
                      {/* <span aria-hidden="true" className="close" data-dismiss="alert" aria-label="Close">&times;</span> */}
                    </div>}
                    {this.props.errorMessage && <div className="alert alert-danger alert-dismissible" role="alert">{this.props.errorMessage}
                      {/* <span aria-hidden="true" className="close" data-dismiss="alert" aria-label="Close">&times;</span> */}
                    </div>}
                    {errors.password && <div className="alert alert-danger alert-dismissible" role="alert">{errors.password}
                      {/* <span aria-hidden="true" className="close" data-dismiss="alert" aria-label="Close">&times;</span> */}
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
                        <button type="submit" className="form-control btn btn-primary register-button"> <span className="register-text"> Log in </span> </button>
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
Login.propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  authenticated: PropTypes.bool.isRequired
};
Login.defaultProps = {
  errorMessage: null
};
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.errorMessage
});
const mapDispatchToProps = dispatch => ({
  login: user => dispatch(loginUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
