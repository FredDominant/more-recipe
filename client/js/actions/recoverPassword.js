import axios from 'axios';
import toastr from 'toastr';

import { setFetching, unsetFetching } from './fetching';

const recoverPassword = email => (dispatch) => {
  dispatch(setFetching());
  return axios({
    method: 'POST',
    url: '/api/v1/users/recover-email',
    data: { email }
  })
    .then(() => {
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true
      };
      toastr.success('Recovery link sent. Please check the email you provided to reset your password');
    })
    .catch((error) => {
      const { Message } = error.response.data;
      dispatch(unsetFetching());
      toastr.options = {
        closeButton: true
      };
      toastr.error(Message);
    });
};
export default recoverPassword;
