import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';
import Footer from './Footer';
import RecipeItem from '../components/RecipeItem';
import getFavourites from '../actions/getFavourites';
import removeFavourite from '../actions/removeFavourite';
import capitalize from '../utils/capitalize';
import Loading from '../components/Loading';

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
    this.setState({ userFavourites: favourites });
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof Favourites
   */
  render() {
    if (this.props.fetching) {
      return (
        <div className="container loading-icon-container">
          <div className="text-center mt-30 loading-icon">
            <Loading size={100} />
          </div>
        </div>
      );
    }
    const allFavourites = this.state.userFavourites.map(recipe => (
      <div key={recipe.id} className=" col-xs-8 col-sm-2 col-md-4">
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
    if (allFavourites.length) {
      return (
        <div>
          <Navbar />
          <br />
          <div className="container">
            <div className="row">
              {allFavourites}
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <br />
        <div className="container">
          <br />
          <div className="emptyContent">
            <br />
            <h3 className="text-center">
            You currently have no favourite recipes. Add recipes as favourites
            </h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  favourites: state.getFavourites.userFavourites,
  fetching: state.isFetching
});

const mapDispatchToprops = dispatch => ({
  getAllFavourites: () => dispatch(getFavourites()),
  removeFromFavourite: recipeId => dispatch(removeFavourite(recipeId))
});

Favourites.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.shape()),
  getAllFavourites: PropTypes.func.isRequired,
  removeFromFavourite: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired
};
Favourites.defaultProps = {
  favourites: []
};

export default connect(mapStateToProps, mapDispatchToprops)(Favourites);

