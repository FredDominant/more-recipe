import React from 'react';

/**
 * 
 * 
 * @export
 * @class Search
 * @extends {React.Component}
 */
export class Search extends React.Component {
  render() {
		return (
			<div className="search-body">
				<div className="row container">
					<div className="col-sm-6">
							<a href="#"><span id="title"><h1 title="More Recipes and cooking tips">More Recipes</h1></span></a>
					</div>
					<div className="col-sm-6">
						<div className="input-group">
							<span id="search-intro"> <h5>Find a  recipe: </h5>  </span> <input type="text" id="search-box" className="form-control" placeholder="Search Recipe name or ingredient" aria-label="Search for..."/>
							<span className="input-group-btn">
								<button className="btn btn-warning" type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
  }
}
