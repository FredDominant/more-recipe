import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import getReviews from '../actions/getReviews';
import ViewReviews from './ViewReviews';
/**
 * @description renders the reviews of a recipe
 *
 * @class Reviews
 *
 * @extends {React.Component}
 */
export class Reviews extends React.Component {
/**
 * @description Creates an instance of Reviews.
 *
 * @param {object} props
 *
 * @memberof Reviews
 */
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }
  /**
   *
   * @memberof Reviews
   *
   * @returns {null} null
   */
  componentDidMount() {
    this.props.getReviews(this.props.recipeId);
  }
  /**
   * @param {object} nextProps
   *
   * @memberof Reviews
   *
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const { reviews } = nextProps;
    this.setState({ reviews });
  }
  /**
*
* @memberof Reviews
*
* @return {ReactElement} markup
*/
  render() {
    const { reviews } = this.props;
    const allReviews = reviews.sort((a, b) => (b.id - a.id)).map((review, index) => (
      <div key={`review ${index + 1}`} className="container">
        <ViewReviews
          imageUrl={review.User.imageUrl}
          firstName={review.User.firstName}
          lastName={review.User.lastName}
          content={review.content}
          createdAt={moment(new Date(review.createdAt)).fromNow()}
        />

      </div>
    ));
    return (
      <div className="container">
        {
          allReviews.length >= 1 &&
          <div className="container">
            { allReviews }
          </div>
        }
        {
          !allReviews.length &&
          <div className="container">
            <h4 className="text-center allRecipes-title">
            This recipe has no reviews yet.
            </h4>
          </div>
        }
      </div>
    );
  }
}
Reviews.propTypes = {
  recipeId: PropTypes.number.isRequired,
  getReviews: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape())
};

Reviews.defaultProps = {
  reviews: []
};

const mapDispatchToProps = dispatch => ({
  getReviews: id => dispatch(getReviews(id))
});

const mapStateToProps = state => ({
  reviews: state.getOneRecipe.reviews
});

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
