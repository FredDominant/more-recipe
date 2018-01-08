import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../store/store';
import UserHome from '../../components/UserHome';
/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
  const props = {
    dispatch: jest.fn(),
    isFetching: false
  };
  const shallowWrapper = shallow(<UserHome {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <UserHome {...props} />
      </BrowserRouter>
    </Provider>
  );

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
};

describe('Test for UserHome component', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });
});
