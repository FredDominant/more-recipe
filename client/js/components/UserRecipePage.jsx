import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getUserRecipes from '../actions/getUserRecipes';
import deleteRecipe from '../actions/deleteRecipe';
import Navbar from '../components/Navbar';
import RecipeItem from '../components/RecipeItem';

/**
 *
 *
 * @class UserRecipePage
 * @extends {React.Component}
 */
class UserRecipePage extends React.Component {
/**
 * Creates an instance of UserRecipePage.
 * @param {any} props
 * @memberof UserRecipePage
 */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   *
   * @returns {null} null
   * @memberof UserRecipePage
   */
  componentDidMount() {
    this.props.getAllUserRecipes();
  }
  /**
   *
   * @return {null} null
   * @param {any} id
   * @memberof UserRecipePage
   */
  onDelete(id) {
    this.props.deleteRecipe(id);
  }
  /**
   *
   *
   * @returns {jsx} jsx
   * @memberof UserRecipePage
   */
  render() {
    const userRecipes = (this.props.userRecipes) ? this.props.userRecipes : [];
    const allUserRecipes = userRecipes.map(recipe => (
      <div key={`${recipe.id}`} className="col-sm-6 col-md-4" >
        <RecipeItem
          image={recipe.picture}
          recipeName={recipe.name}
          recipeId={recipe.id}
          description={recipe.description}
          userRecipeCard={'user'}
          onDelete={this.props.deleteRecipe}
          upvotes={recipe.upvote}
          downvotes={recipe.downvote}
          views={recipe.views}
          owner={'you'}
        />
        <br />
      </div>
    ));
    if (userRecipes.length) {
      return (
        <div>
          <Navbar />
          <br />
          <div className="container" >
            <div className="row">
              {allUserRecipes}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="">
        <Navbar />
        <br />
        <div className="container">
          <br />
          <div className="emptyContent">
            <br />
            <h3>You currently have no Recipes. Add new recipes... </h3>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userRecipes: state.getUserRecipe.userRecipes
});
const mapDispatchToProps = dispatch => ({
  getAllUserRecipes: () => dispatch(getUserRecipes()),
  deleteRecipe: recipeId => dispatch(deleteRecipe(recipeId))
});

UserRecipePage.propTypes = {
  userRecipes: PropTypes.arrayOf(PropTypes.shape()),
  getAllUserRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired
};

UserRecipePage.defaultProps = {
  userRecipes: []
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipePage);

