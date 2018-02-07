import auth from '../../reducers/auth';

import {
  RECIEVE_AUTH,
  AUTH_ERROR,
  LOGOUT,
  SIGN_IN_USER
} from '../../actions/actionTypes';

describe('Test for auth reducer should', () => {
  it('set user when action of type RECIEVE_AUTH is passed', () => {
    const initialState = {
      auth: { }
    };
    const action = {
      type: RECIEVE_AUTH,
      user: {
        FirstName: 'First Name'
      },
      token: 'sjbfjkbbhgsdpzugsuduiau'
    };
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.errorMessage).toEqual('');
    expect(newState.token).toEqual(action.token);
    expect(newState.user.firstname).toEqual(action.user.FirstName);
  });

  it('log user out when action of type LOGOUT is passed', () => {
    const initialState = {
      auth: { }
    };
    const action = {
      type: LOGOUT,
      user: {
        FirstName: 'First Name'
      },
      token: 'sjbfjkbbhgsdpzugsuduiau'
    };
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.token).toBeFalsy();
    expect(newState.user.firstname).toEqual('Guest');
  });

  it('sign in user when action of type SIGN_IN_USER is passed', () => {
    const initialState = {
      auth: { }
    };
    const action = {
      type: SIGN_IN_USER,
      user: {
        FirstName: 'First Name'
      },
      token: 'sjbfjkbbhgsdpzugsuduiau'
    };
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.token).toBeTruthy();
    expect(newState.user).toEqual(action.user);
  });

  it('dispatch correctly when AUTH_ERROR is called', () => {
    const initialState = {
      auth: { }
    };
    const action = {
      type: AUTH_ERROR,
      user: {
        FirstName: 'First Name'
      },
      message: 'error'
    };
    const newState = auth(initialState, action);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.errorMessage).toEqual(action.message);
  });
});
