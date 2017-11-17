import axios from 'axios';
/**
 * @description this function handles a user sign up
 *
 * @export
 * @param {any} userData
 * @returns {promise} axios promise
 */
export default function userSignupRequest(userData) {
  return (dispatch) => {
    axios.post('/api/v1/users/signup', userData);
  };
}
