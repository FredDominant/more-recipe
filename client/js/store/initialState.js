const initialState = {
  auth: {
    isAuthenticated: !!localStorage.getItem('token')
  },
  isFetching: false,
  isUploading: false,
  recipes: {
  }
};
export default initialState;
