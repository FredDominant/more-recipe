import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from './Footer';
import getOneRecipe from '../actions/getOneRecipe';
import upvoteRecipe from '../actions/upvote';
import addFavourites from '../actions/addFavourites';
import downvoteRecipe from '../actions/downvote';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import NotFoundPage from '../components/NotFoundPage';
import capitalize from '../utils/capitalize';
import Loading from '../components/Loading';
/**
 *
 *
 * @class Recipe
 * @extends {React.Component}
 */
class Recipe extends React.Component {
/**
 * Creates an instance of Recipe.
 * @param {any} props
 * @memberof Recipe
 */
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      reviews: [],
      owner: '',
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  /**
   * @returns {null} null
   *
   * @param {any} nextProps
   * @memberof Recipe
   */
  componentWillMount() {
    this.props.getRecipeDetails(this.props.match.params.recipeId);
  }
  /**
   *
   * @return {null} null
   * @param {any} nextProps
   * @memberof Recipe
   */
  componentWillReceiveProps(nextProps) {
    const recipe = (nextProps.recipe) ? (nextProps.recipe) : {};
    const reviews = (recipe.Reviews) ? (recipe.Reviews) : [];
    const owner = (recipe.User) ? (recipe.User) : {};
    this.setState({ recipe, reviews, owner });
  }

