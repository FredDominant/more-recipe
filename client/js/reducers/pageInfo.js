import initialState from '../store/initialState';
import { GET_PAGE_DETAILS } from '../actions/actionTypes';

const pageInfo = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_PAGE_DETAILS:
      return {
        ...state,
        currentPage: action.details.CurrentPage,
        limit: action.details.Limit,
        pages: action.details.Pages,
        numberOfItems: action.details.NumberOfItems
      };
    default:
      return state;
  }
};

export default pageInfo;

