import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import mockData from '..//mocks/response.mock';
import signupUser from '../../actions/signupUser';
import loginUser from '../../actions/loginUser';
import viewProfile from '../../actions/userProfile';
import logOut from '../../actions/logoutUser';
import recoverPassword from '../../actions/recoverPassword';
import resetPassword from '../../actions/resetPassword';

import {
  RECIEVE_AUTH,
  AUTH_ERROR,
  SET_FETCHING,
  UNSET_FETCHING,
  VIEW_PROFILE,
  VIEW_PROFILE_ERROR,
  LOGOUT
} from '../../actions/actionTypes';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Test for users action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  describe('to signup should', () => {
    it('dispatch action to sign user up', () => {
      const { signup, signupData } = mockData;
      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: signup
      });

      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: RECIEVE_AUTH,
          token: signup.token,
          user: signup.user
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});

      return store.dispatch(signupUser(signupData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(store.getActions().length).toBe(3);
        });
    });
  });

  describe('signup failure should', () => {
    it('dispatch sign up fail actions', () => {
      const { signupData } = mockData;
      moxios.stubRequest('/api/v1/users/signup', {
        status: 500,
        response: {
          message: 'error'
        }
      });

      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: AUTH_ERROR,
          isAuthenticated: false,
          message: 'error'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});

      return store.dispatch(signupUser(signupData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(3);
        });
    });
  });

  describe('login success should', () => {
    it('dispatch login success actions if request passes', () => {
      const { loginData, login } = mockData;
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: login
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: RECIEVE_AUTH,
          token: login.token,
          user: login.user
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(loginUser(loginData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(3);
        });
    });
    it('dispatch login fail actions if request fails', () => {
      const { loginData } = mockData;
      moxios.stubRequest('/api/v1/users/signin', {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: AUTH_ERROR,
          isAuthenticated: false,
          message: 'error'
        },
        { type: UNSET_FETCHING }];
      const store = mockStore({});
      return store.dispatch(loginUser(loginData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(3);
        });
    });
  });

  describe('view profile should', () => {
    it('dispatch correctly if successful', () => {
      moxios.stubRequest('/api/v1/users/profile', {
        status: 200,
        response: {
          user: {
            id: 1,
            FirstName: 'John',
            LastName: 'Doe',
            Email: 'johndoe@email.com',
            Picture: 'https://image_rl'
          }
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: VIEW_PROFILE,
          user: {
            id: 1,
            FirstName: 'John',
            LastName: 'Doe',
            Email: 'johndoe@email.com',
            Picture: 'https://image_rl'
          }
        },
        { type: UNSET_FETCHING }
      ];
      const store = mockStore({});
      return store.dispatch(viewProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(3);
        });
    });
    it('dispatch error if not successful', () => {
      moxios.stubRequest('/api/v1/users/profile', {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        {
          type: VIEW_PROFILE_ERROR,
          Error: 'error'
        },
        { type: UNSET_FETCHING }
      ];
      const store = mockStore({});
      return store.dispatch(viewProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(3);
        });
    });
  });

  describe('logout should', () => {
    it('dispatch correctly', () => {
      const expectedActions = [
        { type: LOGOUT }
      ];
      const store = mockStore({});
      store.dispatch(logOut());
      expect(store.getActions()).toEqual(expectedActions);
      expect(expectedActions.length).toBe(1);
    });
  });

  describe('to recover password should', () => {
    const email = 'random@email.com';
    it('dispatch correctly if successful', () => {
      moxios.stubRequest('/api/v1/users/recover-email', {
        status: 200,
        response: {
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: UNSET_FETCHING }
      ];
      const store = mockStore({});
      return store.dispatch(recoverPassword(email))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(2);
        });
    });
    it('dispatch error if not successful', () => {
      moxios.stubRequest('/api/v1/users/recover-email', {
        status: 500,
        response: {
          message: 'error'
        }
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: UNSET_FETCHING }
      ];
      const store = mockStore({});
      return store.dispatch(recoverPassword(email))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(2);
        });
    });
  });

  describe('to reset password should', () => {
    const userData = {
      password: '123456',
      confirmPassword: '123456'
    };
    it('dispatch correctly if successful', () => {
      moxios.stubRequest('/api/v1/users/reset-password', {
        status: 200,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: UNSET_FETCHING }
      ];
      const store = mockStore({});
      return store.dispatch(resetPassword(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(2);
        });
    });
    it('dispatch error if not successful', () => {
      moxios.stubRequest('/api/v1/users/reset-password', {
        status: 500,
      });
      const expectedActions = [
        { type: SET_FETCHING },
        { type: UNSET_FETCHING }
      ];
      const store = mockStore({});
      return store.dispatch(resetPassword(userData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(expectedActions.length).toBe(2);
        });
    });
  });
});
