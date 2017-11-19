import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { recieveAuth, authError } from './loginUser';
/**
 * @description this function handles a user sign up
 *
 * @export
 * @param {any} userData
 * @returns {promise} axios promise
 */

const signupUser = userData => (dispatch) => {
  dispatch(setFetching());
  axios.post('/api/v1/users/signup', userData)
    .then((response) => {
      console.log(response);
      const { User, token } = response.data;
      localStorage.setItem('token', token);
      dispatch(batchActions([
        recieveAuth(User, token),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      const message = error.response.data.Message;
      dispatch(batchActions([
        authError(message),
        unsetFetching()
      ]));
    });
};
export default signupUser;
