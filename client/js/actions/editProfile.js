import axios from 'axios';
import toastr from 'toastr';
import { batchActions } from 'redux-batched-actions';

import { EDIT_PROFILE, EDIT_PROFILE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const updateProfileSuccess = userDetails => ({
  type: EDIT_PROFILE,
  user: userDetails
});

const updateProfileFail = error => ({
  type: EDIT_PROFILE_ERROR,
  error
});

const updateProfile = userData => (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(setFetching());
  axios({
    method: 'PUT',
    url: '/api/v1/users/update',
    data: userData,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { User } = response.data;
      dispatch(batchActions([
        updateProfileSuccess(User),
        unsetFetching()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.success('Profile Updated!');
    })
    .catch((error) => {
      const { Message } = error.response.data;
      dispatch(batchActions([
        updateProfileFail(Message),
        unsetFetching()
      ]));
      toastr.options = {
        closeButton: true
      };
      toastr.error('Unable to update profile');
    });
};
export default updateProfile;
