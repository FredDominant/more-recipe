import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

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
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   *
   * @returns {dispatch} dispatch
   * @memberof RecipeBody
   */
  componentDidMount() {
    this.props.dispatch(getAllRecipes());
  }
  /**
   *
   * @returns {null} null
   * @param {any} nextProps
   * @memberof RecipeBody
   */
  componentWillReceiveProps(nextProps) {
    const { recipes } = nextProps;
    this.setState({ recipes });
  }
  /**
   * @param {any} current
   * @returns {null} null
   * @memberof RecipeBody
   */
  onPageChange(current) {
    current.selected += 1;
    this.props.dispatch(getAllRecipes(current.selected));
  }
  /**
 * @returns {html} html
 *
 * @memberof RecipeBody
 */
  render() {
    const { pages } = this.props.pageInfo;
    const { recipes } = this.state;
    const allRecipes = recipes.map(recipe =>
      (
        <div key={recipe.id} className="col-sm-4">
          <RecipeItem
            home={'home'}
            image={recipe.picture}
            recipeId={recipe.id}
            recipeName={capitalize(recipe.name)}
            description={capitalize(recipe.description)}
            upvotes={recipe.upvote}
            downvotes={recipe.downvote}
            views={recipe.views}
            owner={`${recipe.User.firstname} ${recipe.User.lastname}`}
            created={moment(new Date(recipe.createdAt)).fromNow()}
          />
          <br />
          <div className="container" />
        </div>)
    );
    if (allRecipes.length) {
      return (
        <div className="container">
          <div className="row recipes-body">
            { allRecipes }
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
      );
    }
    return (
      <div className="">
        <br />
        <div className="container">
          <br />
          <div className="emptyContent">
            <h2>There are currently no recipes in the catalogue</h2>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes.allRecipes,
  pageInfo: state.pageInfo
});

RecipeBody.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func.isRequired,
  pageInfo: PropTypes.shape().isRequired
};
RecipeBody.defaultProps = {
  recipes: []
};
export default connect(mapStateToProps)(RecipeBody);
