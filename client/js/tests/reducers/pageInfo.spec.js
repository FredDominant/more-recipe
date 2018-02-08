import { GET_PAGE_DETAILS } from '../../actions/actionTypes';
import pageInfo from '../../reducers/pageInfo';

describe('Test for pageInfo reducer should', () => {
  it('update store correctly when GET_PAGE_DETAILS is called', () => {
    const initialState = {
      recipes: { }
    };
    const action = {
      type: GET_PAGE_DETAILS,
      details: {
        currentPage: 3,
        limit: 6,
        pages: 3,
        numberOfItems: 20
      }
    };
    const newState = pageInfo(initialState, action);
    expect(newState.currentPage).toEqual(3);
    expect(newState.limit).toEqual(6);
    expect(newState.pages).toEqual(3);
    expect(newState.numberOfItems).toEqual(20);
  });
});
