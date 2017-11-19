const initialState = {
  auth: {
    isAuthenticated: !!localStorage.getItem('token')
  },
  isFetching: false,
  recipes: {
  }
};
export default initialState;
