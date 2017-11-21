import React from 'react';
import { connect } from 'react-redux';

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
     * Creates an instance of RecipeBody.
     * @param {any} props
     * @memberof RecipeBody
     */
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }
  componentWillMount() {
    console.log('I work');
    this.props.dispatch(getAllRecipes());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes.allRecipes
    })
    console.log(nextProps.recipes.allRecipes, "I got here");
  }

  render() {
    console.log(this.state.recipes, 'state');
    const { recipes } = this.state;
    const allRecipes = recipes.map(recipe =>
      <div className="col-sm-4">
        <RecipeItem
        recipeName={capitalize(recipe.name)}
        description={capitalize(recipe.description)}
        upvotes={recipe.upvote}
        downvotes={recipe.downvote}
        views={recipe.views}
        owner={recipe.User.firstname + ' ' + recipe.User.lastname}
      />
      </div>
    );
    return (
      <div className="row recipes-body">
          { allRecipes }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    recipes: state.allRecipes
  }
};

export default connect(mapStateToProps)(RecipeBody);
