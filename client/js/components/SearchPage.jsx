import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from './Footer';
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
      recipes: [],
      searchErrors: false,
    };
  }
  /**
   * @param {any} nextProps
   * @memberof SearchPage
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const { recipes, searchErrors } = nextProps;
    this.setState({ recipes, searchErrors });
    console.log(typeof searchErrors);
  }
  /**
   * @returns {jsx} React component
   * @memberof SearchPage
   */
  render() {
    console.log(typeof this.state.searchErrors);

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
        <div className="container search-page-body" id="search-body-result">
          <h1 className="text-center" id="search-header">Search Awesome Recipes</h1>
          <br />
          <Search />
          <br />
          {
            recipes.length > 0 && <h4 className="text-center" id="search-results">
             Search results
            </h4>
          }
          <br />
          <div className="row">
            {recipes}
          </div>
          { this.state.searchErrors && <div className="">
            <h5 className="text-center" id="no-match-found"> No match(es) found</h5>
          </div>}
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
  searchErrors: PropTypes.bool,
};
SearchPage.defaultProps = {
  recipes: [],
  searchErrors: false
};

export default connect(mapStateToProps, {})(SearchPage);

