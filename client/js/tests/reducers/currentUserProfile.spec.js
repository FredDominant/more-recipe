import { VIEW_PROFILE, EDIT_PROFILE } from '../../actions/actionTypes';
import currentUserProfile from '../../reducers/currentUserProfile';

describe('Test for currentUserProfile reducer should', () => {
  it('set user when action of type VIEW_PROFILE is called', () => {
    const initialState = {
      user: { }
    };
    const action = {
      type: VIEW_PROFILE,
      user: {
        firstName: 'Tested',
        lastName: 'User',
        imageUrl: '/images/user_avatar.png'
      }
    };
    const newState = currentUserProfile(initialState, action);
    expect(newState.User).toEqual(action.user);
  });

  it('update store correctly when action of type EDIT_PROFILE is called', () => {
    const initialState = {
      user: { }
    };
    const action = {
      type: EDIT_PROFILE,
      user: {
        firstName: 'Tested',
        lastName: 'User',
        imageUrl: '/images/user_avatar.png'
      }
    };
    const newState = currentUserProfile(initialState, action);
    expect(newState.User).toEqual(action.user);
    expect(newState.UpdateSuccess).toEqual(true);
  });
});
