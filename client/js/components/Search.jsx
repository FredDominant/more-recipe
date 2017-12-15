import React from 'react';

/**
 *
 * @export
 * @class Search
 * @extends {React.Component}
 */
class Search extends React.Component {
  /**
   * Creates an instance of Search.
   * @param {any} props
   * @memberof Search
   */
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof Search
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @returns {null} null
   * @param {any} event
   * @memberof Search
   */
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  /**
   *
   * @returns {null} null
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
                name="search"
                id="search-box"
                className="form-control"
                placeholder="Search Recipe name or ingredient"
                aria-label="Search for..."
                value={this.state.search}
                onChange={this.onChange}
              />
              <span className="input-group-btn">
                <button className="btn btn-danger" type="submit"><i className="fa fa-search" aria-hidden="true" /></button>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
