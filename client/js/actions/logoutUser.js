import toaster from '../utils/toaster';
import { LOGOUT } from '../actions/actionTypes';

const logOut = () => ({
  type: LOGOUT
});

const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logOut());
  toaster.toastSuccess('logged out');
};

export default logOutUser;
