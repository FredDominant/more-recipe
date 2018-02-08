import initialState from '../store/initialState';
import { GET_PAGE_DETAILS } from '../actions/actionTypes';

const pageInfo = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_PAGE_DETAILS:
      return {
        ...state,
        currentPage: action.details.currentPage,
        limit: action.details.limit,
        pages: action.details.pages,
        numberOfItems: action.details.numberOfItems
      };
    default:
      return state;
  }
};

export default pageInfo;

