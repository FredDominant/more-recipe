import axios from 'axios';
/**
 * @description this function logs a user in
 *
 * @export
 * @param {any} userData
 * @returns {promise} axios request
 */
export default function userLoginrequest(userData) {
  return (dispatch) => {
    return axios.post('/api/v1/users/signin', userData);
  };
}
