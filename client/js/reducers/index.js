import { combineReducers } from 'redux';

import auth from './auth';
import isFetching from './isFetching';
import allRecipes from './allRecipes';
// import signupReducer from './signupReducer';

const reducers = combineReducers({
  auth,
  isFetching,
  allRecipes
});

export default reducers;
