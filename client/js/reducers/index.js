import { combineReducers } from 'redux';

import auth from './auth';
import isFetching from './isFetching';
import recipes from './allRecipes';
import isUploading from './isUploading';
import addRecipe from '../reducers/addRecipe';
import getOneRecipe from '../reducers/getOneRecipe';
import currentUserProfile from '../reducers/currentUserProfile';
import getUserRecipe from '../reducers/getUserRecipe';
import getFavourites from '../reducers/getFavourites';
import pageInfo from '../reducers/pageInfo';

const reducers = combineReducers({
  auth,
  isFetching,
  recipes,
  addRecipe,
  getOneRecipe,
  getUserRecipe,
  getFavourites,
  isUploading,
  currentUserProfile,
  pageInfo
});

export default reducers;
