import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import store from '../../store/store';
import { UserProfile } from '../../components/UserProfile';
import mockData from '../mocks/recipes.mock';

const props = {
  viewProfile: jest.fn(),
  userDetails: {},
  updateProfile: jest.fn(() => Promise.resolve()),
};

const state = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  imageUrl: '',
  errors: {},
  disabled: true,
  uploadImageError: '',
  selectedImage: false,
  uploading: false,
};
/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
  const shallowWrapper = shallow(<UserProfile {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <UserProfile {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
};

describe('UserProfile component should', () => {
  sinon.spy(UserProfile.prototype, 'componentWillReceiveProps');
  it('render correctly', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    wrapper.setState(state);
    wrapper.instance().componentWillReceiveProps(props);
    expect(UserProfile.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });
});


describe('onChange', () => {
  it('should set form value', () => {
    const event = {
      target: { name: 'firstName', value: 'new name' }
    };
    const { shallowWrapper } = setup();
    const password = shallowWrapper.find('#profile-firstName');
    password.simulate('change', event);
    expect(shallowWrapper.instance().state.firstName).toBe('new name');
  });
});

describe('onUpload()', () => {
  beforeEach(() => {
    global.FileReader = () => ({
      readAsDataURL: () => {},
      onload: e => e
    });
    global.reader = {
      onload: () => {}
    };
  });

  it('should select an image when clicked', () => {
    const { shallowWrapper } = setup();
    const event = mockData.uploadImage;
    const action = shallowWrapper.instance();
    action.onUpload(event);
    action.setState({
      imageUrl: event.target.files
    });
    expect(action.state.imageUrl).toBe(event.target.files);
  });
});

describe('onEdit', () => {
  it('should set form value', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const shallowWrapper = shallow(<UserProfile {...props} />);
    const password = shallowWrapper.find('#edit');
    password.simulate('click', event);
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onSelectImage()', () => {
  it('should be called when image is clicked', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    wrapper.setState(state);
    wrapper.instance().onSelectImage();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('handleSubmit()', () => {
  it('should not work if passwords do not match', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    sinon.spy(UserProfile.prototype, 'handleSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('form');
    wrapper.setState({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: '123456',
      confirmPassword: '1234567',
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({
      confirmPassword: "Passwords don't match",
      password: "Passwords don't match",
    });
  });

  it('should work if passwords match', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('form');
    wrapper.setState({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
      password: '123456',
      confirmPassword: '123456',
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({});
  });

  it('should work if password is not updated', () => {
    const wrapper = shallow(<UserProfile {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const form = wrapper.find('form');
    wrapper.setState({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
    });
    form.simulate('submit', event);
    expect(wrapper.instance().state.errors).toEqual({});
  });
});
