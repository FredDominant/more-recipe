import { SET_FETCHING, UNSET_FETCHING } from '../actions/actionTypes';
import initialState from '../store/initialState';

const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return true;
    case UNSET_FETCHING:
      return false;
    default:
      return state;
  }
};
export default isFetching;
