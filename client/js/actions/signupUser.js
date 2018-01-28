import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { setFetching, unsetFetching } from './fetching';
import { recieveAuth, authError } from './loginUser';
import toaster from '../utils/toaster';

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
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      dispatch(batchActions([
        recieveAuth(user, token),
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
export default signupUser;
