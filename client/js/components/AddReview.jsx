import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addReview from '../actions/addReview';
/**
 *
 *
 * @class AddReview
 * @extends {React.Component}
 */
class AddReview extends React.Component {
/**
 * Creates an instance of AddReview.
 * @param {any} props
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
   * @returns {null} null
   * @param {any} event
   * @memberof AddReview
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @returns {null} null
   *
   * @param {any} event
   * @memberof AddReview
   */
  handleSubmit(event) {
    const { content } = this.state;
    const recipeId = this.props.recipeId;
    event.preventDefault();
    console.log(`submitting ${content} for recipe with id ${recipeId}`);
    this.props.postReview(content, recipeId);
    console.log(`posted review for recipe with id  ${recipeId}`);
  }
  /**
   *
   *
   * @returns {html} html
   * @memberof AddReview
   */
  render() {
    return (
      <div className="container">
        <div id="review-form">
          <div className="row">
            <div className="col-sm-4">
              <form onSubmit={this.handleSubmit}>
                <textarea
                  className="form-control"
                  name="content"
                  rows="5"
                  onChange={this.onChange}
                  value={this.state.content}
                />
                <br />
                <button className="btn btn-primary"> <span><i className="fa fa-paper-plane-o" aria-hidden="true" /></span> Post review</button>
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

