import axios from 'axios';

import { setFetching, unsetFetching } from './fetching';
import toaster from '../utils/toaster';

/**
 * @returns {promise} axios promise
 *
 * @param {object} userData
 */
const resetPassword = userData => (dispatch) => {
  const { token, password, confirmPassword } = userData;
  dispatch(setFetching());
  return axios({
    method: 'PUT',
    url: '/api/users/reset-password',
    headers: {
      'x-access-token': token
    },
    data: { password, confirmPassword }
  })
    .then(() => {
      dispatch(unsetFetching());
      toaster.toastSuccess('Password reset. Proceed to login');
    })
    .catch(() => {
      dispatch(unsetFetching());
      toaster.toastError('Unable to complete');
    });
};
export default resetPassword;