  /**
 * @description handles upvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleUpvote() {
    const recipeId = this.props.recipe.id;
    this.props.upvoteRecipe(recipeId);
  }

  /**
 * @description handles downvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleDownvote() {
    const recipeId = this.props.recipe.id;
    this.props.downvoteRecipe(recipeId);
  }

  /**
 * @description handles upvote event
 * @returns {null} null
 * @memberof Recipe
 */
  handleFavourite() {
    const recipeId = this.props.recipe.id;
    this.props.favourite(recipeId);
  }
  /**
   *
   *
   * @returns {component} react component
   * @memberof Recipe
   */
  render() {
    if ((this.props.fetching) && !(this.state.recipe.id)) {
      return (
        <div className="container loading-icon-container">
          <div className="text-center mt-30 loading-icon">
            <Loading size={100} />
          </div>
        </div>
      );
    }
    if (!this.state.recipe.id) {
      return <NotFoundPage />;
    }
    const ingredients = (this.state.recipe.ingredients) ? (this.state.recipe.ingredients) : '';
    const splitIngredients = ingredients.split(',').map((item, i) => (
      <li className="list-group-item text-left" key={`ingredient ${i + 1}`}>{capitalize(item)}</li>
    ));

    const { directions } = this.state.recipe;
    return (
      <div >
        <div className="container">
          <div className="container">
            <br />
            <div className="row">
              <div className="col-md-6 col-sm-8">
                <div className="image-container">
                  <img
                    className="img-thumbnail img-fluid"
                    src={this.state.recipe.picture}
                    alt={this.state.recipe.name}
                    height="50"
                    width="50"
                  />
                </div>
              </div>
              <div className="col-md-6 container">
                <h2 className="text-left recipe-details-name ml-5">{this.state.recipe.name ? capitalize(this.state.recipe.name) : '' }</h2>
                <h5 className="text-left recipe-details-description ml-5">{this.state.recipe.description ? capitalize(this.state.recipe.description) : '' }</h5>
                <h5 className="text-left ml-5 recipe-detail-user"> <small> By: {`${this.state.owner.firstname} ${this.state.owner.lastname}`}</small></h5>
                <div className="actions ml-5 mb-3">
                  <div className="btn-group" role="group" >

                    <button
                      type="button"
                      title="upvote this recipe"
                      className="btn btn-outline-danger"
                      disabled={!this.props.authenticated}
                      onClick={this.handleUpvote}
                    ><i className="far fa-thumbs-up" /> <span>{this.state.recipe.upvote}</span></button>

                    <button
                      type="button"
                      title="downvote this recipe"
                      className="btn btn-outline-danger"
                      disabled={!this.props.authenticated}
                      onClick={this.handleDownvote}
                    ><i className="far fa-thumbs-down" /> <span>{this.state.recipe.downvote}</span></button>

                    <button
                      type="button"
                      title="add to your favourites"
                      className="btn btn-outline-danger"
                      disabled={!this.props.authenticated}
                      onClick={this.handleFavourite}
                    ><i className="fab fa-gratipay" /></button>
                  </div>
                </div>
                <br />
                <h5 className="text-left ml-5 mb-3">INGREDIENTS</h5>
                <hr />
                <ul className="align-left container">
                  {splitIngredients}
                </ul>
              </div>
              <div className="container mt-3 mb-3 text-left">
                <h5 className="text-left ">DIRECTIONS</h5>
                <hr />
                {capitalize(directions)}
              </div>
            </div>
            <br />
            <div className="container-fluid" id="review-body">
              <h5 className="text-left mt-3 mb-3 ml-5">REVIEWS</h5>
              <div className="add-review-form align-center">
                {this.props.authenticated && <AddReview recipeId={this.state.recipe.id} />}
                <br />
              </div>
              <div className="container">
                <Reviews recipeId={parseInt(this.props.match.params.recipeId, 10)} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
Recipe.propTypes = {
  match: PropTypes.shape().isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  favourite: PropTypes.func.isRequired,
  recipe: PropTypes.shape(),
  authenticated: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired
};
Recipe.defaultProps = {
  recipe: {},
};

const mapStateToProps = state => ({
  recipe: state.getOneRecipe.singleRecipe,
  authenticated: state.auth.isAuthenticated,
  error: state.getOneRecipe.errorMessage,
  fetching: state.isFetching
});

const mapDispatchToProps = dispatch => ({
  getRecipeDetails: recipeId => dispatch(getOneRecipe(recipeId)),
  upvoteRecipe: recipeId => dispatch(upvoteRecipe(recipeId)),
  downvoteRecipe: recipeId => dispatch(downvoteRecipe(recipeId)),
  favourite: recipeId => dispatch(addFavourites(recipeId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import moment from 'moment';

// import Footer from './Footer';
// import getOneRecipe from '../actions/getOneRecipe';
// import upvoteRecipe from '../actions/upvote';
// import addFavourites from '../actions/addFavourites';
// import downvoteRecipe from '../actions/downvote';
// import ViewReviews from '../components/ViewReviews';
// import AddReview from '../components/AddReview';
// import NotFoundPage from '../components/NotFoundPage';
// import capitalize from '../utils/capitalize';
// import Loading from '../components/Loading';
// /**
//  *
//  *
//  * @class Recipe
//  * @extends {React.Component}
//  */
// class Recipe extends React.Component {
// /**
//  * Creates an instance of Recipe.
//  * @param {any} props
//  * @memberof Recipe
//  */
//   constructor(props) {
//     super(props);
//     this.state = {
//       recipe: {},
//       reviews: [],
//       owner: '',
//     };
//     this.handleUpvote = this.handleUpvote.bind(this);
//     this.handleDownvote = this.handleDownvote.bind(this);
//     this.handleFavourite = this.handleFavourite.bind(this);
//   }
//   /**
//    * @returns {null} null
//    *
//    * @param {any} nextProps
//    * @memberof Recipe
//    */
//   componentWillMount() {
//     this.props.getRecipeDetails(this.props.match.params.recipeId);
//   }
//   /**
//    *
//    * @return {null} null
//    * @param {any} nextProps
//    * @memberof Recipe
//    */
//   componentWillReceiveProps(nextProps) {
//     const recipe = (nextProps.recipe) ? (nextProps.recipe) : {};
//     const reviews = (recipe.Reviews) ? (recipe.Reviews) : [];
//     const owner = (recipe.User) ? (recipe.User) : {};
//     this.setState({ recipe, reviews, owner });
//   }

//   /**
//  * @description handles upvote event
//  * @returns {null} null
//  * @memberof Recipe
//  */
//   handleUpvote() {
//     const recipeId = this.props.recipe.id;
//     this.props.upvoteRecipe(recipeId);
//   }

//   /**
//  * @description handles downvote event
//  * @returns {null} null
//  * @memberof Recipe
//  */
//   handleDownvote() {
//     const recipeId = this.props.recipe.id;
//     this.props.downvoteRecipe(recipeId);
//   }

//   /**
//  * @description handles upvote event
//  * @returns {null} null
//  * @memberof Recipe
//  */
//   handleFavourite() {
//     const recipeId = this.props.recipe.id;
//     this.props.favourite(recipeId);
//   }
//   /**
//    *
//    *
//    * @returns {component} react component
//    * @memberof Recipe
//    */
//   render() {
//     if ((this.props.fetching) && !(this.state.recipe.id)) {
//       return (
//         <div className="container loading-icon-container">
//           <div className="text-center mt-30 loading-icon">
//             <Loading size={100} />
//           </div>
//         </div>
//       );
//     }
//     if (!this.state.recipe.id) {
//       return <NotFoundPage />;
//     }
//     const ingredients = (this.state.recipe.ingredients) ? (this.state.recipe.ingredients) : '';
//     const splitIngredients = ingredients.split(',').map((item, i) => (
//       <li className="list-group-item text-left" key={`ingredient ${i + 1}`}>{capitalize(item)}</li>
//     ));

//     const { reviews } = this.state;
//     const sortedReviews = reviews.sort((a, b) => (b.id - a.id));
//     const allReviews = sortedReviews.map((review, i) => (
//       <div key={`review ${i + 1}`} className="container">
//         <ViewReviews
//           image={review.User.picture}
//           firstname={review.User.firstname}
//           lastname={review.User.lastname}
//           content={review.content}
//           created={moment(new Date(review.createdAt)).fromNow()}
//         />
//       </div>
//     ));
//     const { directions } = this.state.recipe;
//     return (
//       <div >
//         <div className="container">
//           <div className="container">
//             <br />
//             <div className="row">
//               <div className="col-md-6 col-sm-8">
//                 <div className="image-container">
//                   <img
//                     className="img-thumbnail img-fluid"
//                     src={this.state.recipe.picture}
//                     alt={this.state.recipe.name}
//                     height="50"
//                     width="50"
//                   />
//                 </div>
//               </div>
//               <div className="col-md-6 container">
//                 <h2 className="text-left recipe-details-name ml-5">{this.state.recipe.name ? capitalize(this.state.recipe.name) : '' }</h2>
//                 <h5 className="text-left recipe-details-description ml-5">{this.state.recipe.description ? capitalize(this.state.recipe.description) : '' }</h5>
//                 <h5 className="text-left ml-5 recipe-detail-user"> <small> By: {`${this.state.owner.firstname} ${this.state.owner.lastname}`}</small></h5>
//                 <div className="actions ml-5 mb-3">
//                   <div className="btn-group" role="group" >

//                     <button
//                       type="button"
//                       title="upvote this recipe"
//                       className="btn btn-outline-danger"
//                       disabled={this.props.authenticated}
//                       onClick={this.handleUpvote}
//                     ><i className="far fa-thumbs-up" /> <span>{this.state.recipe.upvote}</span></button>

//                     <button
//                       type="button"
//                       title="downvote this recipe"
//                       className="btn btn-outline-danger"
//                       disabled={this.props.authenticated}
//                       onClick={this.handleDownvote}
//                     ><i className="far fa-thumbs-down" /> <span>{this.state.recipe.downvote}</span></button>

//                     <button
//                       type="button"
//                       title="add to your favourites"
//                       className="btn btn-outline-danger"
//                       disabled={this.props.authenticated}
//                       onClick={this.handleFavourite}
//                     ><i className="fab fa-gratipay" /></button>
//                   </div>
//                 </div>
//                 <br />
//                 <h5 className="text-left ml-5 mb-3">INGREDIENTS</h5>
//                 <hr />
//                 <ul className="align-left container">
//                   {splitIngredients}
//                 </ul>
//               </div>
//               <div className="container mt-3 mb-3 text-left">
//                 <h5 className="text-left ">DIRECTIONS</h5>
//                 <hr />
//                 {capitalize(directions)}
//               </div>
//             </div>
//             <br />
//             <div className="container-fluid" id="review-body">
//               <h5 className="text-left mt-3 mb-3 ml-5">REVIEWS</h5>
//               <div className="add-review-form align-center">
//                 {this.props.authenticated && <AddReview recipeId={this.state.recipe.id} />}
//                 <br />
//               </div>
//               { allReviews.length > 0 && <div className="review-body">
//                 {allReviews}
//               </div>}
//               { !allReviews.length && <div className="emptyContent">
//                 <h2 className="text-center">There are currently no reviews for this recipe.</h2>
//                 <br />
//               </div>}
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }
// }
// Recipe.propTypes = {
//   match: PropTypes.shape().isRequired,
//   getRecipeDetails: PropTypes.func.isRequired,
//   upvoteRecipe: PropTypes.func.isRequired,
//   downvoteRecipe: PropTypes.func.isRequired,
//   favourite: PropTypes.func.isRequired,
//   recipe: PropTypes.shape(),
//   authenticated: PropTypes.bool.isRequired,
//   fetching: PropTypes.bool.isRequired
// };
// Recipe.defaultProps = {
//   recipe: {},
// };

// const mapStateToProps = state => ({
//   recipe: state.getOneRecipe.singleRecipe,
//   authenticated: state.auth.isAuthenticated,
//   error: state.getOneRecipe.errorMessage,
//   fetching: state.isFetching
// });

// const mapDispatchToProps = dispatch => ({
//   getRecipeDetails: recipeId => dispatch(getOneRecipe(recipeId)),
//   upvoteRecipe: recipeId => dispatch(upvoteRecipe(recipeId)),
//   downvoteRecipe: recipeId => dispatch(downvoteRecipe(recipeId)),
//   favourite: recipeId => dispatch(addFavourites(recipeId))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Recipe);

