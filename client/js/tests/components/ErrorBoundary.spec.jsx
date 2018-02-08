import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from '../../store/store';

import Errorboundary from '../../components/Errorboundary';

const props = {
  children: <div />
};
/**
 * @description test for Errorboundary component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<Errorboundary {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Errorboundary {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );

  return { shallowWrapper, mountedWrapper };
}
describe('ErrorBoundary component should', () => {
  it('render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly if error', () => {
    const wrapper = shallow(<Errorboundary {...props} />);
    wrapper.setState({ hasError: true });
    expect(wrapper.find('div').length).toBe(2);
  });

  it('call componentDidCatch() if error occurs', () => {
    const wrapper = shallow(<Errorboundary {...props} />);
    wrapper.setState({ hasError: true });
    wrapper.instance().componentDidCatch();
    expect(wrapper).toMatchSnapshot();
  });
});
