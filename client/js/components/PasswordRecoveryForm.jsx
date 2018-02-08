import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

import recoverPassword from '../actions/recoverPassword';
import recoverPasswordValidator from '../validation/recoverPasswordValidator';

/**
 * @description renders a form to recover password
 *
 * @class PasswordRecoveryForm
 *
 * @extends {React.Component}
 */
export class PasswordRecoveryForm extends React.Component {
  /**
 * @description Creates an instance of PasswordRecoveryForm.
 *
 * @param {object} props
 *
 * @memberof PasswordRecoveryForm
 */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} event
   *
   * @memberof PasswordRecoveryForm
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
   * @memberof PasswordRecoveryForm
   */
  onSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    if (this.isvalid()) {
      this.props.recoverPassword(email);
    }
  }
  /**
   * @description hides recover password component and displays login form
   *
   * @memberof PasswordRecoveryForm
   *
   * @returns {null} null
   */
  onToggleLogin() {
    $('#recover-password').hide();
    $('#login-form').show();
  }
  /**
   * @description validates for inputs
   *
   * @memberof PasswordRecoveryForm
   *
   * @returns {boolean} true or false
   */
  isvalid() {
    const { errors, isValid } = recoverPasswordValidator(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   *
   * @memberof PasswordRecoveryForm
   *
   * @return {ReactElement} markup
   */
  render() {
    const { errors, email } = this.state;
    const { fetching } = this.props;
    return (
      <div className="container">
        <div className="recover-password">
          <form className="form-group">
            <input
              className="form-control"
              type="email"
              required
              id="email"
              name="email"
              onChange={this.onChange}
              value={email}
              placeholder="Type in your registered email"
            />
            {errors.email && <small className="form-text text-muted">
              <span className="error-text"> {errors.email} </span>
            </small>}
            <br />
            <button
              id="recover-password-button"
              className="btn"
              onClick={this.onSubmit}
            >
            Recover password
              {fetching && <span className="container">
                <MDSpinner />
              </span>}
            </button>
            <br />
            <div>
              <small>
                <h6 id="proceed-to-login">
                  <br />
                  <Link
                    to="#"
                    id="login-link"
                    onClick={this.onToggleLogin}
                    role="presentation"
                  >Proceed to log in
                  </Link>
                </h6>
              </small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
PasswordRecoveryForm.propTypes = {
  recoverPassword: Proptypes.func.isRequired,
  fetching: Proptypes.bool.isRequired
};
const mapDispatchToProps = dispatch => ({
  recoverPassword: email => dispatch((recoverPassword(email)))
});
const mapStateToProps = state => ({
  fetching: state.isFetching
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryForm);

