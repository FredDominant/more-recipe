import React from 'react';

/**
 * 
 * 
 * @export
 * @class Search
 * @extends {React.Component}
 */
 class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = { search: '' };
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	onChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}
	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state);
	}
	render() {
			return (
				<div className="container">
					<div className="search-body">
						<form onSubmit={this.handleSubmit}>
							<div className="input-group">
								<span id="search-intro"> <h5>Find a  recipe: </h5>  </span> 
								<input type="text" 
								name="search"
								id="search-box" 
								className="form-control" 
								placeholder="Search Recipe name or ingredient" 
								aria-label="Search for..."
								value={this.state.search}
								onChange={this.onChange}
								/>
								<span className="input-group-btn">
									<button className="btn btn-warning" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
								</span>
							</div>
						</form>	
					</div>
				</div>
			);
	}
}
export default Search;
