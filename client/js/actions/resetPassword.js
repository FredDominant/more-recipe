import axios from 'axios';
import toastr from 'toastr';

import { setFetching, unsetFetching } from './fetching';

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
    .then((response) => {
      console.log('response from reset is', response);
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true
      };
      toastr.success('Password reset. Proceed to login');
    })
    .catch((error) => {
      console.log('error is', error);
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true
      };
      toastr.error('An error ocurred. Please try again later');
    });
};
export default resetPassword;

