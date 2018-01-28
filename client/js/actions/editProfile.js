import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

import { EDIT_PROFILE, EDIT_PROFILE_ERROR } from '../actions/actionTypes';
import { setFetching, unsetFetching } from '../actions/fetching';
import uploadImage from '../utils/uploadImage';
import toaster from '../utils/toaster';

/**
 * @description action creater
 *
 * @param {object} userDetails
 *
 * @returns {object} action
 */
const updateProfileSuccess = userDetails => ({
  type: EDIT_PROFILE,
  user: userDetails
});

/**
 * @description action creator
 *
 * @param {object} error
 *
 *  @returns {object} action
 */
const updateProfileFail = error => ({
  type: EDIT_PROFILE_ERROR,
  error
});

/**
 * @description makes api call to server and dispatches to redux store
 *
 * @param {object} userData
 * @param {string} token
 * @param {function} dispatch
 *
 * @returns {promise} axios promise
 */
const editProfileRequest = (userData, token, dispatch) => axios({
  method: 'PUT',
  url: '/api/v1/users/update',
  data: userData,
  headers: {
    'x-access-token': token
  }
})
  .then((response) => {
    const { user } = response.data;
    dispatch(batchActions([
      updateProfileSuccess(user),
      unsetFetching()
    ]));
    toaster.toastSuccess('profile updated');
  })
  .catch((error) => {
    const { message } = error.response.data;
    dispatch(batchActions([
      updateProfileFail(message),
      unsetFetching()
    ]));
    toaster.toastError(message);
  });

/**
 * @description checks if image was selected from component and uploads depending on condition
 *
 * @param {object} userData
 *
 * @returns {promise} axios promise
 */
const editProfile = userData => (dispatch) => {
  dispatch(setFetching());
  const token = localStorage.getItem('token');
  const { imageUrl, selectedImage } = userData;
  if (selectedImage) {
    return uploadImage(imageUrl)
      .then((uploadResponse) => {
        const url = uploadResponse.data.secure_url;
        userData = { ...userData, imageUrl: url };
        return editProfileRequest(userData, token, dispatch);
      })
      .catch(() => {
        const message = 'could not upload image';
        dispatch(batchActions([
          updateProfileFail(message),
          unsetFetching()
        ]));
        toaster.toastError(message);
      });
  }
  return editProfileRequest(userData, token, dispatch);
};
export default editProfile;
