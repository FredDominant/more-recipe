import toaster from '../utils/toaster';
import { LOGOUT } from '../actions/actionTypes';

/**
 * @returns {object} action
 *
 */
const logOut = () => ({
  type: LOGOUT
});

/**
 * @returns {null} null
 *
 */
const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logOut());
  toaster.toastSuccess('logged out');
};

export default logOutUser;
