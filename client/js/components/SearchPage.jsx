import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Search from '../components/Search';
import RecipeItem from '../components/RecipeItem';
import capitalize from '../utils/capitalize';
/**
 * @class SearchPage
 * @extends {React.Component}
 */
class SearchPage extends React.Component {
  /**
 * Creates an instance of SearchPage.
 * @param {any} props
 * @memberof SearchPage
 */
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  /**
   * @param {any} nextProps
   * @memberof SearchPage
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    this.setState({ recipes });
  }
  /**
   * @returns {jsx} React component
   * @memberof SearchPage
   */
  render() {
    let recipes = (this.state.recipes) ? (this.state.recipes) : [];
    recipes = recipes.map(recipe => (
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
        <br />
      </div>)
    );
    return (
      <div>
        <Navbar />
        <br />
        <div className="container">
          <Search />
          <br />
          <div className="row">
            {recipes}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes.allRecipes
});
SearchPage.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape())
};
SearchPage.defaultProps = {
  recipes: []
};

export default connect(mapStateToProps, {})(SearchPage);

