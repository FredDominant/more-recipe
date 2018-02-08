import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Navbar } from '../../components/Navbar';

const props = {
  logOutUser: jest.fn(),
  authenticated: true,
  children: <div />
};
/**
 * @description test for Navbar component
 *
 * @returns {null} null
 */
function setup() {
  const wrapper = shallow(<Navbar {...props} />);

  return {
    wrapper
  };
}

describe('Test for authenticated Navbar component', () => {
  sinon.spy(Navbar.prototype, 'handleLogout');
  it('should render correctly for authenticated users', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('logOutUser() should work correctly', () => {
    const { wrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const logOut = wrapper.find('.btn-default');
    logOut.simulate('click', event);
    expect(Navbar.prototype.handleLogout.calledOnce).toEqual(true);
  });
});

describe('Test for non authenticated Navbar component', () => {
  it('should render correctly for unauthenticated users', () => {
    const newProps = {
      logOutUser: jest.fn(),
      authenticated: false,
      children: <div />
    };
    const wrapper = shallow(<Navbar {...newProps} />);
    expect(wrapper.find('li').length).toBe(2);
  });
});
