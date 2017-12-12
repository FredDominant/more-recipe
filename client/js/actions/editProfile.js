import axios from 'axios';
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
      console.log('User from response is', User);
      dispatch(batchActions([
        updateProfileSuccess(User)
      ]));
    })
    .catch((error) => {
      console.log('error from server is', error);
      // const { Message } = error.response.data;
      // dispatch(batchActions([
      //   updateProfileFail(Message)
      // ]));
    });
};
export default updateProfile;
