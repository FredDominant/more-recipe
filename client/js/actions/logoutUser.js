import toastr from 'toastr';

import { LOGOUT } from '../actions/actionTypes';

const logOut = () => ({
  type: LOGOUT
});

const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logOut());
  toastr.options = {
    closeButton: true
  };
  toastr.success('You are now logged out');
};

export default logOutUser;
