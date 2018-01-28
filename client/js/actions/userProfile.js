import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { VIEW_PROFILE, VIEW_PROFILE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

const viewProfileSuccess = user => ({
  type: VIEW_PROFILE,
  user
});

const viewProfileError = message => ({
  type: VIEW_PROFILE_ERROR,
  Error: message
});

const viewProfile = () => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  return axios({
    method: 'GET',
    url: '/api/v1/users/profile',
    headers: {
      'x-access-token': token
    }
  })
    .then((response) => {
      const { user } = response.data;
      dispatch(batchActions([
        unsetFetching(),
        viewProfileSuccess(user)
      ]));
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(batchActions([
        unsetFetching(),
        viewProfileError(message)
      ]));
    });
};
export default viewProfile;
