import axios from 'axios';
import toastr from 'toastr';

import { batchActions } from 'redux-batched-actions';
import { setFetching, unsetFetching } from './fetching';
import { RECIEVE_AUTH, AUTH_ERROR } from './actionTypes';

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
      const { Token, User } = response.data;
      localStorage.setItem('token', Token);
      dispatch(batchActions([
        recieveAuth(Token, User),
        unsetFetching()
      ]));
      document.body.classList.remove('modal-open');
      $('div.modal-backdrop ').removeClass('modal-backdrop fade show');
      toastr.options = {
        closeButton: true
      };
      toastr.success('You are now logged in');
    })
    .catch((error) => {
      const message = error.response.data.Message;
      dispatch(batchActions([
        authError(message),
        unsetFetching()
      ]));
    });
};

export default loginUser;

