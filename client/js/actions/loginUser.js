import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { setFetching, unsetFetching } from './fetching';
import { RECIEVE_AUTH, AUTH_ERROR } from './actionTypes';

export const recieveAuth = (user, token) => ({
  type: RECIEVE_AUTH,
  user,
  token
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
        recieveAuth(User, Token),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      console.log('this is the error:', error.response.data.Message);
      const message = error.response.data.Message;
      dispatch(batchActions([
        authError(message),
        unsetFetching()
      ]));
    });
};

export default loginUser;

