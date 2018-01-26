import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import search from '../actions/search';
/**
 *
 * @export
 *
 * @class Search
 *
 * @extends {React.Component}
 */
class Search extends React.Component {
  /**
   * @description Creates an instance of Search.
   *
   * @param {object} props
   *
   * @memberof Search
   */
  constructor(props) {
    super(props);
    this.state = { searchParam: '' };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} event
   *
   * @memberof Search
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.search(event.target.value);
  }
  /**
   * @memberof Search
   *
   * @returns {null} null
   */
  onFocus() {
    this.context.router.history.push('/search');
  }
  /**
   *
   * @returns {null} null
   *
   * @param {object} event
   *
   * @memberof Search
   */
  handleSubmit(event) {
    event.preventDefault();
    const { searchParam } = this.state;
    this.props.search(searchParam);
  }
  /**
   *
   * @returns {null} null
   *
   * @memberof Search
   */
  render() {
    return (
      <div className="container">
        <div className="search-body">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <span id="search-intro"> <h5>Find a recipe: </h5>  </span>
              <input
                type="text"
                name="searchParam"
                id="search-box"
                className="form-control"
                placeholder="Search Recipe name or ingredient"
                aria-label="Search for..."
                value={this.state.search}
                onChange={this.onChange}
                onFocus={this.onFocus}
                autoFocus={this.props.focus}
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-danger"
                  type="submit"
                >
                  <i className="fa fa-search" aria-hidden="true" /></button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  search: PropTypes.func.isRequired,
  focus: PropTypes.bool
};
Search.defaultProps = {
  focus: false
};

Search.contextTypes = {
  router: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  search: searchParam => (dispatch(search(searchParam)))
});
export default connect(null, mapDispatchToProps)(Search);
