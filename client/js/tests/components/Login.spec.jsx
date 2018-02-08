import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Login } from '../../components/Login';

const props = {
  login: jest.fn(),
  errorMessage: '',
  authenticated: true,
  fetching: false,
  history: {
    push: () => {}
  }
};
/**
 * @description test for Body component
 *
 * @returns {null} null
 */
function setup() {
  const wrapper = shallow(<Login {...props} />);
  return {
    wrapper
  };
}

describe('Test for Login component', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { wrapper } = setup();
    const event = {
      target: { name: 'email', value: 'random@email.com' }
    };
    const inputForm = wrapper.find('#login-email');
    inputForm.simulate('change', event);
    expect(wrapper.instance().state.email).toBe('random@email.com');
  });
});

describe('handleSubmit() should', () => {
  it('not work for invalid email', () => {
    const wrapper = shallow(<Login {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.form-group');
    wrapper.setState({ password: '123456' });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({ email: 'Invalid Email' });
  });

  it('be called when form is submitted', () => {
    const wrapper = shallow(<Login {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.form-group');
    wrapper.setState({ email: 'random@email.com', password: '123456' });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({});
  });
});

describe('onForgotPassword() should', () => {
  it('be called when link is clicked', () => {
    const wrapper = shallow(<Login {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const forgotPasswordLink = wrapper.find('#forgotPassword');
    forgotPasswordLink.simulate('click', event);
    wrapper.instance().onForgotPassword();
    expect(wrapper.instance().state.errors).toEqual({});
  });
});
