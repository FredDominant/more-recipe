import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Search from '../components/Search';
import RecipeItem from '../components/RecipeItem';
import capitalize from '../utils/capitalize';
/**
 * @class SearchPage
 *
 * @extends {React.Component}
 */
export class SearchPage extends React.Component {
  /**
 * @description Creates an instance of SearchPage.
 *
 * @param {object} props
 *
 * @memberof SearchPage
 */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      searchErrors: '',
    };
  }
  /**
   * @param {object} nextProps
   *
   * @memberof SearchPage
   *
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const { recipes, searchErrors } = nextProps;
    this.setState({ recipes, searchErrors });
  }
  /**
   *
   * @memberof SearchPage
   *
   * @return {ReactElement} markup
   */
  render() {
    let recipes = (this.state.recipes) ? (this.state.recipes) : [];
    recipes = recipes.map(recipe => (
      <div key={recipe.id} className="col-xs-8 col-sm-8 col-md-4">
        <RecipeItem
          image={recipe.picture}
          recipeId={recipe.id}
          recipeName={capitalize(recipe.name)}
          description={capitalize(recipe.description)}
          upvotes={recipe.upvote}
          downvotes={recipe.downvote}
          views={recipe.views}
          owner={`${recipe.User.firstName} ${recipe.User.lastName}`}
        />
        <br />
      </div>)
    );
    return (
      <div>
        <div className="container search-page-body" id="search-body-result">
          <h1 className="text-center" id="search-header">Search Awesome Recipes</h1>
          <br />
          <Search focus />
          <br />
          {
            recipes.length > 0 &&
            <h4 className="text-center" id="search-results">
             Search results
            </h4>
          }
          <br />
          <div className="row">
            {recipes}
          </div>
          {
            this.state.searchErrors.length > 2 &&
            <div>
              <h5 className="text-center" id="no-match-found"> No match(es) found</h5>
            </div>
          }
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes.allRecipes,
  searchErrors: state.recipes.failure,
});
SearchPage.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()),
  searchErrors: PropTypes.string,
};
SearchPage.defaultProps = {
  recipes: [],
  searchErrors: ''
};

export default connect(mapStateToProps, {})(SearchPage);

