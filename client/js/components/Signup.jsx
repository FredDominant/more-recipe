import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MDSpinner from 'react-md-spinner';

import signupValidator from '../validation/SignupValidator';
import signupUser from '../actions/signupUser';
/**
 * @description this class creates a signup form
 *
 * @class Signup
 *
 * @extends {React.Component}
 */
export class Signup extends React.Component {
/**
 * @description Creates an instance of Signup.
 *
 * @param {any} props
 *
 * @memberof Signup
 */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
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
 *
 * @returns {null} null
 *
 * @param {any} event
 *
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
   *
   * @param {any} event
   *
   * @memberof Signup
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      const { firstName, lastName, email, password, confirmPassword } = this.state;
      this.props.signup({ firstName, lastName, email, password, confirmPassword });
      this.setState({ errors: {} });

      if (this.props.authenticated) {
        this.props.history.push('/');
      }
    }
  }
  /**
   *
   * @returns {boolean} boolean
   *
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
   *
   * @memberof Signup
   */
  render() {
    const {
      errors,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;
    const { fetching, errorMessage } = this.props;
    return (
      <div>
        <div
          className="modal fade"
          id="register"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content container register-signup">
              <div className="row container">
                <div className="col-xs-2">
                  <button
                    type="button"
                    className="close cancel-signup"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span className="close-signup" aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div className="row container">
                <div className="col-xs-12 text-center">
                  <span><h1 className="modal-title" id="signup-title" >More Recipes</h1></span>
                  <span>
                    <h6 className="signup-text text-center">
                    Register to view cool awesome recipes,
                    rate and review recipes, and create your own recipes and menus.
                    </h6>
                  </span>
                </div>
              </div>
              <div className="modal-body">
                <div>
                  <div className="container">
                    {errorMessage &&
                    <div className="alert alert-danger" role="alert">{errorMessage}
                    </div>}
                    {errors.firstName &&
                    <div className="alert alert-danger" role="alert">{errors.firstName}
                    </div>}
                    {errors.lastName &&
                    <div className="alert alert-danger" role="alert">{errors.lastName}
                    </div>}
                    {errors.email &&
                    <div className="alert alert-danger" role="alert">{errors.email}
                    </div>}
                    {errors.password &&
                    <div className="alert alert-danger" role="alert">{errors.password}
                    </div>}
                    {errors.confirmPassword &&
                    <div className="alert alert-danger" role="alert">{errors.confirmPassword}
                    </div>}
                  </div>
                  <form className="form-group" onSubmit={this.onSubmit}>
                    <div className="container">
                      <div className="input-group">
                        <span
                          className="input-group-addon"
                          id="firstName-addon"
                        >
                          <i className="fa fa-user" aria-hidden="true" />
                        </span>
                        <input
                          type="text"
                          value={firstName}
                          id="firstName"
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="First Name"
                          aria-label="firstName"
                          aria-describedby="firstName-addon"
                          name="firstName"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span
                          className="input-group-addon"
                          id="lastName-addon"
                        >
                          <i className="fa fa-user" aria-hidden="true" />
                        </span>
                        <input
                          type="text"
                          value={lastName}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="Last Name"
                          aria-label="lastName"
                          aria-describedby="lastName-addon"
                          name="lastName"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span
                          className="input-group-addon"
                          id="email-addon"
                        >
                          <i className="fa fa-envelope" aria-hidden="true" />
                        </span>
                        <input
                          type="email"
                          value={email}
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
                        <span
                          className="input-group-addon"
                          id="password-addon"
                        >
                          <i className="fa fa-key" aria-hidden="true" />
                        </span>
                        <input
                          type="password"
                          value={password}
                          onChange={this.onChange}
                          className="form-control signup-form"
                          placeholder="Password"
                          aria-label="password"
                          aria-describedby="password-addon"
                          name="password"
                        />
                      </div>
                      <br />
                      <div className="input-group">
                        <span
                          className="input-group-addon"
                          id="confirmPassword-addon"
                        >
                          <i className="fa fa-key" aria-hidden="true" />
                        </span>
                        <input
                          type="password"
                          value={confirmPassword}
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
                        <button
                          type="submit"
                          className="form-control btn signup-form register-button"
                          disabled={fetching}
                        >
                          <span className="register-text">
                          Register { fetching && <span> <MDSpinner singleColor="#FFFFFF" /></span> }
                          </span> </button>
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
  signup: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

Signup.defaultProps = {
  errorMessage: '',
  history: {
    push: () => {}
  }
};

// Signup.contextTypes = {
//   router: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  authenticated: state.auth.isAuthenticated,
  fetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch((signupUser(user)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
