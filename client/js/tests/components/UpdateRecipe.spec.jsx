import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import store from '../../store/store';
import { UpdateRecipe } from '../../components/UpdateRecipe';
import mockData from '../mocks/recipes.mock';

const props = {
  getRecipeDetails: jest.fn(),
  updateRecipe: jest.fn(() => Promise.resolve()),
  match: {
    params: {
      recipeId: 1
    }
  }
};

const state = {
  id: '',
  name: '',
  description: '',
  ingredients: '',
  directions: '',
  picture: '',
  errors: '',
  selectedImage: false,
  toggleEdit: true
};
/**
 *
 *
 * @returns {null} null
 */
const setup = () => {
  const shallowWrapper = shallow(<UpdateRecipe {...props} />);
  const mountedWrapper = mount(<Provider store={store}>
    <BrowserRouter>
      <UpdateRecipe {...props} store={store} />
    </BrowserRouter>
  </Provider>);

  return {
    shallowWrapper,
    mountedWrapper,
    props
  };
};
describe('Test for UpdateRecipe component', () => {
  const { shallowWrapper } = setup();
  it('should render correctly', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('onChange()', () => {
  it('should set recipe name field when input value changes', () => {
    sinon.spy(UpdateRecipe.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    const event = {
      target: { name: 'name', value: 'My food' }
    };
    const recipeNameInput = shallowWrapper.find('#recipeName');
    event.target.value = 'Awesome recipe';
    recipeNameInput.simulate('change', event);
    expect(shallowWrapper.instance().state.name).toBe('Awesome recipe');
  });
});

describe('ComponentWillRecieveProps()', () => {
  it('should be called when component is passed in new props', () => {
    const wrapper = shallow(<UpdateRecipe {...props} />);
    wrapper.setState(state);
    const nextProps = {
      recipeDetails: {
        id: '',
        name: '',
        description: '',
        ingredients: '',
        directions: '',
        picture: '',
        errors: '',
        selectedImage: false,
        toggleEdit: true
      }
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(UpdateRecipe.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
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
      picture: event.target.files
    });
    expect(action.state.picture).toBe(event.target.files);
  });
});

describe('onToggleEdit', () => {
  it('should set form value', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const shallowWrapper = shallow(<UpdateRecipe {...props} />);
    const password = shallowWrapper.find('#edit');
    password.simulate('click', event);
    expect(shallowWrapper).toMatchSnapshot();
  });
});

describe('handleSubmit()', () => {
  it('should submit for valid recipes', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState({
      name: 'randon name',
      description: 'description',
      ingredients: 'ingredients, ingredients, ingredients',
      directions: 'some directionsssss',
      picture: '/images/noImage.png',
    });

    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors)
      .toEqual({});
  });

  it('should not submit for invalid recipes', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    const form = shallowWrapper.find('form');
    shallowWrapper.setState({
      name: '',
      description: '',
      ingredients: '',
      directions: '',
    });
    form.simulate('submit', event);
    expect(shallowWrapper.instance().state.errors).not.toEqual({});
  });
});
