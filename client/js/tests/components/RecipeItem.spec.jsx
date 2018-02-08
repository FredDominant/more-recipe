import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import sinon from 'sinon';
import store from '../../store/store';

import { RecipeItem } from '../../components/RecipeItem';

const props = {
  recipeName: 'name',
  owner: 'first name',
  description: 'description',
  upvotes: 1,
  downvotes: 1,
  favourites: 1,
  views: 1,
  recipeId: 3,
  image: 'fakeimage.jpg',
  authenticated: true,
  favouriteCard: 'user',
  userRecipeCard: 'user'
};
/**
 * @description test for RecipeItem component
 *
 * @returns {null} null
 */
function setup() {
  const shallowWrapper = shallow(<RecipeItem {...props} />);
  const mountedWrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <RecipeItem {...props} store={store} />
      </BrowserRouter>
    </Provider>
  );
  return {
    shallowWrapper,
    mountedWrapper
  };
}

describe('RecipeItem component', () => {
  it('should render correctly', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toMatchSnapshot();
  });
});

describe('onDeleteRecipe should', () => {
  it('work correctly', () => {
    sinon.spy(RecipeItem.prototype, 'onDeleteRecipe');
    const { mountedWrapper } = setup();
    const deleteRecipeButton = mountedWrapper.find('#deleteRecipe');
    deleteRecipeButton.simulate('click');
    expect(RecipeItem.prototype.onDeleteRecipe.calledOnce).toEqual(true);
  });
});

describe('onRemoveFavourite should', () => {
  it('work correctly', () => {
    sinon.spy(RecipeItem.prototype, 'onRemoveFavourite');
    const { mountedWrapper } = setup();
    const deleteRecipeButton = mountedWrapper.find('#remove-favourite');
    deleteRecipeButton.simulate('click');
    expect(RecipeItem.prototype.onRemoveFavourite.calledOnce).toEqual(true);
  });
});
