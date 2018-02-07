import axios from 'axios';

import { VIEW_PROFILE, VIEW_PROFILE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';

/**
 * @returns {object} action
 *
 * @param {object} user
 */
const viewProfileSuccess = user => ({
  type: VIEW_PROFILE,
  user
});

/**
 * @returns {object} action
 *
 * @param {string} message
 */
const viewProfileError = message => ({
  type: VIEW_PROFILE_ERROR,
  Error: message
});

/**
 * @returns {promise} axios promise
 *
 */
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
      dispatch(viewProfileSuccess(user));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      const { message } = error.response.data;
      dispatch(viewProfileError(message));
      dispatch(unsetFetching());
    });
};
export default viewProfile;
