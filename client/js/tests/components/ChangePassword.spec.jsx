import React from 'react';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { shallow } from 'enzyme';

import { ChangePassword } from '../../components/ChangePassword';

const props = {
  match: {
    params: {
      token: jwt.sign({ name: 'randomName' }, 'ARSENAL', { expiresIn: 86400 })
    }
  },
  resetPassword: jest.fn(),
  authenticated: false,
  fetching: false
};

/**
 * @description test for Search component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<ChangePassword {...props} />);
  return { shallowWrapper };
}
describe('ChangePassword component', () => {
  it('should render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange', () => {
  it('should set form value', () => {
    const event = {
      target: { name: 'password', value: '123456' }
    };
    const { shallowWrapper } = setup();
    const password = shallowWrapper.find('#password');
    password.simulate('change', event);
    expect(shallowWrapper.instance().state.password).toBe('123456');
  });
});

describe('onSubmit', () => {
  it('should not work if passwords do not match', () => {
    const wrapper = shallow(<ChangePassword {...props} />);
    sinon.spy(ChangePassword.prototype, 'onSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('form');
    wrapper.setState({ password: '123456', confirmPassword: '123456789' });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).not.toEqual({});
  });

  it('should work if passwords match', () => {
    const wrapper = shallow(<ChangePassword {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('form');
    wrapper.setState({ password: '123456', confirmPassword: '123456' });
    form.simulate('submit', event);

    expect(wrapper.instance().state.errors).toEqual({});
  });
});
