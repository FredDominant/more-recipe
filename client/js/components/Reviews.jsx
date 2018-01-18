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
 * @extends {React.Component}
 */
class Reviews extends React.Component {
/**
 * Creates an instance of Reviews.
 * @param {any} props
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
   * @returns {null} null
   */
  componentDidMount() {
    console.log('recipe id is', this.props.recipeId);
    this.props.getReviews(this.props.recipeId);
  }
  /**
   * @param {any} nextProps
   * @memberof Reviews
   * @returns {null} null
   */
  componentWillReceiveProps(nextProps) {
    const { reviews } = nextProps;
    this.setState({ reviews });
    console.log('nextProps in Reviews component is', nextProps);
  }
  /**
*
* @returns {node} JSX
* @memberof Reviews
*/
  render() {
    const allReviews = this.state.reviews.sort((a, b) => (b.id - a.id)).map((review, index) => (
      <div key={`review ${index + 1}`} className="container">
        <ViewReviews
          image={review.User.picture}
          firstname={review.User.firstname}
          lastname={review.User.lastname}
          content={review.content}
          created={moment(new Date(review.createdAt)).fromNow()}
        />
      </div>
    ));
    return (
      <div className="container">
        {allReviews}
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

// import React from 'react';
// import PropTypes from 'prop-types';

// const ViewReviews = props => (
//   <div className="container">
//     <div className="row">
//       <div className="col-xs-4 col-sm-4 col-md-4 col-lg-1">
//         <div className="reviewer-image">
//           <img src={props.image} alt={props.firstname} className="rounded float-left img-fluid" id="reviewer-image" />
//         </div>
//       </div>
//       <div className="col-xs-4 col-sm-4 col-md-4 col-lg-9">
//         <div className="content text-left mb-5">
//           <h5 className="reviewer-name"> {`${props.firstname} ${props.lastname}`} </h5>
//           <h6> {props.content} </h6>
//           <h6> <small id="review-date">{props.created} </small> </h6>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// ViewReviews.propTypes = {
//   content: PropTypes.string.isRequired,
//   firstname: PropTypes.string.isRequired,
//   lastname: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   created: PropTypes.string.isRequired
// };

// export default ViewReviews;
