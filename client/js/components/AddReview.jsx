import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addReview from '../actions/addReview';
/**
 *
 * @class AddReview
 *
 * @extends {React.Component}
 */
export class AddReview extends React.Component {
/**
 * @description Creates an instance of AddReview.
 *
 * @param {object} props
 *
 * @memberof AddReview
 */
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   *
   * @param {object} event
   *
   * @memberof AddReview
   *
   * @returns {null} null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @returns {null} null
   *
   * @param {object} event
   *
   * @memberof AddReview
   */
  handleSubmit(event) {
    const { content } = this.state;
    const recipeId = this.props.recipeId;
    event.preventDefault();
    if (content.trim().length) {
      this.props.postReview(content, recipeId);
      this.setState({ content: '' });
    }
  }
  /**
   *
   *
   * @memberof AddReview
   *
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div>
        <div id="review-form">
          <div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="form-control"
                  name="content"
                  placeholder="Add a review..."
                  onChange={this.onChange}
                  value={this.state.content}
                  required
                />
                <br />
                <button className="btn" id="add-review-button">
                  <span><i className="fas fa-comment-alt" /> </span>
                  Post Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddReview.propTypes = {
  postReview: PropTypes.func.isRequired,
  recipeId: PropTypes.number
};
AddReview.defaultProps = {
  recipeId: 0
};
const mapDispatchToProps = dispatch => ({
  postReview: (review, recipeId) => dispatch(addReview(review, recipeId))
});
export default connect(null, mapDispatchToProps)(AddReview);

