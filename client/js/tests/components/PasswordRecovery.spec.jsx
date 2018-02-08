import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { PasswordRecoveryForm } from '../../components/PasswordRecoveryForm';

const props = {
  recoverPassword: jest.fn(),
  fetching: false
};

/**
 * @description test for Search component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<PasswordRecoveryForm {...props} />);
  return { shallowWrapper };
}

describe('PasswordRecoveryForm component should', () => {
  it('render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'email', value: 'random@email.com' }
    };
    const inputForm = shallowWrapper.find('#email');
    inputForm.simulate('change', event);
    expect(shallowWrapper.instance().state.email).toBe('random@email.com');
  });
});

describe('onSubmit() should', () => {
  it('not work for invalid email', () => {
    const wrapper = shallow(<PasswordRecoveryForm {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('#recover-password-button');
    wrapper.setState({ email: '' });
    form.simulate('click', event);
    expect(wrapper.instance().state.errors).toEqual({ email: 'Invalid Email' });
  });

  it('be called when form is submitted', () => {
    const wrapper = shallow(<PasswordRecoveryForm {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('#recover-password-button');
    wrapper.setState({ email: 'random@email.com' });
    form.simulate('click', event);
    expect(wrapper.instance().state.errors).toEqual({});
  });
});

describe('onToggleLogin() should', () => {
  it('work when clicked', () => {
    const shallowWrapper = shallow(<PasswordRecoveryForm {...props} />);
    sinon.spy(PasswordRecoveryForm.prototype, 'onToggleLogin');
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('be called when link is clicked', () => {
    const wrapper = shallow(<PasswordRecoveryForm {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const forgotPasswordLink = wrapper.find('#login-link');
    forgotPasswordLink.simulate('click', event);
    wrapper.instance().onToggleLogin();
    expect(wrapper.instance().state.errors).toEqual({});
  });
});

