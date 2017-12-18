import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import RecipeItem from '../components/RecipeItem';
import getFavourites from '../actions/getFavourites';
import removeFavourite from '../actions/removeFavourite';
import capitalize from '../utils/capitalize';

/**
 *
 *
 * @class Favourites
 * @extends {React.Component}
 */
class Favourites extends React.Component {
  /**
 * Creates an instance of Favourites.
 * @param {any} props
 * @memberof Favourites
 */
  constructor(props) {
    super(props);
    this.state = {
      userFavourites: []
    };
  }
  /**
   *
   * @returns {null} null
   * @memberof Favourites
   */
  componentDidMount() {
    this.props.getAllFavourites();
  }
  /**
 *
 * @return {null} null
 * @param {any} nextProps
 * @memberof Favourites
 */
  componentWillReceiveProps(nextProps) {
    const favourites = nextProps.favourites;
    console.log(favourites);
    this.setState({ userFavourites: favourites });
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof Favourites
   */
  render() {
    const allFavourites = this.state.userFavourites.map(recipe => (
      <div key={recipe.id} className="col-sm-2 col-md-4">
        <RecipeItem
          favouriteCard={'true'}
          image={recipe.Recipe.picture}
          recipeId={recipe.recipeId}
          recipeName={capitalize(recipe.Recipe.name)}
          description={capitalize(recipe.Recipe.description)}
          upvotes={recipe.Recipe.upvote}
          downvotes={recipe.Recipe.downvote}
          owner={`${recipe.Recipe.User.firstname} ${recipe.Recipe.User.lastname}`}
          removeRecipe={this.props.removeFromFavourite}
        />
        <br />
      </div>
    )
    );
    return (
      <div>
        <Navbar />
        <br />
        <div className="container">
          <div className="row">
            {allFavourites}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  favourites: state.getFavourites.userFavourites
});

const mapDispatchToprops = dispatch => ({
  getAllFavourites: () => dispatch(getFavourites()),
  removeFromFavourite: recipeId => dispatch(removeFavourite(recipeId))
});

Favourites.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.shape()),
  getAllFavourites: PropTypes.func.isRequired,
  removeFromFavourite: PropTypes.func.isRequired
};
Favourites.defaultProps = {
  favourites: []
};

export default connect(mapStateToProps, mapDispatchToprops)(Favourites);

