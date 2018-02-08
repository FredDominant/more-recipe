import React from 'react';
import { shallow } from 'enzyme';

import { Signup } from '../../components/Signup';

const props = {
  signup: jest.fn(),
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
  const wrapper = shallow(<Signup {...props} />);
  return {
    wrapper
  };
}

describe('Test for Signup component', () => {
  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
describe('onChange() should', () => {
  it('be called when form input changes', () => {
    const { wrapper } = setup();
    const event = {
      target: { name: 'firstName', value: 'random name' }
    };
    const inputForm = wrapper.find('#firstName');
    inputForm.simulate('change', event);
    expect(wrapper.instance().state.firstName).toBe('random name');
  });
});

describe('handleSubmit() should', () => {
  it('not work for invalid email', () => {
    const wrapper = shallow(<Signup {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.form-group');
    wrapper.setState({
      email: 'random email',
      firstName: 'firstName',
      password: '123456'
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({
      confirmPassword: 'You need to confirm password',
      email: 'Invalid Email',
      lastName: 'Last Name is required',
      password: "Passwords don't match"
    });
    expect(wrapper.instance().props.signup).not.toBeCalled();
  });

  it('should work if form details are valid', () => {
    const wrapper = shallow(<Signup {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('.form-group');
    wrapper.setState({
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      password: '123456',
      confirmPassword: '123456'
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({});
    expect(wrapper.instance().props.signup).toBeCalled();
  });
});
