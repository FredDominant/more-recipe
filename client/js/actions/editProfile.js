import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { EDIT_PROFILE, EDIT_PROFILE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const updateProfileSUccess = userDetails => ({
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
    data: userData,
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { User } = response.data;
      dispatch(updateProfileSUccess(User));
    })
    .catch((error) => {
      const { Message } = error.response.data;
      dispatch(updateProfileFail(Message));
    });
};
export default updateProfile;
