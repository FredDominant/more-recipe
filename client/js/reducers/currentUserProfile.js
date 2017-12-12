import initialState from '../store/initialState';
import { VIEW_PROFILE, EDIT_PROFILE } from '../actions/actionTypes';

const currentUserProfile = (state = initialState.user, action) => {
  switch (action.type) {
    case VIEW_PROFILE:
      return {
        ...state,
        User: action.user,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        User: action.user,
        UpdateSuccess: true
      };
    default:
      return state;
  }
};
export default currentUserProfile;

