import React from 'react';
import { Redirect } from 'react-router-dom';

import store from '../store/store';
import decodeToken from './decodeToken';
import { LOGOUT } from '../actions/actionTypes';

const checkAuth = (Component) => {
  if (!store.getState().auth.isAuthenticated) {
    return () => <Redirect to="/" />;
  }
  if (!decodeToken()) {
    return store.dispatch({
      type: LOGOUT
    });
  }
  return props => <Component {...props} />;
};
export default checkAuth;

