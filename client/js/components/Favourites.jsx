import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import Footer from './Footer';
import RecipeItem from '../components/RecipeItem';
import getFavourites from '../actions/getFavourites';
import removeFavourite from '../actions/removeFavourite';
import capitalize from '../utils/capitalize';
import Loading from '../components/Loading';

/**
 *
 * @class Favourites
 *
 * @extends {React.Component}
 */
export class Favourites extends React.Component {
  /**
 * @description Creates an instance of Favourites.
 *
 * @param {object} props
 *
 * @memberof Favourites
 */
  constructor(props) {
    super(props);
    this.state = {
      userFavourites: [],
      pageInfo: {}
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof Favourites
   */
  componentDidMount() {
    this.props.getAllFavourites();
  }
  /**
 *
 * @return {null} null
 *
 * @param {object} nextProps
 *
 * @memberof Favourites
 */
  componentWillReceiveProps(nextProps) {
    const favourites = nextProps.favourites;
    const { pageInfo } = nextProps;
    this.setState({ userFavourites: favourites, pageInfo });
  }
  /**
   * @param {object} current
   *
   * @returns {null} null
   *
   * @memberof RecipeBody
   */
  onPageChange(current) {
    current.selected += 1;
    this.props.getAllFavourites(current.selected);
  }
  /**
   *
   * @memberof Favourites
   *
   * @return {ReactElement} markup
   */
  render() {
    const { pages } = this.state.pageInfo;
    const allFavourites = this.state.userFavourites.map(recipe => (
      <div key={recipe.id} className="col-sm-12 col-md-6 col-lg-4">
        <RecipeItem
          favouriteCard={'true'}
          image={recipe.Recipe.picture}
          recipeId={recipe.recipeId}
          recipeName={capitalize(recipe.Recipe.name)}
          description={capitalize(recipe.Recipe.description)}
          upvotes={recipe.Recipe.upvote}
          downvotes={recipe.Recipe.downvote}
          favourites={recipe.Recipe.favourites}
          owner={`${recipe.Recipe.User.firstName} ${recipe.Recipe.User.lastName}`}
          removeRecipe={this.props.removeFromFavourite}
        />
        <br />
      </div>
    )
    );
    if (allFavourites.length) {
      return (
        <div>
          <br />
          <div className="container favourite-body">
            <h2 className="text-center mb-3 mt-3 allRecipes-title" id="allRecipes-title">
            Favourite Recipes
            </h2>
            <div className="row">
              {allFavourites}
            </div>
            <div className="container">
              <ReactPaginate
                pageCount={pages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={3}
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakClassName={'text-center'}
                initialPage={0}
                containerClassName={'container pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'page-item active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                onPageChange={this.onPageChange}
              />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
    if (this.props.fetching) {
      return (
        <div className="container loading-icon-container">
          <div className="text-center mt-30 loading-icon">
            <Loading size={100} />
          </div>
        </div>
      );
    }
    return (
      <div>
        <br />
        <div className="container favourite-body">
          <br />
          <div className="emptyContent">
            <br />
            <h3 className="text-center">
            You currently have no favourite recipes. Add recipes to favourites
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
  fetching: state.isFetching,
  pageInfo: state.pageInfo
});

const mapDispatchToprops = dispatch => ({
  getAllFavourites: page => dispatch(getFavourites(page)),
  removeFromFavourite: recipeId => dispatch(removeFavourite(recipeId))
});

Favourites.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.shape()),
  getAllFavourites: PropTypes.func.isRequired,
  removeFromFavourite: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  pageInfo: PropTypes.shape().isRequired
};
Favourites.defaultProps = {
  favourites: []
};

export default connect(mapStateToProps, mapDispatchToprops)(Favourites);

