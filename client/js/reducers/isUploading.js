import { UPLOADING, STOP_UPLOADING } from '../actions/actionTypes';
import initialState from '../store/initialState';

const isUploading = (state = initialState.isUploading, action) => {
  switch (action.type) {
    case UPLOADING:
      return true;
    case STOP_UPLOADING:
      return false;
    default:
      return state;
  }
};
export default isUploading;
