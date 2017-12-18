import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getUserRecipes from '../actions/getUserRecipes';
import deleteRecipe from '../actions/deleteRecipe';
import Navbar from '../components/Navbar';
import UserRecipeCard from '../components/UserRecipeCard';

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
      <div key={'recipe ' + `${recipe.id}`} className="col-sm-6 col-md-4" >
        <UserRecipeCard
          image={recipe.picture}
          name={recipe.name}
          description={recipe.description}
          id={recipe.id}
          onDelete={this.props.deleteRecipe}
        />
        <br />
      </div>
    ));
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

