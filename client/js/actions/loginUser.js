import axios from 'axios';

import { batchActions } from 'redux-batched-actions';
import { setFetching, unsetFetching } from './fetching';
import { RECIEVE_AUTH, AUTH_ERROR } from './actionTypes';
import toaster from '../utils/toaster';


export const recieveAuth = (token, user) => ({
  type: RECIEVE_AUTH,
  token,
  user
});

export const authError = message => ({
  type: AUTH_ERROR,
  isAuthenticated: false,
  message
});

const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/signin', { email, password })
    .then((response) => {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      dispatch(batchActions([
        recieveAuth(token, user),
        unsetFetching()
      ]));
      document.body.classList.remove('modal-open');
      $('div.modal-backdrop ').removeClass('modal-backdrop fade show');
      toaster.toastSuccess('Welcome');
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(batchActions([
        authError(message),
        unsetFetching()
      ]));
    });
};

export default loginUser;

