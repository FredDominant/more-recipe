import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RecipeItem from './RecipeItem';
import getAllRecipes from '../actions/getAllRecipes';
import capitalize from '../utils/capitalize';

/**
 * @description this class displays RecipeItem components
 *
 * @class RecipeBody
 * @extends {React.Component}
 */
class RecipeBody extends React.Component {
  /**
   *
   * @returns {dispatch} dispatch
   * @memberof RecipeBody
   */
  componentWillMount() {
    this.props.dispatch(getAllRecipes());
  }

  /**
 * @returns {html} html
 *
 * @memberof RecipeBody
 */
  render() {
    const recipes = (this.props.recipes) ? this.props.recipes : [];
    const allRecipes = recipes.map(recipe =>
      (
        <div key={recipe.id} className="col-sm-4">
          <RecipeItem
            image={recipe.picture}
            recipeId={recipe.id}
            recipeName={capitalize(recipe.name)}
            description={capitalize(recipe.description)}
            upvotes={recipe.upvote}
            downvotes={recipe.downvote}
            views={recipe.views}
            owner={`${recipe.User.firstname} ${recipe.User.lastname}`}
          />
        </div>)
    );
    return (
      <div className="row recipes-body">
        { allRecipes }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes.allRecipes
});

RecipeBody.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func.isRequired
};
RecipeBody.defaultProps = {
  recipes: []
};
export default connect(mapStateToProps)(RecipeBody);
