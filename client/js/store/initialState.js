import authenticateUser from '../utils/authenticateUser';

const initialState = {
  auth: {
    isAuthenticated: authenticateUser()
  },
  isFetching: false,
  isUploading: false,
  recipes: {
  }
};
export default initialState;
