import { LOGOUT } from '../actions/actionTypes';

const logOut = () => ({
  type: LOGOUT
});

const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logOut());
};

export default logOutUser;
