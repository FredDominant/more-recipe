import React from 'react';
// import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../store/store';
import UserHome from '../../components/UserHome';
// import Search from '../../components/Search';
// import Carousel from '../../components/Carousel';
// import Navbar from '../../components/Navbar';
// import RecipeBody from '../../components/RecipeBody';
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
