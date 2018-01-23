import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Footer from './Footer';
import getUserRecipes from '../actions/getUserRecipes';
import deleteRecipe from '../actions/deleteRecipe';
import RecipeItem from './RecipeItem';
import Loading from './Loading';

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
    this.onPageChange = this.onPageChange.bind(this);
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
   * @param {any} current
   * @returns {null} null
   * @memberof RecipeBody
   */
  onPageChange(current) {
    current.selected += 1;
    this.props.getAllUserRecipes(current.selected);
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
    const { pages } = this.props.pageInfo;
    const userRecipes = (this.props.userRecipes) ? this.props.userRecipes : [];
    const allUserRecipes = userRecipes.map(recipe => (
      <div key={`${recipe.id}`} className="col-sm-12 col-md-6 col-lg-4" >
        <RecipeItem
          image={recipe.picture}
          recipeName={recipe.name}
          recipeId={recipe.id}
          description={recipe.description}
          userRecipeCard={'user'}
          onDelete={this.props.deleteRecipe}
          upvotes={recipe.upvote}
          downvotes={recipe.downvote}
          views={recipe.views}
          owner={'you'}
        />
        <br />
      </div>
    ));
    if (userRecipes.length) {
      return (
        <div>
          <br />
          <div className="container" >
            <div className="row">
              {allUserRecipes}
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
      <div className="">
        <br />
        <div className="container">
          <br />
          <div className="emptyContent">
            <br />
            <h3 className="mt-5 mb-5 text-center">
            You currently have no Recipes. Add new recipes
            </h3>
            <br />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  userRecipes: state.getUserRecipe.userRecipes,
  pageInfo: state.pageInfo,
  fetching: state.isFetching
});
const mapDispatchToProps = dispatch => ({
  getAllUserRecipes: page => dispatch(getUserRecipes(page)),
  deleteRecipe: recipeId => dispatch(deleteRecipe(recipeId))
});

UserRecipePage.propTypes = {
  userRecipes: PropTypes.arrayOf(PropTypes.shape()),
  getAllUserRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  pageInfo: PropTypes.shape().isRequired,
  fetching: PropTypes.bool.isRequired
};

UserRecipePage.defaultProps = {
  userRecipes: []
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipePage);

