import React from 'react';

/**
 * 
 * 
 * @export
 * @class Search
 * @extends {React.Component}
 */
export default class Search extends React.Component {
  render() {
		return (
			<div className="container">
				<div className="search-body">
					<div className="input-group">
						<span id="search-intro"> <h5>Find a  recipe: </h5>  </span> <input type="text" id="search-box" className="form-control" placeholder="Search Recipe name or ingredient" aria-label="Search for..."/>
						<span className="input-group-btn">
							<button className="btn btn-warning" type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
						</span>
					</div>
				</div>
				
			</div>
		);
  }
}
