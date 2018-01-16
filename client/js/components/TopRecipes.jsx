import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import RecipeItem from './RecipeItem';
import getTopRecipes from '../actions/getTopRecipes';
import capitalize from '../utils/capitalize';
/**
 * @description renders Top Recipes
 * @class TopRecipes
 * @extends {React.Component}
 */
class TopRecipes extends React.Component {
/**
 * Creates an instance of TopRecipes.
 * @param {any} props
 * @memberof TopRecipes
 */
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  /**
 *
 * @returns {null} null
 * @memberof TopRecipes
*/
  componentDidMount() {
    this.props.getTopRecipes();
  }
  /**
* @returns {node} react component
* @memberof TopRecipes
*/
  render() {
    const recipes = (this.props.recipes) ? (this.props.recipes) : [];
    const topRecipes = recipes.map(recipe => (
      <div key={recipe.id} className="col-xs-8 col-sm-8 col-md-4">
        <RecipeItem
          home={'home'}
          image={recipe.picture}
          recipeId={recipe.id}
          recipeName={capitalize(recipe.name)}
          description={capitalize(recipe.description)}
          upvotes={recipe.upvote}
          downvotes={recipe.downvote}
          views={recipe.views}
          created={moment(new Date(recipe.createdAt)).fromNow()}
        />
        <br />
      </div>
    ));
    return (
      <div>
        { topRecipes.length > 0 &&
          <div className="container mt-3">
            <h3 className="text-center mt-3 mb-3 allRecipes-title"> Todays Top Three Delicacies</h3>
            <hr />
            <div className="row">
              {topRecipes}
            </div>
          </div>
        }
        { !topRecipes.length &&
          <div className="container mt-3" />
        }
      </div>
    );
  }
}

TopRecipes.propTypes = {
  getTopRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape())
};

TopRecipes.defaultProps = {
  recipes: []
};
const mapDispatchToProps = dispatch => ({
  getTopRecipes: () => dispatch(getTopRecipes())
});

const mapStateToProps = state => ({
  recipes: state.topRecipes.recipes
});

export default connect(mapStateToProps, mapDispatchToProps)(TopRecipes);
