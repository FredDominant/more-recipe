import axios from 'axios';

import { setFetching, unsetFetching } from './fetching';
import { RECIEVE_AUTH, AUTH_ERROR } from './actionTypes';
import toaster from '../utils/toaster';

/**
 * @returns {object} action
 *
 * @param {string} token
 * @param {object} user
 */
export const recieveAuth = ({ token, user }) => ({
  type: RECIEVE_AUTH,
  token,
  user
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});

/**
 * @returns {object} action
 *
 * @param {object} userLoginDetails
 */
const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/signin', { email, password })
    .then((response) => {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(recieveAuth({ token, user }));
      dispatch(unsetFetching());
      document.body.classList.remove('modal-open');
      $('div.modal-backdrop ').removeClass('modal-backdrop fade show');
      toaster.toastSuccess('Welcome');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(authError(message));
      dispatch(unsetFetching());
    });
};

export default loginUser;

