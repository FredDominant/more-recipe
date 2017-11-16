import React from 'react';
import axios from 'axios';

/**
 * @description componet holds form to add recipes
 *
 * @class AddRecipe
 * @extends {React.Component}
 */
class AddRecipe extends React.Component {
/**
 * Creates an instance of AddRecipe.
 * @param {any} props
 * @memberof AddRecipe
 */
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
        ingredients: '',
        directions: '',
        recipeImage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getImageName = this.getImageName.bind(this);
  }
  onChange(event) {
      this.setState({ [event.target.name]: event.target.value })
  }
  addImage() {
    cloudinary.openUploadWidget({})
  }
  getImageName() {
      console.log(this.state.recipeImage);
  }
  addRecipe() {
      axios({
          method: 'POST',
          url: '/api/v1/recipes',
          headers: { 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm90aWZ5Ijp0cnVlLCJpYXQiOjE1MTA4NTA4ODIsImV4cCI6MTUxMDkzNzI4Mn0.O0LpdnCnbsZwTFm9bfMKtOZFPse78-9XZ20vs43g5bQ' },
          data: this.state
      }).catch(error => {
          console.log(error);
      }).then(() => {
          console.log('Recipe Added');
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.addRecipe();
  }
  render() {
      return (
          <div>
              <div className="modal fade" id="addRecipe" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content container">
                            <div className="modal-header">
                                <h5 className="modal-title"><span id="title"><h3 title="More Recipes and cooking tips">More Recipes</h3></span></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Recipe Name</label>
                                    <input type="text" 
                                    className="form-control" 
                                    name="name"
                                    id="recipeName" 
                                    aria-describedby="small-recipe-name" 
                                    placeholder="Awesome Recipe!"
                                    value={this.state.name}
                                    onChange={this.onChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="recipe-description">Recipe Description:</label>
                                    <input type="text" 
                                    className="form-control" 
                                    name="description"
                                    id="recipe-description" 
                                    placeholder="Awesome sauce made out of nothing!" 
                                    value={this.state.description} 
                                    onChange={this.onChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cook-directions">Ingredients:</label>
                                    <textarea className="form-control" 
                                    id="cook-directions"
                                    name="ingredients" 
                                    rows="3" 
                                    placeholder="Onions, tomatoes, grilled chicken, nutmeg"
                                    value={this.state.ingredients}
                                    onChange={this.onChange}>
                                    </textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cook-directions">Directions to cook:</label>
                                    <textarea className="form-control" 
                                    name="directions"
                                    id="cook-directionss" 
                                    rows="3" 
                                    placeholder="dice tomatoes, tear chicken, boil onions, mix with nutmeg"
                                    value={this.state.directions}
                                    onChange={this.onChange}></textarea>
                                </div>

                                {/* <div className="form-group">
                                    <button type="button" className="btn btn-primary" name="recipeImage" id="recipeImage">Add Image</button>
                                </div> */}
                                
                                <div className="form-group">
                                    <label htmlFor="recipeImage">Recipe Image</label>
                                    <input type="file" 
                                    className="form-control-file"
                                    name="recipeImage"
                                    id="recipeImage"
                                    value={this.state.recipeImage} 
                                    onChange={this.onChange}/>
                                </div>
                                <button onCLick={this.getImageName} className="btn btn-primary">check image name</button>
                                <button className="btn btn-primary">Add Recipe</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      );
  }
}
export default AddRecipe;
