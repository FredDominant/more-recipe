import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import getUserRecipes from '../actions/getUserRecipes';
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
   *
   * @param {any} id
   * @memberof UserRecipePage
   */
  onUpdate(id) {
    console.log('updating recipe with id', id);
  }
  /**
   *
   *
   * @param {any} id
   * @memberof UserRecipePage
   */
  onDelete(id) {
    console.log('deleting recipe with id', id);
  }
  /**
   *
   *
   * @param {any} id
   * @memberof UserRecipePage
   */
  onView(id) {
    console.log('viewing recipe with id', id);
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
      <div key={'recipe ' + `${recipe.id}`} >
        <UserRecipeCard
          image={recipe.picture}
          name={recipe.name}
          description={recipe.description}
          id={recipe.id}
          onUpdate={this.onUpdate}
          onView={this.onView}
          onDelete={this.onDelete}
        />
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
  getAllUserRecipes: () => dispatch(getUserRecipes())
});

UserRecipePage.propTypes = {
  userRecipes: PropTypes.arrayOf(PropTypes.shape()),
  getAllUserRecipes: PropTypes.func.isRequired
};

UserRecipePage.defaultProps = {
  userRecipes: []
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipePage);

