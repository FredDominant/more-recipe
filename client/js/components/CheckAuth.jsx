import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import decodeToken from '../utils/decodeToken';
import logout from '../actions/logoutUser';

const AuthenticateRoutes = (component) => {
  /**
   *
   *
   * @class CheckAuth
   * @extends {React.Component}
   */
  class CheckAuth extends React.Component {
    /**
   * Creates an instance of CheckAuth.
   * @param {any} props
   * @memberof CheckAuth
   */
    constructor(props) {
      super(props);
      this.state = {};
    }
    /**
     *
     * @returns {null} null
     * @memberof CheckAuth
     */
    componentWillMount() {
      if (!decodeToken()) {
        return this.props.logout();
      }
    }
    /**
     *
     * @returns {null} null
     * @memberof CheckAuth
     */
    componentWillReceiveProps() {

    }
    /**
     *
     * @returns {jsx} jsx
     * @memberof CheckAuth
     */
    render() {
      return (
        <div>
          {
            this.props.auth ? <component {...this.props} /> : <Redirect to="/" />
          }
        </div>
      );
    }
  }
  const mapStateToProps = state => ({
    auth: state.auth.isAuthenticated
  });
  CheckAuth.propTypes = {
    auth: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };
  return connect(mapStateToProps, { logout })(CheckAuth);
};
export default AuthenticateRoutes;
