import { SET_FETCHING, UNSET_FETCHING } from '../../actions/actionTypes';
import isFetching from '../../reducers/isFetching';

describe('Test for isFetching reducer', () => {
  it('return true when SET_FETCHING is called', () => {
    const initialState = {
      isFetching: {}
    };
    const action = {
      type: SET_FETCHING
    };
    const newState = isFetching(initialState, action);
    expect(newState).toEqual(true);
  });
  it('return false when UNSET_FETCHING is called', () => {
    const initialState = {
      isFetching: {}
    };
    const action = {
      type: UNSET_FETCHING
    };
    const newState = isFetching(initialState, action);
    expect(newState).toEqual(false);
  });
});
