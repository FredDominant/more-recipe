import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import store from '../../store/store';
import { Reviews } from '../../components/Reviews';


/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
  const shallowWrapper = shallow(<Reviews {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Reviews {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
};

describe('Reviews component should', () => {
  it('render correctly if there are reviews', () => {
    const props = {
      getReviews: jest.fn(),
      recipeId: 1,
      reviews: [
        {
          User: {
            imageurl: 'random.jpg',
            firstName: 'firstName',
            lastName: 'lastName'
          },
          content: 'some content',
          createdAt: '12:14'
        },
        {
          User: {
            imageurl: 'random.jpg',
            firstName: 'second firstName',
            lastName: 'lsecond astName'
          },
          content: 'some other content',
          createdAt: '12:14'
        }
      ],
    };
    const wrapper = shallow(<Reviews {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render correctly if there are reviews', () => {
    const props = {
      getReviews: jest.fn(),
      recipeId: 1,
      reviews: [],
    };
    const wrapper = shallow(<Reviews {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    sinon.spy(Reviews.prototype, 'componentWillReceiveProps');
    const props = {
      getReviews: jest.fn(),
      recipeId: 1,
      reviews: [
        {
          User: {
            imageurl: 'random.jpg',
            firstName: 'firstName',
            lastName: 'lastName'
          },
          content: 'some content',
          createdAt: '12:14'
        },
        {
          User: {
            imageurl: 'random.jpg',
            firstName: 'second firstName',
            lastName: 'lsecond astName'
          },
          content: 'some other content',
          createdAt: '12:14'
        }
      ],
    };
    const wrapper = shallow(<Reviews {...props} />);
    const state = {
      reviews: [
        {

          User: {
            imageurl: 'random.jpg',
            firstName: 'firstName',
            lastName: 'lastName'
          },
          content: 'some content',
          createdAt: '12:14'
        }
      ]
    };
    wrapper.setState(state);
    wrapper.instance().componentWillReceiveProps(props);
    expect(Reviews.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });
});
